import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LocalizationProvider, useLocalization } from './local';

const MockComponent = () => {
    const { lang, texts, setLang, setTexts } = useLocalization();
    const handelClick=()=>{
      setLang('ru');
      setTexts({example:'new text'});
    }
    return (
      <div>
        <p>{texts.example || 'Default Text'}</p>
        <p>{`Current Language: ${lang}`}</p>
        <button onClick={handelClick}>Change lang</button>
      </div>
    );
  };

  describe('useLocalization component', () => {

    test ('renders children with default values', () => {
      render(
        <LocalizationProvider>
          <MockComponent />
        </LocalizationProvider>
      );
      expect(screen.getByText('Default Text')).toBeInTheDocument();
      expect(screen.getByText('Current Language: en')).toBeInTheDocument();
    });  
    test ('sets and gets the language correctly', () => {
      render(
        <LocalizationProvider>
          <MockComponent />
        </LocalizationProvider>
      );      
      expect(screen.queryByText('Current Language: en')).toBeInTheDocument();
      expect(screen.queryByText('new text')).not.toBeInTheDocument();
      expect(screen.queryByText('Current Language: ru')).not.toBeInTheDocument();
      fireEvent.click(screen.getByRole('button'));
      expect(screen.queryByText('Current Language: en')).not.toBeInTheDocument();
      expect(screen.queryByText('Current Language: ru')).toBeInTheDocument();
      expect(screen.queryByText('new text')).toBeInTheDocument();

    });  

    

  });