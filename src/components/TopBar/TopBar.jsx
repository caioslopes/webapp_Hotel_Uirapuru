import styles from './topbar.module.css';
import logo from '../../assets/logo_hotel.png';

const TopBar = () => {

    return (
        <div className={styles.topBar}>
            <img src={logo} alt="Logo Marca Hotel Uirapuru" />
        </div>
    )

}

export default TopBar;