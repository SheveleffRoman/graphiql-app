import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

// export interface IAppProps {}

export default function GraphiqlIDE() {
  return (
    <>
      <Header />
      <Link to="/">Home</Link>
      <Footer />
    </>
  );
}
