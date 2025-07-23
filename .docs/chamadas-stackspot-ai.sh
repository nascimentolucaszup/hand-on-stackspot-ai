# Authenticate
export JWT=$(curl -s "https://idm.stackspot.com/$REALM/oidc/oauth/token" \
   -H 'Content-Type: application/x-www-form-urlencoded' \
   -d 'grant_type=client_credentials' \
   -d "client_id=$CLIENT_ID" \
   -d "client_secret=$CLIENT_KEY" | jq -r '.access_token')

# Upload files and keep their ids
file_paths=(
  '/home/user/Pictures/travel.png'
)

upload_ids=()

for file in "${file_paths[@]}"; do
  upload_data=$(curl -s 'https://data-integration-api.stackspot.com/v2/file-upload/form' \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $JWT" \
    -d "{"file_name": "$(basename "$file")", "target_type": "CONTEXT", "expiration": 60 }

  curl -s "$(jq -r '.url' <<< "$upload_data")" \
    -F "key=$(jq -r '.form.key' <<< "$upload_data")" \
    -F "x-amz-algorithm=$(jq -r '.form["x-amz-algorithm"]' <<< "$upload_data")" \
    -F "x-amz-credential=$(jq -r '.form["x-amz-credential"]' <<< "$upload_data")" \
    -F "x-amz-date=$(jq -r '.form["x-amz-date"]' <<< "$upload_data")" \
    -F "x-amz-security-token=$(jq -r '.form["x-amz-security-token"]' <<< "$upload_data")" \
    -F "policy=$(jq -r '.form.policy' <<< "$upload_data")" \
    -F "x-amz-signature=$(jq -r '.form["x-amz-signature"]' <<< "$upload_data")" \
    -F "file=@$file"
  upload_ids+=("$(jq -r '.id' <<< "$upload_data")")
done

# Chat with this agent
curl 'https://genai-inference-app.stackspot.com/v1/agent/01JXADNTKPA48V8B2AVX7NAD64/chat' \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $JWT" \
  -d "{
    \"streaming\": true,
    \"user_prompt\": \"\",
    \"stackspot_knowledge\": false,
    \"return_ks_in_response\": true,
    \"upload_ids\": $(jq -c -n '$ARGS.positional' --args "${upload_ids[@]}")
  }"