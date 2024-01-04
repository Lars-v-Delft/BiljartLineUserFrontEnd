import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home', () => {
    it('should have "Ga naar Competities"', () => {
        render(<Home />); // Arrange

        const myElem = screen.getByText('Ga naar Competities'); // Act

        expect(myElem).toBeInTheDocument(); // Assert
    })

    it('should have "Welkom op de BiljartLine website"', () => {
        render(<Home />); // Arrange

        const myElem = screen.getByText(/Welkom op de BiljartLine website/); // Act

        expect(myElem).toBeInTheDocument(); // Assert
    })
})