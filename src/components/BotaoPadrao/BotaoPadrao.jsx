import { Link } from 'react-router-dom';
import styles from './botaopadrao.module.css'; 

const BotaoPadrao = ({ text, onClick, link }) => {
  return (
    <Link to={link}>
        <button onClick={onClick} className={styles.botaoPadrao}>
            {text}
        </button>
    </Link>
  );
}

export default BotaoPadrao;