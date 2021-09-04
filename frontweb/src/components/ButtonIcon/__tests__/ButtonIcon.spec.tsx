import { render, screen } from "@testing-library/react";
import ButonIcon from '..';

test('ButtonIcon should render button with given test', () => {
    const text = 'Fazer Login';

    render(<ButonIcon text={text} />);


    //screen.debug();
    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.getByTestId("arrow")).toBeInTheDocument();
})