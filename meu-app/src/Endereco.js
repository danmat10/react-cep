import React, { Component } from "react";
import { FaSpinner } from "react-icons/fa";
import "./Endereco.css";

class Endereco extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressData: {},
      cep: "",
      cepError: "",
      isLoading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCepChange = this.handleCepChange.bind(this);
  }

  handleCepChange(event) {
    const value = event.target.value;
    this.setState({ cep: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const cepRegex = /^\d{8}$/;
    const cep = data.get("cep");
    if (!cepRegex.test(cep)) {
      this.setState({ cepError: "CEP Inválido" });
      return;
    } else {
      this.setState({ cepError: "" });
    }
    this.setState({ isLoading: true });
    fetch(`https://viacep.com.br/ws/${data.get("cep")}/json/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.erro) {
          this.setState({ cepError: "CEP Inválido" });
          this.setState({ addressData: {} });
          this.setState({ isLoading: false });
          return;
        }
        this.setState({ addressData: data });
        this.setState({ isLoading: false });
      });
  }
  render() {
    return (
      <div className="container">
        <h2>Endereço</h2>
        <form
          onSubmit={this.handleSubmit}
          className="d-flex align-items-center justify-content-center flex-column"
        >
          <div className="form-group">
            <label htmlFor="cep" className="form-label">
              CEP:
            </label>
            <input
              type="text"
              className="form-control"
              id="cep"
              name="cep"
              value={this.state.cep}
              onChange={this.handleCepChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Buscar
          </button>
        </form>
        <div className="invalid-feedback">
          <strong>{this.state.cepError}</strong>
        </div>
        {this.state.isLoading && (
          <div className="text-center">
            <FaSpinner className="spinner" />
          </div>
        )}
        {Object.keys(this.state.addressData).length > 0 && (
          <div>
            <h3 className="mt-3">Dados do endereço:</h3>
            <p>
              <strong>CEP:</strong> {this.state.addressData.cep}
            </p>
            <p>
              <strong>Logradouro:</strong> {this.state.addressData.logradouro}
            </p>
            <p>
              <strong>Bairro:</strong> {this.state.addressData.bairro}
            </p>
            <p>
              <strong>Cidade:</strong> {this.state.addressData.localidade}
            </p>
            <p>
              <strong>Estado:</strong> {this.state.addressData.uf}
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default Endereco;
