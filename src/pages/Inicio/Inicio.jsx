import styles from './inicio.module.css';
import logo from '../../assets/logo_hotel.png';
import BotaoPadrao from "../../components/BotaoPadrao/BotaoPadrao";

const Inicio = () =>{

    return(
        <div className={styles.inicio}>
            <img src={logo} alt="Logo Hotel" />
            <BotaoPadrao text="Reservar" link="/reservar" />
            <BotaoPadrao text="Consultar Reservas" link="/consultar" />
            <BotaoPadrao text="Login" link="/login" />
        </div>
    )

}

export default Inicio;