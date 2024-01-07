import { useLocalization } from '../../context/local';
import styles from './Footer.module.scss';
import { LINK_COURS, LINK_DEV1, LINK_DEV2, LINK_DEV3 } from './constants';

function Footer() {
  const { texts } = useLocalization();
  return (
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className="textGroup">
          <span className="footerSpan">© </span>
          <span className="footerSpan">2023</span>
        </div>
        <div className={styles.linksGroup}>
          <a href={LINK_DEV1} className={styles.footerLink}>
            {texts.developer1}
          </a>
          <a
            href={LINK_DEV2}
            className={styles.footerLink}
          >
            {texts.developer2}
          </a>
          <a href={LINK_DEV3} className={styles.footerLink}>
            {texts.developer3}
          </a>
        </div>
        <a href={LINK_COURS}>
          {' '}
          <div className={styles.footerLogo}></div>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
