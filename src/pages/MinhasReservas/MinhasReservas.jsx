import { useLocation } from "react-router-dom";
import styles from "./minhasreservas.module.css";

const formatarData = (data) => {
  const dataFormatada = new Date(data).toLocaleDateString("pt-BR");
  return dataFormatada;
};

const formatarDataNascimento = (dataNascimento) => {
  const [ano, mes, dia] = dataNascimento.split("-");
  return `${dia}/${mes}/${ano}`;
};

const MinhasReservas = () => {
  const { state } = useLocation();
  console.log(state);

  return (
    <div>
      <h1>Minhas Reservas</h1>
      {state.reservas.map((reserva, index) => {
        console.log(reserva);
        return (
          <div className={styles.reserva} key={index}>
            <p>Nome: {reserva.hospedePrincipal.nome}</p>
            <p>Email: {reserva.hospedePrincipal.infoLogin.email}</p>
            <p>Telefone: {reserva.hospedePrincipal.telefone}</p>
            <p>
              Tipo Documento:
              {reserva.hospedePrincipal.documento.tipoDocumento}
            </p>
            <p>
              Numero Documento:{" "}
              {reserva.hospedePrincipal.documento.numeroDocumento}
            </p>
            <p>
              Data de Nascimento:{" "}
              {formatarDataNascimento(reserva.hospedePrincipal.documento.dataNascimento)}
            </p>
            <p>Check-in: {formatarData(reserva.checkIn)}</p>
            <p>Check-out: {formatarData(reserva.checkOut)}</p>
            <p>Quarto: {reserva.tipoQuarto}</p>
            <p>Valor: {reserva.precoDiaria}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MinhasReservas;
