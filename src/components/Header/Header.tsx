import { Link } from 'react-router-dom';
import styles from './Header.module.scss'
import { MdOutlineTimer3Select } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.info}>
        <div className={styles.logo} onClick={() => navigate("/")}>
          <MdOutlineTimer3Select />
        </div>
        <div className={styles.title}>3's Tasks</div>
      </div>
      <div className={styles.links}>
        <nav>
          <ul>
            <li>
              <Link className={styles.link} to="/weather">Weather</Link>
            </li>
            <li>
              <Link className={styles.link} to="/crypto">Crypto</Link>
            </li>
            <li>
              <Link className={styles.link} to="/covid">Covid</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header