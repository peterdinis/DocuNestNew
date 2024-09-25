import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomeWrapper from '@/app/_components/home/HomeWrapper';

jest.mock('next/link', () => {
    return ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
});

jest.mock('@/components/ui/background-beams', () => ({
    BackgroundBeamsWithCollision: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="background-beams">{children}</div>
    ),
}));

describe('HomeWrapper Component', () => {
    it('should render the title "Docu Nest"', () => {
        render(<HomeWrapper />);
        const titleElement = screen.getByText(/Docu Nest/i);
        expect(titleElement).toBeInTheDocument();
    });

    it('should render the correct tagline text', () => {
        render(<HomeWrapper />);
        const taglineElement = screen.getByText(
            /Your one-stop solution for seamless teamwork and project management/i
        );
        expect(taglineElement).toBeInTheDocument();
    });

    it('should render the "Try now" button with the correct link', () => {
        render(<HomeWrapper />);
        const tryNowButton = screen.getByText(/Try now/i);
        expect(tryNowButton.closest('a')).toHaveAttribute('href', '/register');
    });

    it('should render the "Pricing" button', () => {
        render(<HomeWrapper />);
        const pricingButton = screen.getByText(/Pricing/i);
        expect(pricingButton).toBeInTheDocument();
    });

    it('should render the background beams', () => {
        render(<HomeWrapper />);
        const backgroundElement = screen.getByTestId('background-beams');
        expect(backgroundElement).toBeInTheDocument();
    });
});