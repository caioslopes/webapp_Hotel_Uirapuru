import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";

import styles from "./consultar.module.css";
import logo from "../../assets/logo_hotel.png";
import BotaoPadrao from "../../components/BotaoPadrao/BotaoPadrao";
import { request } from "../../utils/index";

const Consultar = () => {
  const [email, setEmail] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("Usuario")) {
      setEmail(JSON.parse(localStorage.getItem("Usuario")).infoLogin.email);
    }
  }, []);

  const consultarReserva = () => {
    if (email === "") {
      alert("Digite o email cadastrado na reserva");
      return;
    }
    console.log("Email: ", email);
    getMinhasReservas(email);
  };

  const getMinhasReservas = async (email) => {
    const response = await request("GET", `reservas/${email}`);

    const reservasArray = Array.isArray(response)
      ? response
      : response
      ? [response]
      : []; // Garante que mesmo um objeto único seja colocado dentro de um vetor

    navigateTo("/minhas-reservas", { state: { reservas: reservasArray } }); // Sempre passa um vetor, vazio se não houver resposta

    if (reservasArray.length === 0) {
      alert("Não há reservas cadastradas com esse email");
    }

    /* console.log("Response: ", response); */
  };

  return (
    <div className={styles.inicio}>
      <img src={logo} alt="Logo Hotel" />
      <Input
        placeholder="Digite o email cadastrado na reserva"
        value={email}
        disabled
      />
      <BotaoPadrao text="Consultar" onClick={consultarReserva} />
      <BotaoPadrao text="Voltar" link="/" />
    </div>
  );
};

export default Consultar;
