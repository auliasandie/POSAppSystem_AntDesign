import React from "react";
import { Layout, Row, Col, Card, Button, InputNumber, } from "antd";
import axios from "axios";
import Checkout from "./Checkout";
// import MenuFood from "../Helpers/Menu";
import Meta from "antd/lib/card/Meta";
import "../Style/Home.css";
import Title from "antd/lib/typography/Title";
const { Header, Content } = Layout;

export default class Contents extends React.Component {

  render() {
    return (
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
            <p>Hello</p>
        </Content>
      </Layout>
    );
  }
}
