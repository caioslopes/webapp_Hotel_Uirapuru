import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from 'antd';

import styles from './consultar.module.css';
import logo from '../../assets/logo_hotel.png';
import BotaoPadrao from "../../components/BotaoPadrao/BotaoPadrao";
import { request } from "../../utils/index";

const Consultar = () => {

    const [email, setEmail] = useState('');
    const navigateTo = useNavigate();

    const handleEmail = (e) => {
        setEmail(e.target.value);
        console.log("Email: ", email);
    }

    const consultarReserva = () => {
        if(email === '') {
            alert("Digite o email cadastrado na reserva");
            return;
        }
        console.log("Email: ", email);
        getMinhasReservas(email);
    }

    const getMinhasReservas = async (email) => {
        const response = await request("GET", `reservas/${email}`);
        response.map((reserva) => {
            if(reserva){
                console.log("Reserva: ", reserva);
                navigateTo("/minhas-reservas", {state: response});
            }else{
                alert("Não há reservas cadastradas com esse email");
            }
        })
        /* console.log("Response: ", response); */
      };

    return(
        <div className={styles.inicio}>
            <img src={logo} alt="Logo Hotel" />
            <Input 
                placeholder="Digite o email cadastrado na reserva" 
                onChange={handleEmail}
            />
            <BotaoPadrao text="Consultar" onClick={consultarReserva} />
            <BotaoPadrao text="Voltar" link="/" />
        </div>
    )
}

export default Consultar;