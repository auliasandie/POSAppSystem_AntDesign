import React, { Component } from "react";
import { Table, Divider, Tag, Row, Col, Typography } from "antd";
import axios from "axios";
const { Title } = Typography;

const { Column, ColumnGroup } = Table;

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCheckout: this.props.dataCheckout
    };
  }

  async componentDidMount() {
    axios.get("http://localhost:8000/order/detail").then(res => {
      this.setState({
        dataCheckout: res.data.message[0]
      });
    });
  }

  //

  render() {
    return (
      <table style={{ width: "90%" }}>
        <thead>
          <tr>
            <th>ID Receipt</th>
            <th>Product List</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-column="First Name"></td>
            <td data-column="Last Name"></td>
            <td data-column="Job Title"></td>
            <td data-column="Twitter" style={{ maxWidth: 300 }}></td>
            <td data-column="Twitter"></td>
          </tr>
        </tbody>
      </table>
    );
  }
}
