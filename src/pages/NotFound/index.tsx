import { FC } from 'react';
import styles from './NotFound.module.scss';
import Button from '@mui/material/Button';

const NotFound: FC = () => {
  return (
    <div>
      <h1>404 Page Error</h1>

      <p className={styles.zoom_area}>Page Not Found</p>
      <div className={styles.link_container}>
        <Button size="small" variant="outlined" href="/">
          Back to home page
        </Button>
      </div>
      <section className={styles.error_container}>
        <span>
          <span>4</span>
        </span>
        <span>0</span>
        <span>
          <span>4</span>
        </span>
      </section>
    </div>
  );
};

export default NotFound;
