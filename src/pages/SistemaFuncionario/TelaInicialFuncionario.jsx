import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Table } from 'antd';

import styles from './telainicialfuncionario.module.css';
import TopBar from "../../components/TopBar/TopBar";
import { request } from "../../utils/index";
import BotaoPadrao from "../../components/BotaoPadrao/BotaoPadrao";

const TelaInicialFuncionario = () => {

    const [dataSource, setDataSource] = useState([]);

    const getDataSource = async () => {
        const response = await request("GET", "reservas");
        console.log("Response: ", response);
        setDataSource(response);
    }

    useEffect(() => {
        getDataSource();
    }, [])

    const columns = [
        {
            title: 'Codigo',
            dataIndex: 'codigoAcomodacao',
            key: 'codigoAcomodacao',
        },
        {
            title: 'Tipo Quarto',
            dataIndex: 'tipoQuarto',
            key: 'tipoQuarto',
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: () => ( <Link to="/">Editar/Excluir</Link> ),
            },
        ];

    return (
        <div>
            <TopBar/>

            <h1 className={styles.title}>Sistema Funcionario</h1>

            <button>Efetuar Check In</button>
            <button>Efetuar Check Out</button>

            <Table dataSource={dataSource} columns={columns} />

            <BotaoPadrao text="Sair" link="/" />
        </div>
    )
}

export default TelaInicialFuncionario;