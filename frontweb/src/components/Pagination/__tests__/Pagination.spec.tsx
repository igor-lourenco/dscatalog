import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from '..';

describe('Pagination tests', () => {
  test('should render Pagination', () => {
    const pageCount = 3;
    const range = 3;

    render(<Pagination pageCount={pageCount} range={range} />);

    const page1 = screen.getByText('1');
    const page2 = screen.getByText('2');
    const page3 = screen.getByText('3');
    const page4 = screen.queryByText('4');

    expect(page1).toBeInTheDocument();
    expect(page1).toHaveClass('pagination-link-active');
    expect(page2).toBeInTheDocument();
    expect(page2).not.toHaveClass('pagination-link-active');
    expect(page3).toBeInTheDocument();
    expect(page3).not.toHaveClass('pagination-link-active');
    expect(page4).not.toBeInTheDocument();
  });

  test('next arrow should call onChange', () => {
    const pageCount = 3;
    const range = 3;
    const onChange = jest.fn(); //simula uma função

    render(
      <Pagination pageCount={pageCount} range={range} onChange={onChange} />
    );

    const arrowNext = screen.getByTestId('arrow-next');

    userEvent.click(arrowNext); //simula o evento do click do usuario
    expect(onChange).toHaveBeenCalledWith(1);
  });
});
