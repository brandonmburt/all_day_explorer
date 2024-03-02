import { CardComp } from "./Card";
import { render } from '@testing-library/react';

describe("renders CardComp", () => {
    it("renders correctly with header and body", () => {
        const header = "Test Header";
        const body = "Test Body";
        const { getByText } = render(<CardComp header={header} body={body} />);
        expect(getByText(header)).toBeInTheDocument();
        expect(getByText(body)).toBeInTheDocument();
        expect(document.querySelector('.shadow')?.getAttribute('style')).toContain('margin: 50px 10px');
    });

    it("renders correctly with header and body and mb", () => {
        const header = "Test Header";
        const body = "Test Body";
        const mb = "10px";
        const { getByText } = render(<CardComp header={header} body={body} mb={mb} />);
        expect(getByText(header)).toBeInTheDocument();
        expect(getByText(body)).toBeInTheDocument();
        expect(document.querySelector('.shadow')?.getAttribute('style')).toContain('margin: 10px 10px');
    });
});

