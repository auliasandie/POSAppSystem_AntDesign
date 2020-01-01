import React, { Component } from "react";

import { Modal, Typography, Row, Col } from "antd";
const { Title } = Typography;

export default class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, dataCheckout: this.props.dataCheckout };
  }
  // componentDidMount() {
  //   this.setState({
  //     dataCheckout: this.props.dataCheckout
  //   });
  // }

  render() {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2
    });
    function makeid(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }
    // let dataCheckout;
    // if (this.props.dataCheckout === []) {
    //   dataCheckout = [];
    // } else dataCheckout = this.props.dataCheckout;
    let total = this.props.total;
    let ppn = this.props.ppn;
    // console.log("totall", total);
    // console.log("test", Checkout);
    console.log("DATA CEKOUT DI MODAL", this.props.dataCheckout);

    return (
      <div>
        <Modal
          title="Checkout"
          dataCheckout={this.props.dataCheckout}
          visible={this.props.visible}
          onOk={this.props.handleOk}
          onCancel={this.props.handleCancel}
        >
          <Title level={4}>Receipt {makeid(20)}</Title>
          {/* <p>{this.props.name}</p>
          <p>{total}</p> */}

          {this.props.dataCheckout.map((data, index) => {
            return (
              <Row>
                <Col span={14}>
                  <Title level={4}>
                    {data.name_product} {data.qty}X
                  </Title>
                </Col>

                <Col span={8}>
                  <Title level={4}> {formatter.format(data.price_product)}</Title>
                </Col>
              </Row>
            );
          })}
          <Row>
            <Col span={14}>
              <Title level={4}>PPN 10%</Title>
            </Col>
            <Col span={8}>
              <Title level={4}>{formatter.format(ppn)}</Title>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col span={14}>
              <Title level={4}>Total</Title>
            </Col>
            <Col span={8}>
              <Title level={4}>{formatter.format(total)}</Title>
            </Col>
          </Row>
          <Row>
            <Col span={14}>
              <Title level={4}>Payment</Title>
            </Col>
            <Col span={8}>
              <Title level={4}>Cash</Title>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}
