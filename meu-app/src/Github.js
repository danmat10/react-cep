import React, { Component } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FormGroup } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

class Github extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      avatarUrl: "",
      bio: "",
      followers: "",
      following: "",
      repos: "",
      login: "",
      usernameError: "",
    };
  }

  handleChange = (event) => {
    this.setState({ username: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username } = this.state;
    axios
      .get(`https://api.github.com/users/${username}`)
      .then((response) => {
        const { avatar_url, bio, followers, following, public_repos, login } =
          response.data;
        this.setState({
          avatarUrl: avatar_url,
          bio: bio,
          followers: followers,
          following: following,
          repos: public_repos,
          login: login,
          usernameError: "",
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          this.setState({ usernameError: "Usuário não encontrado!" });
        } else {
          this.setState({
            usernameError: "Ocorreu um erro ao buscar o usuário.",
          });
        }
      });
  };
  render() {
    const { login, username, avatarUrl, bio, followers, following, repos } =
      this.state;
    return (
      <Container>
        <h2 style={{ textAlign: "center" }}>Github</h2>
        <Form
          className="align-items-center"
          onSubmit={this.handleSubmit}
          style={{ width: "400px", margin: "auto" }}
        >
          <FormGroup className="text-center">
            <Form.Label htmlFor="username">Usuário:</Form.Label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={this.handleChange}
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
        </Form>
        {this.state.usernameError !== "" && (
          <Alert variant={"danger"}>{this.state.usernameError}</Alert>
        )}
        {this.state.login !== "" && (
          <div className="card mt-3" style={{ width: "800px", margin: "auto" }}>
            <div className="card-body">
              <Row className="justify-content-md-center">
                <div
                  className="col-md-4"
                  style={{
                    textAlign: "center",
                  }}
                >
                  <img
                    src={avatarUrl}
                    alt="avatar"
                    className="img-fluid rounded-circle"
                    style={{ width: "200px" }}
                  />
                </div>
                <div
                  className="col-md-8"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <p>{bio}</p>
                  <ul>
                    <li>
                      <strong>Login:</strong> {login}
                    </li>
                    <li>
                      <strong>Seguidores:</strong> {followers}
                    </li>
                    <li>
                      <strong>Seguindo:</strong> {following}
                    </li>
                    <li>
                      <strong>Repositórios Públicos:</strong> {repos}
                    </li>
                  </ul>
                </div>
              </Row>
            </div>
          </div>
        )}
      </Container>
    );
  }
}

export default Github;
