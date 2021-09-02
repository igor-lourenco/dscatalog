import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { server } from './fixtures';
import { Router, useParams } from 'react-router-dom';
import history from '../../../../util/history';
import Form from '../Form';
import selectEvent from 'react-select-event';
import { ToastContainer } from 'react-toastify';

beforeAll(() => server.listen()); //antes de executar os testes
afterEach(() => server.resetHandlers()); //depois de cada teste
afterAll(() => server.close()); //depois que terminar os testes do arquivo

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('Product from create tests', () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({
      productId: 'create',
    });
  });

  test('should show toast and redirect when submit form correctly', async () => {
    render(
      <Router history={history}>
          <ToastContainer />
        <Form />
      </Router>
    );

    //screen.debug();
    const nameInput = screen.getByTestId('name');
    const priceInput = screen.getByTestId('price');
    const imgUrlInput = screen.getByTestId('imgUrl');
    const descriptionInput = screen.getByTestId('description');
    const categoriesInput = screen.getByLabelText('Categorias');

    const submitButton = screen.getByRole('button', {name: /salvar/i})

    userEvent.type(nameInput, 'Computador'); //simula a digitação no campo do nome do produto
    userEvent.type(priceInput, '1234.56'); //simula a digitação no campo do preço do produto
    userEvent.type(
      imgUrlInput,
      'https://static-cse.canva.com/blob/183499/IMAGE-1.jpg'
    ); //simula a digitação no campo do imagem do produto
    userEvent.type(descriptionInput, 'Computador muito bom'); //simula a digitação no campo do descrição do produto

    await selectEvent.select(categoriesInput, ['Eletrônicos', 'Computadores']);

    userEvent.click(submitButton);

    await waitFor(() => {
        const toastElement = screen.getByText('Produto cadastrado com sucesso!')
        expect(toastElement).toBeInTheDocument();
    });

    expect(history.location.pathname).toEqual('/admin/products'); //testa o caminho redirecionado quando cadastra com sucesso
    
  });
});
