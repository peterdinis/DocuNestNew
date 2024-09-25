import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '@/app/_components/shared/Header';

describe('Header Component Fail Test', () => {
    it('should fail when the text does not match', () => {
        const testText = 'Welcome to the Test!';

        render(<Header text={testText} />);

        const wrongText = 'This is the wrong text';

        const headingElement = screen.queryByText(wrongText);
        expect(headingElement).toBeInTheDocument();
    });

    it('should fail when the heading is not an <h2> tag', () => {
        const testText = 'Welcome to the Test!';

        render(<Header text={testText} />);

        const headingElement = screen.getByText(testText);

        expect(headingElement.tagName).toBe('H1');
    });
});
