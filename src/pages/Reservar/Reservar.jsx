import { useEffect, useState } from "react";
import { DatePicker, Input, InputNumber, Select } from 'antd';
import { useNavigate } from "react-router-dom";

import styles from './reservar.module.css';
import TopBar from '../../components/TopBar/TopBar';
import { request } from "../../utils/index";
import BotaoPadrao from "../../components/BotaoPadrao/BotaoPadrao";

const Reservar = () => {

    const navigateTo = useNavigate();

    /* Dados Primeira Etapa */
    const [options, setOptions] = useState([]);
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);
    const [adultos, setAdultos] = useState(1);
    const [criancas, setCriancas] = useState(0);
    const [tipoQuarto, setTipoQuarto] = useState("Selecione uma opção");
    const [avancar, setAvancar] = useState(false);

    /* Dados Segunda Etapa */
    const [hospedePrincipal, setHospedePrincipal] = useState([{}]);
    const [acompanhantes, setAcompanhantes] = useState([{}]);

    const getTiposQuartos = async () => {
        const response = await request("GET", "tiposquartos");
        setOptions(response);
        console.log("Response: ", response);
    };

    /* useEffect(() => {
        getTiposQuartos();
    }, []); */

    const handleCheckInChange = (date, dateString) => {
        setCheckIn(dateString);
    }

    const handleCheckOutChange = (date, dateString) => {
        setCheckOut(dateString);
    }

    const handleAdultsChange = (value) => {
        setAdultos(value);
    };

    const handleChildrenChange = (value) => {
        setCriancas(value);
    };

    const handleTipoQuartoChange = (value) => {
        setTipoQuarto(value);
    }

    const verificaPrimeiraEtapa = () => {
        if(!checkIn || !checkOut || !adultos || !tipoQuarto){
            return Alert("Preencha todos os campos");
        }
        setAvancar(true);
    }

    const handleHospedePrincipalChange = (e, i) => {
        const { name, value } = e.target;
        const campoHospedePrincipal = hospedePrincipal;

        const objHospedePrincipal = [...campoHospedePrincipal];
        objHospedePrincipal[i] = {
            ...objHospedePrincipal[i],
            [name]: value,
        };
        setHospedePrincipal(objHospedePrincipal);
        console.log("hospedePrincipal: ", hospedePrincipal);
    }

    const handleAcompanhantesChange = (e, i) => {
        const { name, value } = e.target;
        const campoAcompanhantes = [...acompanhantes];

        const listaAcompanhantes = [...campoAcompanhantes]
        listaAcompanhantes[i] = {
            ...listaAcompanhantes[i],
            [name]: value,
        };
        setAcompanhantes(listaAcompanhantes);
        console.log("acompanhantes: ", acompanhantes);
    }

    const renderHospedePrincipal = () => {
        return (
            <>
                <label>Hospede Principal</label>
                <Input
                    name="nome"
                    placeholder="Nome do hóspede"
                    onChange={(e) => {handleHospedePrincipalChange(e, 0)}}
                />
                <Input
                    name="documento"
                    placeholder="Documento do hóspede"
                    onChange={(e) => {handleHospedePrincipalChange(e, 1)}}
                />
            </>
        )
    }

    const renderAcompanhantes = () => {
        return Array.from(Array((adultos - 1)+criancas).keys()).map((i) => (
            <>
                <label>Acompanhantes</label>
                <Input
                    key={i+1}
                    name={`nome_${i}`} 
                    placeholder="Nome do hóspede"
                    onChange={(e) => handleAcompanhantesChange(e, i)}
                />
                <Input
                    key={i+2}
                    name={`documento_${i}`}
                    placeholder="Documento do hóspede"
                    onChange={(e) => handleAcompanhantesChange(e, i)}
                />
            </>
        ))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const reservation = {
            checkIn,
            checkOut,
            adultos,
            criancas,
            tipoQuarto,
            hospedePrincipal,
            acompanhantes,
        };
        console.log("Reserva:", reservation);
    };

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

    return (
        <div>
            <TopBar/>

            <h1 className={styles.title}>Reservar</h1>

            <form className={styles.form}>
                { !avancar ? (
                    <>
                        <label>Check In</label>
                        <DatePicker
                            onChange={handleCheckInChange} 
                            value={checkIn}
                        />
                        <label>Check Out</label>
                        <DatePicker 
                            onChange={handleCheckOutChange} 
                            value={checkOut}
                        />
                        <label>Adultos</label>
                        <InputNumber 
                            min={1} 
                            max={3} 
                            defaultValue={1}
                            onChange={handleAdultsChange} 
                            value={adultos}
                        />
                        <label>Crianças</label>
                        <InputNumber
                            min={0} 
                            max={2} 
                            defaultValue={0} 
                            onChange={handleChildrenChange}
                            value={criancas}
                        />
                        <label>Quartos</label>
                        <Select
                            defaultValue="Selecione uma opção" 
                            options={[
                                {
                                value: 'jack',
                                label: 'Jack',
                                },
                                {
                                value: 'lucy',
                                label: 'Lucy',
                                },
                                {
                                value: 'Yiminghe',
                                label: 'yiminghe',
                                },
                            ]}
                            onChange={handleTipoQuartoChange}
                            value={tipoQuarto}
                        />
                        <button onClick={()=>{ setAvancar(true)}}>Avançar</button>
                    </>
                ) : (
                    <>
                        <label>Confirme sua reserva</label>
                        <div>
                            <label>Check In</label>
                            <p>{checkIn}</p>

                            <label>Check Out</label>
                            <p>{checkOut}</p>

                            <label>Adultos</label>
                            <p>{adultos}</p>

                            <label>Crianças</label>
                            <p>{criancas}</p>

                            <label>Tipo quarto</label>
                            <p>{tipoQuarto}</p>

                        </div>
                        <div>
                            {renderHospedePrincipal()}
                            
                            {renderAcompanhantes()}
                        </div>
                        <button onClick={()=>{ setAvancar(false)}}>Voltar</button>
                        <button onClick={handleSubmit}>Confirmar Reserva</button>
                    </>
                ) }
            </form>
            <BotaoPadrao text="Sair" link="/" />
        </div>
    )
}

export default Reservar;