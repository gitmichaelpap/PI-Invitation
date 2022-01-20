import logo from '~/assets/logo.svg';
import './styles.css';

export default function Home() {
  return (
    <div className="Home">
      <header className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
        <p>
          Carol e Michael
        </p>
      </header>
    </div>
  );
}