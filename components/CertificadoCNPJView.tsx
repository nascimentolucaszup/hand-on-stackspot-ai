import React from 'react';

type CertificadoCNPJ = {
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

type Props = {
  certificado: CertificadoCNPJ;
};

export default function CertificadoCNPJView({ certificado }: Props) {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded text-amber-950">
      <h2 className="text-2xl font-bold mb-4">Certificado CNPJ</h2>
      <div className="mb-2">
        <span className="font-semibold">Nome Empresarial:</span> {certificado.nome_empresarial}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Nome Fantasia:</span> {certificado.nome_fantasia}
      </div>
      <div className="mb-2">
        <span className="font-semibold">CNPJ:</span> {certificado.cnpj}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Data de Abertura:</span> {certificado.data_abertura}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Natureza Jurídica:</span> {certificado.natureza_juridica}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Situação Cadastral:</span> {certificado.situacao_cadastral}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Data Situação Cadastral:</span> {certificado.data_situacao_cadastral}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Motivo Situação Cadastral:</span> {certificado.motivo_situacao_cadastral}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Endereço:</span> {certificado.endereco}, {certificado.municipio} - {certificado.uf}, CEP: {certificado.cep}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Telefone:</span> {certificado.telefone}
      </div>
      <div className="mb-2">
        <span className="font-semibold">E-mail:</span> {certificado.email}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Atividade Principal:</span> {certificado.atividade_principal}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Atividades Secundárias:</span>
        <ul className="list-disc list-inside ml-4">
          {certificado.atividades_secundarias?.map((atv, idx) => (
            <li key={idx}>{atv}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}