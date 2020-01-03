import React from "react";
import { Modal, Button, Row, Col, Input, Upload, Icon } from "antd";
import { Typography } from "antd";
import { Select } from "antd";
import Axios from "axios";
import Swal from "sweetalert2";
const { Option } = Select;
const { Title } = Typography;
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      loading: false,
      visible: false,
      username: "",
      password: "",
      handlingInput: ""
    };
  }

  showModalLogin = () => {
    this.setState({
      visible: true
    });
  };

  // handleOk = () => {
  //   this.setState({ loading: true });
  //   setTimeout(() => {
  //     this.setState({ loading: false, visible: false });
  //   }, 3000);
  // };

  handleCancel = () => {
    this.setState({
      visible: false,
      handlingInput: "",
      // Reset form data
      fileList: [],
      username: "",
      password: ""
      // Reset form data
    });
  };

  handleChangeInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleLogin() {
    if (this.state.username === "") {
      this.setState({ handlingInput: "* Username Cannot Empty" });
    } else if (this.state.password === "") {
      this.setState({ handlingInput: "* Password Cannot Empty" });
    } else {
      let username = this.state.username;
      let password = this.state.password;
      let adminLogin = {
        username,
        password
      };
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ loading: false });
        Axios.post("http://localhost:8000/admin/login", adminLogin)
          .then(res => {
              console.log("res",res);
              
            this.setState({ visible: false });
            // console.log(res.data.token);
            localStorage.setItem("token", res.data.token);
            Swal.fire("Login Success", "Welcome Admin", "success").then(() => {
              // this.props.getMenuData();
              document.location.href = "/";
            });
          })
          .catch(error => {
            Swal.fire(
              "Login Failed",
              "Wrong username & Password",
              "error"
            ).then(() => {
              // this.props.getMenuData();
              // document.location.href = "/";
            });
            console.log(error);
          });
      }, 3000);
    }
    
  }

  render() {
    const { visible, loading } = this.state;

    return (
      <div>
        <Modal
          visible={visible}
          title="Login"
          // onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.handleLogin}
            >
              Login
            </Button>,
            <p style={{ fontSize: 13, color: "red", float: "left" }}>
              {this.state.handlingInput}
            </p>
          ]}
        >
          <Row>
            <Col span={8}>
              <Title level={3}>Username</Title>
            </Col>
            <Col span={16}>
              <Input
                value={this.state.username}
                name="username"
                onChange={this.handleChangeInput}
                placeholder="Input Username"
                style={{ width: "100%" }}
              />
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <Title level={3}>Password</Title>
            </Col>
            <Col span={16}>
              <Input
                value={this.state.password}
                type="password"
                name="password"
                min={1}
                onChange={this.handleChangeInput}
                placeholder="Input Password"
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default Login;