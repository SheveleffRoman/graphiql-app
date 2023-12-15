import { ReactNode } from "react";

export type Lang = 'en' | 'ru';

export type TTranslet = {
  [key: string]: string;
};

export interface LocalizationContextProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  texts: TTranslet;
  setTexts: (texts: TTranslet) => void;
}

export type LocalizationProviderProp = {
  children: ReactNode;
};

export const RU_TEXT={
    welcomeText :'Вводный текст',
    login: 'Авторизоваться',
    email: "Email:",
    password: "Пароль:",
    newUser:"У вас нет учетной записи? ",
    newUserLink:"Зарегистрируйтесь здесь."

}

export const EN_TEXT={
    welcomeText :'Welcome',
    login: 'Login',
    email: "Email:",
    password: "Password:",
    newUser:"Don&apos;t have an account? ",
    newUserLink:"Register here"

}