import styles from './Footer.module.scss';
const LINK_COURS="https://rs.school/react/";

function Footer() {
  return (
    <footer  className={styles.footer}>   
    <div className={styles.footerWrapper}>
    <div className='textGroup'>
      <span className="footerSpan">© </span>
        <span className="footerSpan">2023</span>
      </div>
       <div className={styles.linksGroup}>
      <a href="https://github.com/Mardon07" className={styles.footerLink}>Мардон</a>
       <a href="https://github.com/SheveleffRoman"  className={styles.footerLink}>Роман</a>
       <a href="https://github.com/AlexOlga"  className={styles.footerLink}>Ольга</a>
       </div>  
       <a href={LINK_COURS}> <div className={styles.footerLogo}></div></a>
          </div>        
          
  </footer>
  
  );
}

export default Footer;
