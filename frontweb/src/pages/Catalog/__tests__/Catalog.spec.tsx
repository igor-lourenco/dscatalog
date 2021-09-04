import { render, screen, waitFor } from '@testing-library/react';
import Catalog from '..';
import { Router } from 'react-router-dom';
import history from '../../../util/history';
import {server} from './fixtures';

beforeAll(() => server.listen()); //antes de executar os testes
afterEach(() => server.resetHandlers());//depois de cada teste
afterAll(() => server.close()); //depois que terminar os testes do arquivo

describe('Catalog tests',() => {
  test('should render Catalog with products', async () => {
    render(
      <Router history={history}>
        <Catalog />
      </Router>
    );

    expect(screen.getByText('Catálogo de produtos')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('PC Gamer Foo')).toBeInTheDocument();
    });
  });
});
