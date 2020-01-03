import React from "react";
import { Modal, Button, Row, Col, Input, Upload, Icon } from "antd";
import { Typography } from "antd";
import { Select } from "antd";
import Axios from "axios";
import Swal from "sweetalert2";
const { Option } = Select;
const { Title } = Typography;
class Logout extends React.Component {
  constructor(props) {
    super(props);
    // this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      loading: false,
      visible: false
    };
  }

  showModalLogout = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  handleLogout() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
      localStorage.removeItem("token");
      Swal.fire("Logout Success", "You have successfully logged out!", "success").then(() => {
        // this.props.getMenuData();
        document.location.href = "/";
      });
      //   document.location.href = "/";
    }, 3000);
  }

  render() {
    const { visible, loading } = this.state;

    return (
      <div>
        <Modal
          visible={visible}
          title="Logout"
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.handleLogout}
            >
              Yes
            </Button>
          ]}
        >
          <Row>
            <Col span={24}>
              <center>
                <Title>Are you sure to logout?</Title>
              </center>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default Logout;