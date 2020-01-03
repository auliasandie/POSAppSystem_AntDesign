import React from "react";
import { Modal, Button, Row, Col, Input, Upload, Icon } from "antd";
import { Typography } from "antd";
import { Select } from "antd";
import Axios from "axios";
import Swal from "sweetalert2";

const { Option } = Select;
const { Title } = Typography;
class ModalEdit extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleEditMenu = this.handleEditMenu.bind(this);
    this.handleDeleteMenu = this.handleDeleteMenu.bind(this);
    this.state = {
      loading: false,
      loading2: false,
      visible: false,
      name_product: "",
      price_product: "",
      category_name: "",
      image_product: "",
      handlingInput: ""
    };
  }

  showModalEdit = (id, name_product, price_product, category_name, image_product) => {
    this.setState({
      visible: true,
      id: id,
      name_product: name_product,
      price_product: price_product,
      category_name: category_name,
      image_product: image_product
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      previewVisible: false,
      handlingInput: ""
    });
  };

  handleChangeInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleChangeCategory(value) {
    this.setState({
      category_name: value
    });
  }

  handleDeleteMenu() {
    let id = this.state.id;
    this.setState({ loading2: true });
    setTimeout(() => {
      this.setState({ loading2: false, visible: false });
      Axios.delete(`http://localhost:8000/product/${id}`)
        .then(() => {
          Swal.fire("Delete Success", "Menu has ben deleted", "success").then(
            () => {
              document.location.href = "/";
            }
          );
        })
        .catch(error => {
          console.log(error);
        });
    }, 3000);
  }

  handleEditMenu() {
    let id = this.state.id;
    if (this.state.name_product === "") {
      this.setState({ handlingInput: "* Name Cannot Be Empty" });
    } else if (this.state.price_product === "" || this.state.price < 1) {
      this.setState({ handlingInput: "* Price Cannot Be Empty" });
    } else if (this.state.category_name === "") {
      this.setState({ handlingInput: "* Category Cannot Be Empty" }); 
    } else if (this.state.image_product === "") {
        this.setState({handlingInput: "* Image Cannot Be Empty"})
    } else {
      const menuNew = {
        name_product: this.state.name_product,
        price_product: this.state.price_product,
        category_name: this.state.category_name,
        image_product: this.state.image_product
      };
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ loading: false, visible: false });
        Axios.put(`http://localhost:8000/product/${id}`, menuNew)
          .then(() => {
            Swal.fire("Edit Success", "Menu has been edited", "success").then(
              () => {
                // this.props.getMenuData();
                document.location.href = "/";
              }
            );
          })
          .catch(error => {
            console.log(error);
          });
      }, 3000);
    }
  }

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  render() {
    const { visible, loading, loading2 } = this.state;
    return (
      <div>
        <Modal
          visible={visible}
          title="Add Menu"
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
              onClick={this.handleEditMenu}
            >
              Update
            </Button>,
            <Button
              style={{ float: "left", marginRight: "1%" }}
              key="submit"
              type="danger"
              loading={loading2}
              onClick={this.handleDeleteMenu}
            >
              Delete
            </Button>,
            <p style={{ fontSize: 13, color: "red", float: "left" }}>
              {this.state.handlingInput}
            </p>
          ]}
        >
          <Row>
            <Col span={8}>
              <Title level={3}>Name</Title>
            </Col>
            <Col span={16}>
              <Input
                value={this.state.name_product}
                name="name_product"
                onChange={this.handleChangeInput}
                placeholder="Input Name"
                style={{ width: "100%" }}
              />
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <Title level={3}>Price</Title>
            </Col>
            <Col span={16}>
              <Input
                value={this.state.price_product}
                type="number"
                name="price_product"
                min={1}
                onChange={this.handleChangeInput}
                placeholder="Input Price"
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Title level={3}>Category</Title>
            </Col>
            <Col span={16}>
              <Select
                // name="category"
                value={this.state.category_name}
                style={{ width: "100%" }}
                onChange={this.handleChangeCategory}
              >
                <Option disabled value="">
                  Select Category
                </Option>
                <Option value="Food">Food</Option>
                <Option value="Beverage">Beverage</Option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Title level={3}>Image</Title>
              {/* <p>Image</p> */}
              {/* <Title level={4}>(Choose One)</Title> */}
            </Col>
            <Col span={16}>
              {/* <Upload
                disabled={this.state.image_product === "" ? false : true}
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleUpload}
                beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
              >
                {uploadButton}
              </Upload> */}
              <Input
                value={this.state.image_product}
                // disabled={this.state.fileList.length > 0 ? true : false}
                type="text"
                name="image_product"
                onChange={this.handleChangeInput}
                placeholder="Input URL Img"
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default ModalEdit;