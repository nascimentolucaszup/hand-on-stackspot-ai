/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FileDownloadUpload from '@/components/FileDownloadUpload';

describe('FileDownloadUpload Component', () => {
  const mockCertificado = {
    nome_empresarial: 'Empresa Exemplo',
    cnpj: '00.000.000/0001-00',
    data_abertura: '01/01/2000',
    natureza_juridica: 'Sociedade Anônima',
    situacao_cadastral: 'Ativa',
    data_situacao_cadastral: '01/01/2020',
    motivo_situacao_cadastral: '',
    endereco: 'Rua Exemplo, 123',
    municipio: 'São Paulo',
    uf: 'SP',
    cep: '01000-000',
    atividade_principal: 'Atividade Principal',
    atividades_secundarias: ['Atividade Secundária 1'],
    nome_fantasia: 'Fantasia Exemplo',
    telefone: '(11) 0000-0000',
    email: 'contato@exemplo.com'
  };

  const mockOnCertificadoLoaded = jest.fn();

  beforeEach(() => {
    mockOnCertificadoLoaded.mockClear();
  });

  test('should display error for invalid file type', async () => {
    render(<FileDownloadUpload onCertificadoLoaded={mockOnCertificadoLoaded} />);
    const fileInput = screen.getByLabelText(/selecione um arquivo/i);
    const file = new File(['(⌐□_□)'], 'chucknorris.gif', { type: 'image/gif' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(await screen.findByText(/apenas arquivos pdf ou png são permitidos/i)).toBeInTheDocument();
  });

  test('should display error for file size exceeding 10MB', async () => {
    render(<FileDownloadUpload onCertificadoLoaded={mockOnCertificadoLoaded} />);
    const fileInput = screen.getByLabelText(/selecione um arquivo/i);
    const file = new File(['a'.repeat(10 * 1024 * 1024 + 1)], 'largefile.pdf', { type: 'application/pdf' });

    fireEvent.change(fileInput, { target: { files: [file] } });
    expect(await screen.findByText(/o arquivo deve ter no máximo 10mb/i)).toBeInTheDocument();
  });

  test('should allow upload of valid file and show success message', async () => {
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ url: 'http://mockurl.com', id: 'mockId', form: {} })
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 204,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCertificado
      });

    render(<FileDownloadUpload onCertificadoLoaded={mockOnCertificadoLoaded} />);
    const fileInput = screen.getByLabelText(/selecione um arquivo/i);
    const file = new File(['(⌐□_□)'], 'document.pdf', { type: 'application/pdf' });

    fireEvent.change(fileInput, { target: { files: [file] } });
    const uploadButton = await screen.findByText(/upload/i);

    fireEvent.click(uploadButton);

    await waitFor(() => expect(mockOnCertificadoLoaded).toHaveBeenCalledWith(mockCertificado));
    expect(screen.getByText(/upload realizado com sucesso/i)).toBeInTheDocument();
  });

  test('should display error message if upload fails', async () => {
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        ok: false,
      });

    render(<FileDownloadUpload onCertificadoLoaded={mockOnCertificadoLoaded} />);
    const fileInput = screen.getByLabelText(/selecione um arquivo/i);
    const file = new File(['(⌐□_□)'], 'document.pdf', { type: 'application/pdf' });

    fireEvent.change(fileInput, { target: { files: [file] } });
    const uploadButton = await screen.findByText(/upload/i);

    fireEvent.click(uploadButton);

    expect(await screen.findByText(/erro ao solicitar upload pré-assinado/i)).toBeInTheDocument();
  });
});