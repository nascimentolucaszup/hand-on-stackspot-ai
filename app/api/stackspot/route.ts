import { NextRequest, NextResponse } from 'next/server';

const uploads: String[] = []

async function getAccessToken() {
  const tokenRes = await fetch(
    `https://idm.stackspot.com/${process.env.STACKSPOT_REALM}/oidc/oauth/token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.STACKSPOT_CLIENT_ID!,
        client_secret: process.env.STACKSPOT_CLIENT_SECRET!,
      }),
    }
  );
  if (!tokenRes.ok) return null;
  const { access_token } = await tokenRes.json();
  return access_token;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { action } = body;

  const access_token = await getAccessToken();
  if (!access_token) {
    return NextResponse.json({ error: 'Erro ao autenticar' }, { status: 401 });
  }

  if (action === 'upload') {
    // Upload pré-assinado
    const { fileName } = body;
    const uploadRes = await fetch(
      `https://data-integration-api.stackspot.com/v2/file-upload/form`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          file_name: fileName,
          target_type: 'CONTEXT',
          expiration: 60,
        }),
      }
    );
    if (!uploadRes.ok) {
      return NextResponse.json({ error: 'Erro ao solicitar upload' }, { status: 400 });
    }
    const data = await uploadRes.json();
    return NextResponse.json(data);
  }

  if (action === 'agent') {
    // Chamada ao agente StackSpot AI
    const { agentId, userPrompt, uploadIds } = body;
    uploads.push(uploadIds)

    const agentRes = await fetch(
      `https://genai-inference-app.stackspot.com/v1/agent/${agentId}/chat`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          user_prompt: userPrompt,
          uploadIds: uploads,
          streaming: false,
          stackspot_knowledge: false,
          return_ks_in_response: false,
        }),
      }
    );
    if (!agentRes.ok) {
      return NextResponse.json({ error: 'Erro ao chamar agente' }, { status: 400 });
    }
    const { message } = await agentRes.json();
    return NextResponse.json(JSON.parse(message));
  }

  return NextResponse.json({ error: 'Ação inválida' }, { status: 400 });
}