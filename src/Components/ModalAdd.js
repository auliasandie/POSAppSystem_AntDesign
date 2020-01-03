import React from "react";
import { Modal, Button, Row, Col, Input, Upload, Icon } from "antd";
import { Typography } from "antd";
import { Select } from "antd";
import Axios from "axios";
import Swal from "sweetalert2";

const { Option } = Select;
const { Title } = Typography;

class ModalAdd extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleInputMenu = this.handleInputMenu.bind(this);
    this.state = {
      loading: false,
      visible: false,
      previewVisible: false,
      previewImage: "",
      fileList: [],
      name_product: '',
      price_product: '',
      category_name: '',
      image_product: '',
      handlingInput: null
    };
  }

  showModalAdd = () => {
    this.setState({
      visible: true,
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
      previewVisible: false,
      handlingInput: null,
      // Reset form data
      fileList: [],
      name: "",
      price: "",
      category: "",
      image: ""
      // Reset form data
    });
  };

  // handleCancel = () => this.setState({ previewVisible: false });

  // handlePreview = file => {
  //   this.setState({
  //     previewImage: file.thumbUrl,
  //     previewVisible: true
  //   });
  // };

  handleUpload = ({ fileList }) => {
    //---------------^^^^^----------------
    // this is equivalent to your "const img = event.target.files[0]"
    // here, antd is giving you an array of files, just like event.target.files
    // but the structure is a bit different that the original file
    // the original file is located at the `originFileObj` key of each of this files
    // so `event.target.files[0]` is actually fileList[0].originFileObj
    console.log("fileList", fileList);
    // you store them in state, so that you can make a http req with them later
    this.setState({ fileList });
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

  // handleInputMenu() {
  //   if (this.state.name_product === "") {
  //     this.setState({ handlingInput: "* Name Cannot be Empty" });
  //   } else if (this.state.price_product === "") {
  //     this.setState({ handlingInput: "* Price Cannot be Empty" });
  //   } else if (this.state.category_name === "") {
  //     this.setState({ handlingInput: "* Category Cannot be Empty" });
  //   } else if (this.state.image_product === "") {
  //     this.setState({ handlingInput: "* Image Cannot  be Empty" });
  //   } else {
  //     this.setState({ loading: true });
  //     setTimeout(() => {
  //       this.setState({ loading: false, visible: false });
  //     }, 3000);
  //     const newProduct = new FormData();
  //     newProduct.append("name_product", this.state.name_product);
  //     newProduct.append("price_product", this.state.price_product);
  //     newProduct.append("category_name", this.state.category_name);
  //     if (this.state.fileList.length > 0)
  //       menuNew.append("img", this.state.fileList[0].originFileObj);
  //     else menuNew.append("img", this.state.image_product);
  //     console.log("menu new", newProduct);

  //     Axios.post("http://localhost:8000/product", newProduct)
  //       .then(() => {
  //         Swal.fire("Added Success", "Menu has ben added", "success").then(
  //           () => {
  //             // this.props.getMenuData();
  //             document.location.href = "/";
  //           }
  //         );
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   }
  // }

  handleInputMenu = event => {
    const {name_product, image_product, category_name, price_product}= this.state
    const data = {name_product, image_product, category_name, price_product};
    Axios.post(`http://localhost:8000/product`, data)
    .then((response)=> {
        console.log('cek data', response.data)
      Swal.fire("Added Success", "Menu has been added", "success")
      .then(() => {
        document.location.href = "/";
      }
      )
    })
    .catch(error => {
      console.log(error)
    })
  }

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  render() {
    const { visible, loading } = this.state;
    const { previewVisible, previewImage, fileList } = this.state;
    // const uploadButton = (
    //   <div>
    //     {/* <Icon type="photo" /> */}
    //     <Icon style={{ fontSize: 30 }} type="picture" theme="twoTone" />
    //     {/* <div className="ant-upload-text">Upload</div> */}
    //   </div>
    // );
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
              onClick={this.handleInputMenu}
            >
              Add
            </Button>,
            <p style={{ fontSize: 13, color: "red", float: "left" }}>
              {this.state.handlingInput}
            </p>
          ]}
        >
          <Row>
            <Col span={8}>
              <Title level={3}>Name</Title>
              {/* <p>Name</p> */}
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
              {/* <p>Price</p> */}
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
              {/* <p>Category</p> */}
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
                <Option value="Drink">Drink</Option>
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
                disabled={this.state.fileList.length > 0 ? true : false}
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

export default ModalAdd;