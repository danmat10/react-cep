import React, { Component } from "react";
import { FaSpinner } from "react-icons/fa";
import "./Endereco.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Alert } from "react-bootstrap";
import { FormGroup } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

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
      this.setState({ addressData: {} });
      this.setState({ isLoading: false });
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
      <Container>
        <h2 style={{ textAlign: "center" }}>Endereço</h2>
        <Form
          className="align-items-center"
          onSubmit={this.handleSubmit}
          style={{ width: "400px", margin: "auto" }}
        >
          <FormGroup className="text-center">
            <Form.Label htmlFor="cep">CEP:</Form.Label>
            <Form.Control
              type="text"
              id="cep"
              name="cep"
              value={this.state.cep}
              onChange={this.handleCepChange}
            />
          </FormGroup>
          <Row className="justify-content-md-center">
            <Button
              style={{ width: "200px", marginBottom: "20px" }}
              type="submit"
              variant="success"
            >
              Buscar
            </Button>
          </Row>
          {this.state.cepError !== "" && (
            <Alert variant={"danger"}>{this.state.cepError}</Alert>
          )}
        </Form>
        {this.state.isLoading && (
          <div className="text-center">
            <FaSpinner className="spinner" />
          </div>
        )}
        {Object.keys(this.state.addressData).length > 0 && (
          <div style={{ textAlign: "center" }}>
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
      </Container>
    );
  }
}

export default Endereco;
