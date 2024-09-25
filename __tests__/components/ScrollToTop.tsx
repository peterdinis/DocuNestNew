import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ScrollToTop from '@/app/_components/shared/ScrollToTop';

// Mock the scrollTo method in the window object
const scrollToMock = jest.fn();

describe('ScrollToTop Component', () => {
    beforeEach(() => {
        window.scrollTo = scrollToMock;
    });

    it('should not display the ChevronUp icon when scrollY is less than 400', () => {
        render(<ScrollToTop />);
        
        // Simulate scrollY being less than 400
        fireEvent.scroll(window, { target: { scrollY: 200 } });
        
        // ChevronUp should not be in the document
        const chevronIcon = screen.queryByRole('img', { hidden: true });
        expect(chevronIcon).not.toBeInTheDocument();
    });

    it('should display the ChevronUp icon when scrollY is greater than 400', () => {
        render(<ScrollToTop />);
        
        // Simulate scrollY being more than 400
        fireEvent.scroll(window, { target: { scrollY: 500 } });
        
        // ChevronUp should be visible
        const chevronIcon = screen.getByRole('img', { hidden: true });
        expect(chevronIcon).toBeInTheDocument();
    });

    it('should scroll to the top of the page when ChevronUp icon is clicked', () => {
        render(<ScrollToTop />);
        
        // Simulate scrollY being more than 400
        fireEvent.scroll(window, { target: { scrollY: 500 } });
        
        // Click on the ChevronUp icon
        const chevronIcon = screen.getByRole('img', { hidden: true });
        fireEvent.click(chevronIcon);
        
        // Assert that scrollTo has been called with the correct arguments
        expect(scrollToMock).toHaveBeenCalledWith({
            top: 0,
            behavior: 'smooth',
        });
    });
});