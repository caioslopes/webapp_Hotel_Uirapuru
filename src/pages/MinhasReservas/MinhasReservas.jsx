import { useLocation } from 'react-router-dom';

import styles from './minhasreservas.module.css';

const MinhasReservas = () => {

    const { state } = useLocation();
    console.log(state);

    return (
        <div>
            <h1>Minhas Reservas</h1>
            {state.map((reserva) => {
                console.log(reserva);
                return(
                    <div className={styles.reserva}>
                        <p>Nome: {reserva.hospedePrincipal.nome}</p>
                        <p>Email: {reserva.hospedePrincipal.infoLogin.email}</p>
                        <p>Telefone: {reserva.hospedePrincipal.telefone}</p>
                        <p>Tipo Documento:{reserva.hospedePrincipal.infosBasicas.tipoDocumento}</p>
                        <p>Numero Documento: {reserva.hospedePrincipal.infosBasicas.numeroDocumento}</p>
                        <p>Data de Nascimento: {reserva.dataNascimento}</p>
                        <p>Check-in: {reserva.checkIn}</p>
                        <p>Check-out: {reserva.checkOut}</p>
                        <p>Quarto: {reserva.tipoQuarto}</p>
                        <p>Valor: {reserva.precoDiaria}</p>
                    </div>
                )
            })}
        </div>
    );
}

export default MinhasReservas;
