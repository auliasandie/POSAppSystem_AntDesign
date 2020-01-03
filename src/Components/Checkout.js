import React, { Component } from "react";

import { Modal, Typography, Row, Col, Button } from "antd";
import Axios from 'axios';
import Swal from "sweetalert2";
import jsPDF from 'jspdf';
const { Title } = Typography;

export default class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, dataCheckout: this.props.dataCheckout, loading: false, id: new Date().valueOf() };
  }
  // componentDidMount() {
  //   this.setState({
  //     dataCheckout: this.props.dataCheckout
  //   });
  // }
  handleOk = () => {
    console.log('oke')
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };
  handleCheckout = ()=>{
    let data = this.props.dataCheckout.map((d, index) => {
      return d.name_product
    })
    let totalQty = this.props.dataCheckout.reduce((prev,next) => prev.qty + next.qty)
    let formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2
    });
    let ppn = this.props.ppn;
    
    
    console.log(totalQty, 'total qtyyy')
    

    let thisData = data.join(', ')
    console.log(thisData, 'THISSS DATA')
    let total = this.props.total + this.props.ppn;
    console.log(total, 'ini totaaal')
    let formData = {
      sub_total: total,
      name_product: thisData,
      order_id : this.state.id,
      quantity_product: totalQty
    }
    Axios.post(`http://localhost:8000/order`, formData)
    .then((response)=> {
      console.log('cek data', response.data)
    Swal.fire("Transaction Success", "Print Receipt", "success")
    .then(() => {
      document.location.href = "/";
      var doc = new jsPDF();
      let space = 10;
      doc.text(`Receipt Code ${this.state.id}`, 10, (space += 10));
      this.props.dataCheckout.map(data => {
        doc.text(
          `${data.name_product} ${data.qty}x Rp. ${formatter.format(data.price_product * data.qty)}`, 10, 
          (space += 10)
          
        );
      });
      doc.text(
        `PPN Rp. ${formatter.format(ppn)}`,
        10,
        (space += 10)
      );
      doc.text(
        `Total Rp. ${formatter.format(total)}`,
        10,
        (space += 10)
      );
      doc.text(`Payment Cash`, 10, (space += 10));
      doc.save(`${this.state.id}.pdf`);
      });
    })
    .catch(error => {
      console.log(error)
    },3000);
  }


  render() {
    // console.log(this.props.dataCheckout, 'iniiiidatacekout')
    // console.log(data.name_product, 'INI PRODUKK')
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2
    });
    let total = this.props.total + this.props.ppn;
    let ppn = this.props.ppn;
    console.log("DATA CEKOUT DI MODAL", this.props.dataCheckout);
   
    return (
      <div>
        <Modal
          title="Checkout"
          dataCheckout={this.props.dataCheckout}
          visible={this.props.visible}
          onOk={this.props.handleOk}
          onCancel={this.props.handleCancel}
          footer={[
            <Button
              key="submit"
              type="primary"
              loading={this.state.loading}
              onClick={this.handleCheckout}
            >
              Download
            </Button>,
            <p style={{ fontSize: 13, color: "red", float: "left" }}>
              {this.state.handlingInput}
            </p>
          ]}
        >
          <Title level={4}>Receipt {this.state.id}</Title>
          {this.props.dataCheckout.map((data, index) => {
            return (
              <Row>
                <Col span={14}>
                  <Title level={4}>
                    {data.name_product} {data.qty}X
                  
                  </Title>
                </Col>

                <Col span={8}>
                  <Title level={4}> {formatter.format(data.price_product * data.qty)}</Title>
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
