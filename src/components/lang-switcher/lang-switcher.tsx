import './style.scss';
import { useLocalization } from '../../context/local';
import { EN_TEXT, RU_TEXT, FR_TEXT } from '../../context/constants';
import fr from '../../../public/fr.png';
import en from '../../../public/en.png';
import ru from '../../../public/ru.png';
import { useEffect, useState } from 'react';

type LangItem = {
  data: string;
  path: string;
  text: string;
  objText: { [key: string]: string };
};

type DataLang = {
  [key: string]: LangItem;
};

const dataLang: DataLang = {
  en: {
    data: 'en',
    path: en,
    text: 'English',
    objText: EN_TEXT,
  },
  ru: {
    data: 'ru',
    path: ru,
    text: 'Русский',
    objText: RU_TEXT,
  },
  fr: {
    data: 'fr',
    path: fr,
    text: 'Français',
    objText: FR_TEXT,
  },
};

function LangSwitch() {
  const { lang, setLang, setTexts } = useLocalization();
  const [isOpen, setOpen] = useState<boolean>(false);
  const activeLang = dataLang[lang];
  useEffect(() => {
    const objText = dataLang[lang].objText;
    setOpen(false);
    setTexts(objText);
  }, [lang, setTexts]);

  return (
    <>
      <div className="switch-lang">
        <div
          className="current-lang"
          data-lang={activeLang.data}
          onClick={() => setOpen(!isOpen)}
        >
          <img src={activeLang.path} className="lang-flag" />
          <p className="lang-text"> {activeLang.text} </p>
        </div>
        {isOpen && (
          <div className="lang-dropdown">
            {Object.entries(dataLang).map(([key, value]) => {
              if (key !== lang) {
                return (
                  <div
                    key={key}
                    className="selecting-lang"
                    onClick={() => setLang(key)}
                  >
                    <img src={value.path} className="lang-flag" />
                    <p className="lang-text"> {value.text}</p>
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default LangSwitch;
