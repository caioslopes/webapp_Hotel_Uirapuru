import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider, } from "react-router-dom";

import { changeBackground } from './utils/index'
import './index.css';
import Inicio from './pages/Inicio/Inicio'
import Reservar from './pages/Reservar/Reservar'
import Login from './pages/Login/Login';
import Consultar from './pages/Consultar/Consultar';
import MinhasReservas from './pages/MinhasReservas/MinhasReservas';
import TelaInicialFuncionario from './pages/SistemaFuncionario/TelaInicialFuncionario';
import TelaInicialAdministrador from './pages/SistemaAdministrador/TelaInicialAdministrador';
import Cadastro from './pages/Cadastro/Cadastro';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Inicio/>,
  },
  {
    path: "/reservar",
    element: <Reservar/>,
  },
  {
    path: "/consultar",
    element: <Consultar/>,
  },
  {
    path: "/minhas-reservas",
    element: <MinhasReservas/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/sistema-funcionario",
    element: <TelaInicialFuncionario/>
  },
  {
    path: "/sistema-administrador",
    element: <TelaInicialAdministrador/>
  },
  {
    path: "/cadastro",
    element: <Cadastro/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)