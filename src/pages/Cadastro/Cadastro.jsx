import { DatePicker, Input, Select } from "antd";

const Cadastro = () => {
  return (
    <>
      <h1>Cadastro</h1>
      <form>
        <div>
          <h3>Documentacao</h3>
          <label htmlFor="nome">Nome</label>
          <Input placeholder="Digite seu nome" name="nome" />
          <label htmlFor="nDocumento">Numero do Documento</label>
          <Input
            placeholder="Digite o numero do teu documento"
            name="nDocumento"
          />

          <label htmlFor="tipoDocumento">Tipo do Documento</label>
          <Select
            defaultValue="RG"
            options={[
              { value: "RG", label: "RG" },
              { value: "PASSAPORTE", label: "PASSAPORTE" },
              { value: "CPF", label: "CPF" },
            ]}
            name="tipoDocumento"
          />
          <label htmlFor="dataNascimento">Data de Nascimento</label>
          <DatePicker />
          <label htmlFor="nomePai">Nome do Pai</label>
          <Input placeholder="Digite o nome do teu pai" />
          <label htmlFor="nomeMae">Nome da Mae</label>
          <Input placeholder="Digite o nome da tua mãe" />
          <label htmlFor="nacionalidade">Nacionalidade</label>
          <Input placeholder="Digite a tua nacionalidade" />
        </div>
        <div>
          <h3>Endereco</h3>
          <label htmlFor="estado">Estado</label>
          <Input placeholder="Digite o teu estado" name="estado" />
          <label htmlFor="cidade">Cidade</label>
          <Input placeholder="Digite a tua cidade" name="cidade" />
          <label htmlFor="rua">Digite a tua rua</label>
          <Input placeholder="Digite a tua rua" name="rua" />
          <label htmlFor="numeroRua">Numero</label>
          <Input placeholder="Digite o numero da tua casa" name="numeroRua" />
          <label htmlFor="bairro">Bairro</label>
          <Input placeholder="Digite o teu bairro" name="bairro" />
        </div>
        <div>
          <h3>Informcoes adicionais</h3>
          <label htmlFor="telefone">Telefone</label>
          <Input placeholder="Digite o teu telefone" name="telefone" />
          <label htmlFor="email">Email</label>
          <Input placeholder="Digite o teu email" name="email" />
          <label htmlFor="senha">Senha</label>
          <Input.Password placeholder="Digite a tua senha" name="senha" />
        </div>
      </form>
    </>
  );
};

export default Cadastro;
