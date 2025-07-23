'use client';

import React, { useState } from 'react';
import CertificadoCNPJView from '@/components/CertificadoCNPJView';
import FileDownloadUpload from '@/components/FileDownloadUpload';

export default function Home() {
  const [certificado, setCertificado] = useState<any>(null);

  return (
    <>
      <FileDownloadUpload onCertificadoLoaded={setCertificado} />
      {certificado && <CertificadoCNPJView certificado={certificado} />}
    </>
  );
}