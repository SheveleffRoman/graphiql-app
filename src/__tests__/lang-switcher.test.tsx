import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import LangSwitch from '../components/lang-switcher/lang-switcher';
import { useLocalization } from '../context/local';
import { LocalizationContextProps } from '../context/types';

jest.mock('../context/local', () => ({
  ...jest.requireActual('../context/local'),
  useLocalization: jest.fn(),
}));

describe('LangSwitch component', () => {
  beforeEach(() => {
    const mockContext: LocalizationContextProps = {
      lang: 'en',
      setLang: jest.fn(),
      setTexts: jest.fn(),
      texts: {
        test: 'test',
      },
    };
    (useLocalization as jest.Mock).mockReturnValue(mockContext);
  });

  test('renders LangSwitch component', () => {
    const { container } = render(<LangSwitch />);
    expect(container).toBeInTheDocument();
  });
  test('opens and closes language dropdown on mouse enter/leave', () => {
    render(<LangSwitch />);
    expect(screen.queryByText(/Français/i)).not.toBeInTheDocument();
    fireEvent.mouseEnter(screen.getByTestId('switch'));
    expect(screen.queryByText(/Français/i)).toBeInTheDocument();
    fireEvent.mouseLeave(screen.getByTestId('switch'));
    expect(screen.queryByText(/Français/i)).not.toBeInTheDocument();
  });
  test('switches language on click', () => {
    render(<LangSwitch />);
    fireEvent.mouseEnter(screen.getByTestId('switch'));
    const fr = screen.getByText(/Français/i);
    fireEvent.click(fr);
    expect(useLocalization().setLang).toHaveBeenCalledWith('fr');
  });
});