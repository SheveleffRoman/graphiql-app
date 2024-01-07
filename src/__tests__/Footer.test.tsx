
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useLocalization } from '../context/local';
import Footer from '../components/footer/Footer';
import { LINK_COURS, LINK_DEV1, LINK_DEV2, LINK_DEV3 } from '../components/footer/constants'
jest.mock('../context/local', () => ({
  useLocalization: jest.fn(),
}));

describe('Footer component', () => {
  beforeEach(() => {
    (useLocalization as jest.Mock).mockReturnValue({
      texts: {
        developer1: 'Developer 1',
        developer2: 'Developer 2',
        developer3: 'Developer 3',
      },
    });
  });

  test('renders Footer component', () => {
    const { container } = render(<Footer />);   
    expect(container).toBeInTheDocument();
  });

  test('displays correct links with correct href', () => {
    render(<Footer />);    
    const developerLinks = screen.getAllByRole('link');
    expect(developerLinks).toHaveLength(4);
    expect(developerLinks[0]).toHaveTextContent('Developer 1');
    expect(developerLinks[0]).toHaveAttribute('href', LINK_DEV1);
    expect(developerLinks[1]).toHaveTextContent('Developer 2');
    expect(developerLinks[1]).toHaveAttribute('href', LINK_DEV2);
    expect(developerLinks[2]).toHaveTextContent('Developer 3');
    expect(developerLinks[2]).toHaveAttribute('href', LINK_DEV3);
    expect(developerLinks[3]).toHaveAttribute('href', LINK_COURS);

  });


});