import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "antd";

import styles from "./login.module.css";
import logo from "../../assets/logo_hotel.png";
import BotaoPadrao from "../../components/BotaoPadrao/BotaoPadrao";
import { request } from "../../utils/index";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const navigateTo = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    console.log("Email: ", email);
  };

  const handleSenha = (e) => {
    setSenha(e.target.value);
    console.log("Senha: ", senha);
  };

  const login = async () => {
    if (email === "" || senha === "") {
      alert("Digite seu email e senha");
      return;
    }
    await getLogin(email, senha);

    if (tipoUsuario === "ADMINISTRADOR") {
      navigateTo("/sistema-administrador");
    } else if (tipoUsuario === "FUNCIONARIO") {
      navigateTo("/sistema-funcionario");
    }
  };

  const getLogin = async (email, senha) => {
    const response = await request("GET", `login/${email}/${senha}`);
    
    if (response) {
        localStorage.setItem("Usuario", JSON.stringify(response));
    }

    console.log("Usuario", localStorage.getItem("Usuario"));
    
    setTipoUsuario(response.infoLogin.tipoLogin);
  };

  return (
    <div className={styles.inicio}>
      <img src={logo} alt="Logo Hotel" />
      <Input placeholder="Digite seu email" onChange={handleEmail} />
      <Input.Password placeholder="Digite sua senha" onChange={handleSenha} />
      <BotaoPadrao text="Acessar" onClick={login} />
      <BotaoPadrao text="Voltar" link="/" />
      <Link to="/cadastro">
        Não possui conta ainda? <strong>Cadastrar</strong>
      </Link>
    </div>
  );
};

export default Login;
