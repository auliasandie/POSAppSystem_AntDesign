import React from "react";
import Contents from "./Content";
import {
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Row,
  Col,
  Card,
  Button,
  InputNumber
} from "antd";
import axios from "axios";
// import addModal from "./addModal"

// import MenuFood from "../Helpers/Menu";
import Meta from "antd/lib/card/Meta";
import "../Style/Home.css";
import Title from "antd/lib/typography/Title";
import { Route, BrowserRouter, Switch, Link} from 'react-router-dom';
import History from './History';
import addModal from './addModal'
import ModalAdd from "./ModalAdd";
const { Header, Content, Footer, Sider } = Layout;

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      cartItem: [],
      products: [],
      clicks: 0,
      show: true,
      size: "large"
    };
  }
  sendBackData = count => {
    this.props.parentCallback(count + 1);
  };
  removeCartItem(iditem) {
    this.setState({
      cartItem: this.state.cartItem.filter(
        cartcontent => cartcontent.id !== iditem
      )
    });

    // this.props.parentCallback(count + 1)
  }
  handleSizeChange = e => {
    this.setState({ size: e.target.value });
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  handleAddcart(data) {
    this.setState(previousState => ({
      cartItem: [...previousState.cartItem, data]
    }));
  }
  IncrementItem = index => {
    const cartItemCopy = this.state.cartItem;
    cartItemCopy[index].qty++;
    this.setState({ cartItem: cartItemCopy });
  };
  DecreaseItem = index => {
    const cartItemCopy = this.state.cartItem;
    cartItemCopy[index].qty--;
    this.setState({ cartItem: cartItemCopy });
  };
  componentDidMount() {
    axios
      .get("http://localhost:8000/product/")
      .then(response => {
        console.log(response.data);
        this.setState({ products: response.data.message.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  showModal(){
    this.refs.childadd.showModalAdd()
  }

  render() {
    console.log("ini data product dari database ", this.state.products);

    const total = this.state.cartItem.reduce(
      (totals, sum) => totals + sum.qty * sum.price,
      0
    );

    console.log("Ini cart:", this.state.cartItem);
    const { size } = this.state;

    return (
      <Layout style={{ minHeight: "100vh" }}>
          <ModalAdd ref="childadd" />
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          {/* <addModal ref="childadd" /> */}
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1">
            <Link to="/home">
              <Icon type="ordered-list" />
              <span>Menu</span>
            </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/history">
              <Icon type="history" />
              <span>History</span>
              </Link>
            </Menu.Item>
            <Menu.Item onClick={() => {
                this.showModal();
              }}>
              <Icon type="plus" />
              <span>Add Menu</span>
            
            </Menu.Item>
            <Menu.Item>
              <Icon type="login" />
              <span>Edit Menu</span>
            </Menu.Item>
            <Menu.Item>
              <Icon type="login" />
              <span>Admin Login</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Switch>
        {/* <Route exact path="/" component={Sidebar}/> */}
        <Route path="/home" component={Contents}/>
        <Route path="/history" component={History}/>
      </Switch>
        {/* <Contents /> */}
      </Layout>
    );
  }
}

// import React from "react";
// import {
//   Layout,
//   Menu,
//   Breadcrumb,
//   Icon,
//   Row,
//   Col,
//   Card,
//   Button,
//   InputNumber
// } from "antd";
// import Meta from "antd/lib/card/Meta";
// import "../Style/Home.css";
// import Title from "antd/lib/typography/Title";
// import Axios from "axios";
// import { Link } from "react-router-dom";
// import History from '../Components/History'
// // import Allmenu from '../Components/Allmenu';

// const { Header, Content, Footer, Sider } = Layout;

// export default class Sidebar extends React.Component {
//   constructor(props) {
//     super();
//     this.state = {
//       collapsed: false,
//       cartItem: [],
//       clicks: 0,
//       show: true,
//       size: "large",
//       food: []
//     };
//   }

//   componentDidMount() {
//     Axios.get("http://localhost:8000/product")
//       .then(response => {
//         console.log(response.data.message.data, "CEKKK");
//         const allFood = response.data.message.data;
//         this.setState({
//           food: allFood
//         });
//       })
//       .catch(function(error) {
//         console.log(error);
//       });
//   }
//   sendBackData = count => {
//     this.props.parentCallback(count + 1);
//   };
//   removeCartItem(iditem) {
//     this.setState({
//       cartItem: this.state.cartItem.filter(
//         cartcontent => cartcontent.id !== iditem
//       )
//     });

//     // this.props.parentCallback(count + 1)
//   }
//   handleSizeChange = e => {
//     this.setState({ size: e.target.value });
//   };

//   onCollapse = collapsed => {
//     console.log(collapsed);
//     this.setState({ collapsed });
//   };

//   handleAddcart(data) {
//     this.setState(previousState => ({
//       cartItem: [...previousState.cartItem, data]
//     }));
//   }
//   IncrementItem = index => {
//     const cartItemCopy = this.state.cartItem;
//     cartItemCopy[index].qty++;
//     this.setState({ cartItem: cartItemCopy });
//   };
//   DecreaseItem = index => {
//     const cartItemCopy = this.state.cartItem;
//     cartItemCopy[index].qty--;
//     this.setState({ cartItem: cartItemCopy });
//   };

//   render() {
//     const total = this.state.cartItem.reduce(
//       (totals, sum) => totals + sum.qty * sum.price_product,
//       0
//     );

//     console.log("Ini cart:", this.state.cartItem);
//     const { size } = this.state;

//     return (
//       <Layout style={{ minHeight: "100vh" }}>
//         <Sider
//           collapsible
//           collapsed={this.state.collapsed}
//           onCollapse={this.onCollapse}
//         >
//           <div className="logo" />
//           <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
//             <Menu.Item key="1">
//             <Link to="/menu">
//               <Icon type="food" />
//               <span>Menu</span>
//             </Link>
//             </Menu.Item>
//             <Menu.Item>
//             <Link to={"/history"}>
//               <Icon type="ordered-list" />
//               <span>History</span>
//             </Link>
//             </Menu.Item>
//             <Menu.Item>
//             <Link to={"/"}>
//               <Icon type="plus" />
//               <span>Add Menu</span>
//             </Link>
//             </Menu.Item>
//           </Menu>
//         </Sider>
//         <Layout>
//           <Header style={{ background: "#fff", padding: 0 }}>
//             <Row>
//               <Col span={14}>
//                 <div>
//                   {/* <Icon type="ordered-list" /> */}
//                   <h3
//                     style={{
//                       textAlign: "center",
//                       fontWeight: "bold"
//                     }}
//                   >
//                     Food Items
//                   </h3>
//                 </div>
//               </Col>
//               <Col span={1}>
//                 <Button shape="circle" icon="search" />
//               </Col>
//               <Col span={9}>
//                 <h3
//                   style={{
//                     textAlign: "center",
//                     fontWeight: "bold"
//                   }}
//                 >
//                   Cart
//                 </h3>
//               </Col>
//             </Row>
//           </Header>
//           <Row>
//             {/* <Allmenu /> */}
//             {/* INI PRODUCT */}
//             <Col span={16}>
//               <Content style={{ margin: "24px 16px 0" }}>
//                 <div
//                   style={{
//                     padding: 24,
//                     background: "#fff",
//                     minHeight: 360
//                   }}
//                 >
//                   <Row gutter={16}>
//                     {this.state.food.map((makanan, index) => {
//                       return (
//                         <Col span={8}>
//                           <Card
//                             key={index}
//                             hoverable
//                             style={{
//                               width: 210,
//                               marginBottom: 18,
//                               borderTopLeftRadius: 10,
//                               borderTopRightRadius: 10
//                             }}
//                             cover={
//                               <img
//                                 onClick={() =>
//                                   this.state.cartItem.filter(
//                                     cart => makanan.id === cart.id
//                                   ).length > 0
//                                     ? null
//                                     : this.handleAddcart({ ...makanan, qty: 1 })
//                                 }
//                                 alt="example"
//                                 src={makanan.image_product}
//                                 style={{
//                                   opacity:
//                                     this.state.cartItem.filter(
//                                       cart => makanan.id === cart.id
//                                     ).length > 0
//                                       ? 0.5
//                                       : "",
//                                   backgroundColor:
//                                     this.state.cartItem.filter(
//                                       cart => makanan.id === cart.id
//                                     ).length > 0
//                                       ? "black"
//                                       : "",
//                                   height: 200,
//                                   objectFit: "cover",
//                                   borderTopLeftRadius: 10,
//                                   borderTopRightRadius: 10
//                                 }}
//                               />
//                             }
//                           >
//                             <Meta
//                               title={makanan.name_product}
//                               description={"Rp. " +(makanan.price_product)}
//                             />
//                             {this.state.cartItem.filter(
//                               cart => makanan.id === cart.id
//                             ).length > 0 && (
//                               <img
//                                 style={{
//                                   position: "absolute",
//                                   bottom: "50%",
//                                   left: "25%",
//                                   paddingLeft: 10
//                                 }}
//                                 width="50%"
//                                 src="https://image.flaticon.com/icons/png/512/443/443138.png"
//                               />
//                             )}
//                           </Card>
//                         </Col>
//                       );
//                     })}
//                   </Row>
//                 </div>
//               </Content>
//             </Col>
//             {/* INI PRODUCT */}
//             {/* INI CHART */}
//             <Col span={7}>
//               <Content style={{ margin: "24px 16px 0" }}>
//                 <div className="itemconfiguration">
//                   <div
//                     style={{
//                       padding: 24,
//                       background: "#fff",
//                       minHeight: 200
//                     }}
//                   >
//                     {this.state.cartItem.length > 0 ? (
//                       this.state.cartItem.map((cartcontent, index) => {
//                         return (
//                           <Row gutter={[16, 16]}>
//                             <Card
//                               title={cartcontent.name_product}
//                               bordered={false}
//                               extra={
//                                 <a
//                                   onClick={() =>
//                                     this.removeCartItem(cartcontent.id)
//                                   }
//                                 >
//                                   Remove
//                                 </a>
//                               }
//                               style={{ width: "100%" }}
//                             >
//                               <Col span={12}>
//                                 <img
//                                   src={cartcontent.image_product}
//                                   style={{ width: "100%" }}
//                                 />
//                                 <p>
//                                   Rp.
//                                   {cartcontent.qty == 0
//                                     ? this.removeCartItem(cartcontent.id)
//                                     : cartcontent.price_product *
//                                       cartcontent.qty}
//                                 </p>
//                               </Col>
//                               <Col span={12}>
//                                 <Row gutter={[8, 8]}>
//                                   <Col span={6}>
//                                     <Button
//                                       onClick={() => this.DecreaseItem(index)}
//                                       size="small"
//                                     >
//                                       -
//                                     </Button>
//                                   </Col>
//                                   <Col span={9}>
//                                     <InputNumber
//                                       onChange={this.state.clicks}
//                                       size="small"
//                                       style={{
//                                         width: "40px"
//                                       }}
//                                       min={1}
//                                       max={100000}
//                                       value={cartcontent.qty}
//                                     />
//                                   </Col>
//                                   <Col span={7}>
//                                     <Button
//                                       size="small"
//                                       onClick={() => this.IncrementItem(index)}
//                                     >
//                                       +
//                                     </Button>
//                                   </Col>
//                                 </Row>
//                               </Col>
//                             </Card>
//                           </Row>
//                         );
//                       })
//                     ) : (
//                       <div style={{ paddingTop: "40%" }}>
//                         <img
//                           src={require("../Assets/cartempty.png")}
//                           style={{
//                             objectFit: "cover",
//                             width: "100%",
//                             height: "100%"
//                           }}
//                         />
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </Content>
//             </Col>
//             {/* INI CHART */}
            
//           </Row>
//           <Row>
//             {/* INI TOTAL */}
//             <Col span={16}></Col>
//             <Col span={7}>
//               <Card style={{ width: "100%", marginTop: "-85%" }}>
//                 <Title level={4}>Total : {total}*</Title>
//                 <p>*Exlude PPN</p>
//                 <Button type="primary" style={{marginLeft: 80}} size={size}>
//           CHECKOUT
//         </Button>
//         <br></br>
//         <Button type="primary" style={{marginLeft: 90, marginTop: 10}}size={size}>
//           CANCEL
//         </Button>
//               </Card>
//             </Col>
//             {/* INI TOTAL */}
//           </Row>
//         </Layout>
//       </Layout>
//     );
//   }
// }
