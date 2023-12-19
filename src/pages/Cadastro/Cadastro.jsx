import { DatePicker, Input, Select } from "antd";
import styles from "./cadastro.module.css";
import BotaoPadrao from "../../components/BotaoPadrao/BotaoPadrao";
import { useState } from "react";

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [nomePai, setNomePai] = useState("");
  const [nomeMae, setNomeMae] = useState("");
  const [dataNascimento, setDataNascimento] = useState(null);
  const [nacionalidade, setNacionalidade] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("RG");
  const [nDocumento, setNDocumento] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [rua, setRua] = useState("");
  const [numeroRua, setNumeroRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleCadastro = () => {
    const dadosFormulario = {
      nome: nome,
      documento: {
        nomePai: nomePai,
        nomeMae: nomeMae,
        dataNascimento: dataNascimento
          ? dataNascimento.format("YYYY-MM-DD")
          : "",
        nacionalidade: nacionalidade,
        tipoDocumento: tipoDocumento,
        numeroDocumento: nDocumento,
      },
      endereco: {
        estado: estado,
        cidade: cidade,
        rua: rua,
        numero: numeroRua,
        bairro: bairro,
      },
      telefone: telefone,
      infoLogin: {
        email: email,
        senha: senha,
        tipoLogin: "HOSPEDE",
      },
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(dadosFormulario),
    };

    fetch("http://localhost:8080/hotel/hospedes", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  return (
    <>
      <h1>Cadastro</h1>
      <form className={styles.formulario}>
        <div>
          <hr />
          <h3>Documentacao</h3>

          <label htmlFor="nome">Nome</label>
          <Input
            placeholder="Digite seu nome"
            name="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <div className={styles.documentoContainer}>
            <div>
              <label htmlFor="nDocumento">Numero do Documento</label>
              <Input
                className={styles.inputDocumento}
                placeholder="Documento"
                name="nDocumento"
                value={nDocumento}
                onChange={(e) => setNDocumento(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="tipoDocumento">Tipo</label>
              <Select
                defaultValue="RG"
                options={[
                  { value: "RG", label: "RG" },
                  { value: "PASSAPORTE", label: "PASSAPORTE" },
                  { value: "CPF", label: "CPF" },
                ]}
                name="tipoDocumento"
                value={tipoDocumento}
                onChange={(value) => setTipoDocumento(value)}
              />
            </div>
          </div>

          <div className={styles.dataNascimento}>
            <label htmlFor="dataNascimento">Data de Nascimento</label>
            <DatePicker
              onChange={(date) => setDataNascimento(date)}
              value={dataNascimento}
            />
          </div>
          <label htmlFor="nomePai">Nome do Pai</label>
          <Input
            placeholder="Digite o nome do teu pai"
            name="nomePai"
            value={nomePai}
            onChange={(e) => setNomePai(e.target.value)}
          />
          <label htmlFor="nomeMae">Nome da Mae</label>
          <Input
            placeholder="Digite o nome da tua mãe"
            name="nomeMae"
            value={nomeMae}
            onChange={(e) => setNomeMae(e.target.value)}
          />
          <label htmlFor="nacionalidade">Nacionalidade</label>
          <Input
            placeholder="Digite a tua nacionalidade"
            name="nacionalidade"
            value={nacionalidade}
            onChange={(e) => setNacionalidade(e.target.value)}
          />
        </div>
        <div>
          <hr />
          <h3>Endereco</h3>

          <label htmlFor="estado">Estado</label>
          <Input
            placeholder="Digite o teu estado"
            name="estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          />
          <label htmlFor="cidade">Cidade</label>
          <Input
            placeholder="Digite a tua cidade"
            name="cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />
          <label htmlFor="rua">Digite a tua rua</label>
          <Input
            placeholder="Digite a tua rua"
            name="rua"
            value={rua}
            onChange={(e) => setRua(e.target.value)}
          />
          <label htmlFor="numeroRua">Numero</label>
          <Input
            placeholder="Digite o numero da tua casa"
            name="numeroRua"
            value={numeroRua}
            onChange={(e) => setNumeroRua(e.target.value)}
          />
          <label htmlFor="bairro">Bairro</label>
          <Input
            placeholder="Digite o teu bairro"
            name="bairro"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
          />
        </div>
        <div>
          <hr />

          <h3>Informcoes adicionais</h3>

          <label htmlFor="telefone">Telefone</label>
          <Input
            placeholder="Digite o teu telefone"
            name="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <Input
            placeholder="Digite o teu email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="senha">Senha</label>
          <Input.Password
            placeholder="Digite a tua senha"
            name="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <BotaoPadrao text="Cadastrar" onClick={handleCadastro} />
      </form>
    </>
  );
};

export default Cadastro;
