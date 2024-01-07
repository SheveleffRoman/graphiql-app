import { ReactNode } from 'react';

export type TTranslet = {
  [key: string]: string;
};

export interface LocalizationContextProps {
  lang: string;
  setLang: (lang: string) => void;
  texts: TTranslet;
  setTexts: (texts: TTranslet) => void;
}

export type LocalizationProviderProp = {
  children: ReactNode;
};
