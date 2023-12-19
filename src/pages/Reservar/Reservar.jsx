import { useEffect, useState } from "react";
import { DatePicker, Input, InputNumber, Select } from 'antd';
import { useNavigate } from "react-router-dom";

import styles from './reservar.module.css';
import TopBar from '../../components/TopBar/TopBar';
import { request } from "../../utils/index";
import { BotaoLaranja, BotaoPreto } from "../../components/Botoes/Botoes";

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
    const [precoDiaria, setPrecoDiaria] = useState(0);

    /* Dados Segunda Etapa */
    const [hospedePrincipal, setHospedePrincipal] = useState([{}]);
    const [acompanhantes, setAcompanhantes] = useState([{}]);

    const getTiposQuartos = async () => {
        const response = await request("GET", "tipoquarto");
        const ops = response.map((option) => {
            return {
              value: option.tipoQuarto,
              label: option.tipoQuarto,
            };
          })
        setOptions(ops);
    };

    useEffect(() => {
        getTiposQuartos();
        setHospedePrincipal(JSON.parse(localStorage.getItem("Usuario")));
    }, []);

    useEffect(() => {
        switch(tipoQuarto){
            case "NORMAL":
                setPrecoDiaria(100);
                break;
            case "SUITE":
                setPrecoDiaria(200);
                break;
            case "LUXO":
                setPrecoDiaria(300);
                break;
        }
    }, [tipoQuarto]);

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

    const handleAcompanhantesChange = (e, i) => {
        const { name, value } = e.target;
        const campoAcompanhantes = [...acompanhantes];

        const listaAcompanhantes = [...campoAcompanhantes]
        listaAcompanhantes[i] = {
            ...listaAcompanhantes[i],
            [name]: value,
        };
        setAcompanhantes(listaAcompanhantes);
    }

    const renderHospedePrincipal = () => {
        return (
            <>
                <div className={styles.dadosPessoais}>
                    <label>Hospede Principal</label>
                    <Input
                        name="nome"
                        placeholder="Nome do hóspede"
                        value={hospedePrincipal.nome}
                        disabled
                    />
                    <Input
                        name="documento"
                        value={hospedePrincipal.documento.numeroDocumento}
                        placeholder="Documento do hóspede"
                        disabled
                    />
                </div>
            </>
        )
    }

    const renderAcompanhantes = () => {
        return Array.from(Array((adultos - 1)+criancas).keys()).map((i) => (
            <>
                <div className={styles.dadosPessoais}>
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
                </div>
            </>
        ))
    }

    const changeStateAcancar = (e, boolean) => {
        e.preventDefault();
        setAvancar(boolean);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const reservation = {
            hospedePrincipal,
            checkIn,
            checkOut,
            tipoQuarto,
            acompanhantes,
            dataChegada: null,
            dataSaida: null,
            precoDiaria,
            precoEstadia: 0,
            ativa: false,
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
      };

    return (
        <div>
            <TopBar/>

            <h1 className={styles.title}>{ !avancar ? "Reservar" : "Confirmar Sua Reserva" }</h1>

            <form className={styles.form}>
                { !avancar ? (
                    <>
                        <div className={styles.box__primeiraEtapa}>
                            <div>
                                <label>Check In</label>
                                <DatePicker
                                    onChange={handleCheckInChange} 
                                />
                            </div>
                            <div>
                                <label>Check Out</label>
                                <DatePicker 
                                    onChange={handleCheckOutChange} 
                                />
                            </div>
                            <div>
                                <label>Adultos</label>
                                <InputNumber 
                                    min={1} 
                                    max={3} 
                                    defaultValue={1}
                                    onChange={handleAdultsChange} 
                                    value={adultos}
                                />
                            </div>
                            <div>
                                <label>Crianças</label>
                                <InputNumber
                                    min={0} 
                                    max={2} 
                                    defaultValue={0} 
                                    onChange={handleChildrenChange}
                                    value={criancas}
                                />
                            </div>
                        </div>
                        <div className={styles.box__tipoAcomodacao}>
                            <label>Tipo da Acomodação</label>
                            <Select
                                size="large"
                                defaultValue="Selecione uma opção" 
                                options={options}
                                onChange={handleTipoQuartoChange}
                                value={tipoQuarto}
                            />
                        </div>
                        <button className={styles.botaoCinza} onClick={(e)=>{ changeStateAcancar(e, true) }}>Avançar</button>
                    </>
                ) : (
                    <>
                        <div className={styles.box__segundaEtapa}>
                            <div>
                                <label>Check In</label>
                                <p>{checkIn}</p>
                            </div>

                            <div>
                                <label>Check Out</label>
                                <p>{checkOut}</p>
                            </div>

                            <div>
                                <label>Adultos</label>
                                <p>{adultos}</p>
                            </div>

                            <div>
                                <label>Crianças</label>
                                <p>{criancas}</p>
                            </div>

                            <div>
                                <label>Tipo quarto</label>
                                <p>{tipoQuarto}</p>
                            </div>

                            <div>
                                <label>Preço Diaria</label>
                                <p>{precoDiaria}</p>
                            </div>

                        </div>
                        
                        {renderHospedePrincipal()}
                        
                        {renderAcompanhantes()}
                        
                        <button className={styles.botaoCinza} onClick={(e)=>{ changeStateAcancar(e, false) }}>Voltar</button>

                        <BotaoLaranja text="Confirmar Reserva" onClick={handleSubmit} />
                    </>
                ) }
            </form>
            <br />
            <BotaoPreto text="Sair" link="/" />
        </div>
    )
}

export default Reservar;