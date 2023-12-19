import { Link } from 'react-router-dom';
import styles from './botoes.module.css'; 

const BotaoLaranja = ({ text, onClick, link }) => {
  return (
    <Link to={link}>
        <button onClick={onClick} className={styles.botaoLaranja}>
            {text}
        </button>
    </Link>
  );
}

const BotaoPreto = ({ text, onClick, link }) => {
  return (
    <Link to={link}>
        <button onClick={onClick} className={styles.botaoPreto}>
            {text}
        </button>
    </Link>
  );
}

export { BotaoLaranja, BotaoPreto };