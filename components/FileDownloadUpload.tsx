'use client';

import React, { useRef, useState } from 'react';

const MAX_SIZE_MB = 10;
const ALLOWED_TYPES = ['application/pdf', 'image/png'];

type UploadState = 'idle' | 'requesting' | 'uploading' | 'done' | 'error';

export type CertificadoCNPJ = {
  nome_empresarial: string;
  cnpj: string;
  data_abertura: string;
  natureza_juridica: string;
  situacao_cadastral: string;
  data_situacao_cadastral: string;
  motivo_situacao_cadastral: string;
  endereco: string;
  municipio: string;
  uf: string;
  cep: string;
  atividade_principal: string;
  atividades_secundarias: string[];
  nome_fantasia: string;
  telefone: string;
  email: string;
};

export type Props = {
  onCertificadoLoaded: (certificado: CertificadoCNPJ) => void;
};

export default function FileDownloadUpload({ onCertificadoLoaded }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<UploadState>('idle');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [ids, setIds] = useState<String[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setSuccessMsg(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Apenas arquivos PDF ou PNG são permitidos.');
      setSelectedFile(null);
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError('O arquivo deve ter no máximo 10MB.');
      setSelectedFile(null);
      return;
    }
    setSelectedFile(file);
  };

  // Função de upload integrada ao backend seguro
  const handleUpload = async () => {
    if (!selectedFile) return;
    setError(null);
    setSuccessMsg(null);
    setUploadState('requesting');
    try {
      // 1. Solicita dados para upload pré-assinado via API interna
      const res = await fetch('/api/stackspot', {
        method: 'POST',
        body: JSON.stringify({ action: 'upload', fileName: 'meuarquivo.pdf' }),
        headers: { 'Content-Type': 'application/json' }
      });
      if (!res.ok) throw new Error('Erro ao solicitar upload pré-assinado');
      const { url, id, form } = await res.json();
      setIds([id]);
      // 2. Faz upload real para S3
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      formData.append('file', selectedFile);

      setUploadState('uploading');
      const uploadRes = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      if (uploadRes.status !== 204) throw new Error('Erro ao fazer upload do arquivo');
      setUploadState('done');
      setSuccessMsg('Upload realizado com sucesso!');

      const agentRes = await fetch('/api/stackspot', {
        method: 'POST',
        body: JSON.stringify({
          action: 'agent',
          agentId: '01K0A85A27C5PS5QEY6SNAC7X6',
          userPrompt: 'Extraia as informações',
          uploadIds: id
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      const certificate: CertificadoCNPJ = await agentRes.json();
      onCertificadoLoaded(certificate);
    } catch (err: any) {
      setUploadState('error');
      setError(err.message || 'Erro desconhecido');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow flex flex-col gap-4">
      <label htmlFor="file-upload" className="block text-gray-700 font-bold mb-2">
        Selecione um arquivo (PDF ou PNG, até 10MB):
      </label>
      <input
        id="file-upload"
        ref={fileInputRef}
        type="file"
        accept=".pdf,image/png"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}
      {successMsg && (
        <div className="text-green-600 text-sm">{successMsg}</div>
      )}
      {selectedFile && (
        <div className="flex items-center justify-between gap-2">
          <span className="text-green-700 text-sm">{selectedFile.name}</span>
          <button
            onClick={handleUpload}
            disabled={uploadState === 'requesting' || uploadState === 'uploading'}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {uploadState === 'uploading' ? 'Enviando...' : 'Upload'}
          </button>
        </div>
      )}
    </div>
  );
}