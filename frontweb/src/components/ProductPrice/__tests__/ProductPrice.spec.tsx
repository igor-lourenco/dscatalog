import { render, screen } from "@testing-library/react";
import { formatPrice } from "../../../util/formatters";
import ProductPrice from "..";


test('should render ProductPrice', () => {
    const text = 'R$';
    const value = 10.1;

    render(<ProductPrice price={value}/>);
    const result = formatPrice(value);

    expect(screen.getByText(text)).toBeInTheDocument();
    expect(result).toEqual('10,10');
})