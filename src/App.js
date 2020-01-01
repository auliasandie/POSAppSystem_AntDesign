import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import { Route, BrowserRouter, Switch } from 'react-router-dom';
// import Sidebar from './Components/Sidebar'
import Contents from './Components/Content'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Sidebar}/>
        <Route path="/home" component={Sidebar}/>
        <Route path="/history" component={Sidebar}/>


      </Switch>
      </BrowserRouter>
    </div>
  )
}
export default App;
// import React from "react";
// // import logo from "./logo.svg";
// import "./App.css";
// import { Layout, Menu, Breadcrumb, Icon, Row, Col, Button, Badge } from "antd";
// import Item from "antd/lib/list/Item";
// import { Typography } from "antd";
// import { Link } from "react-router-dom";
// import Food from "./Components/Food";
// import History from "./Components/History";
// import Error404 from "./Components/Error404";
// const { Header, Content, Footer, Sider } = Layout;
// const { SubMenu } = Menu;
// const { Title } = Typography;
// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       collapsed: true,
//       cartCount: 0
//     };
//   }

//   // state = { message: "parent message" }
//   callbackFunction = childData => {
//     this.setState({ cartCount: childData });
//   };

//   onCollapse = collapsed => {
//     console.log(collapsed);
//     this.setState({ collapsed });
//   };

//   render() {
//     // let page = this.props.location.search;
//     const query = new URLSearchParams(this.props.location.search);
//     let pages = query.get("page");
//     // console.log(pages);
//     return (
//       <Layout style={{ minHeight: "100vh" }}>
//         <Sider
//           collapsible
//           collapsed={this.state.collapsed}
//           onCollapse={this.onCollapse}
//         >
//           <div className="logo" />
//           <Menu
//             theme="dark"
//             // defaultSelectedKeys={["1"]}
//             selectedKeys={[pages === null || pages === "food" ? "1" : "2"]}
//             mode="inline"
//           >
//             <Item style={{ marginLeft: "35%" }}>
//               <a href="/">
//                 <img
//                   width="32"
//                   src="https://image.flaticon.com/icons/png/512/138/138310.png"
//                 />
//               </a>
//             </Item>
//             {/* <div style={{ marginBottom: 50 }} /> */}
//             <Menu.Item key="1">
//               <Link to={"?page=food"}>
//                 <Icon style={{ fontSize: 25 }} type="shopping-cart" />
//                 <span>Food Item</span>
//               </Link>
//             </Menu.Item>
//             <Menu.Item key="2">
//               <Link to={"?page=history"}>
//                 <Icon style={{ fontSize: 25 }} type="fund" />
//                 <span>History</span>
//               </Link>
//             </Menu.Item>
//             <Menu.Item
//               onClick={() => {
//                 alert("Tambahkan Item Anda");
//               }}
//             >
//               {/* <Link to={"?page=history"}> */}
//               {/* <Icon type="fund" /> */}
//               <Icon style={{ fontSize: 25 }} type="plus-circle" />
//               <span>Add Item</span>
//               {/* </Link> */}
//             </Menu.Item>
//           </Menu>
//         </Sider>
//         <Layout>
//           <Header style={{ background: "#002140", padding: 0, height: 60 }}>
//             <Row>
//               <Col span={pages === null || pages === "food" ? 17 : 24}>
//                 <Title
//                   style={{
//                     color: "white",
//                     paddingLeft: "50%",
//                     paddingTop: 15
//                   }}
//                   level={4}
//                 >
//                   {pages === null || pages === "food" ? "Food Item" : "History"}
//                 </Title>
//               </Col>
//               {pages === null || pages === "food" ? (
//                 <Col span={1}>
//                   <Button shape="circle" icon="search" />
//                 </Col>
//               ) : (
//                 ""
//               )}
//               {pages === null || pages === "food" ? (
//                 <Col span={6}>
//                   <div style={{ paddingLeft: "42%" }}>
//                     <Badge count={this.state.cartCount}>
//                       <Title level={4} style={{ color: "white" }}>
//                         Cart
//                       </Title>
//                     </Badge>
//                   </div>
//                 </Col>
//               ) : (
//                 ""
//               )}
//             </Row>
//           </Header>
//           {/* <Content style={{ margin: "0 16px" }}> */}
//           {/* <Breadcrumb style={{ margin: "16px 0" }}> */}
//           {/* <Breadcrumb.Item> */}
//           {/* {pages === null || pages === "food" ? "Food Item" : "History"} */}
//           {/* </Breadcrumb.Item> */}
//           {/* <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
//           {/* </Breadcrumb> */}
//           <div
//             style={{
//               //padding: 24,
//               background: "#fff",
//               minHeight: 500
//             }}
//           >
//             {pages === null || pages === "food" ? (
//               <Food parentCallback={this.callbackFunction} />
//             ) : pages === "history" ? (
//               <History parentCallback={this.callbackFunction} />
//             ) : (
//               <Error404 />
//             )}
//           </div>
//           {/* </Content> */}
//         </Layout>
//       </Layout>
//     );
//   }
// }

// export default App;

// // import React from "react";
// // import {
// //   Layout,
// //   Menu,
// //   Breadcrumb,
// //   Icon,
// //   Row,
// //   Col,
// //   Card,
// //   Button,
// //   InputNumber
// // } from "antd";
// // // import MenuFood from "../Helpers/Menu";
// // import Axios from 'axios'
// // import Meta from "antd/lib/card/Meta";

// // const { Header, Content, Footer, Sider } = Layout;


// // export default class Sidebar extends React.Component {
// //   constructor(props) {
// //     super();
// //     this.state = {
// //       collapsed: false,
// //       cartItem: [],
// //       clicks: 0,
// //       show: true,
// //       size: "large",
// //       product: '',

// //     };
// //   }
// //   sendBackData = count => {
// //     this.props.parentCallback(count + 1);
// //   };
// //   removeCartItem(iditem) {
// //     this.setState({
// //       cartItem: this.state.cartItem.filter(
// //         cartcontent => cartcontent.id !== iditem
// //       )
// //     });

// //     // this.props.parentCallback(count + 1)
// //   }
// //   handleSizeChange = e => {
// //     this.setState({ size: e.target.value });
// //   };

// //   onCollapse = collapsed => {
// //     console.log(collapsed);
// //     this.setState({ collapsed });
// //   };

// //   handleAddcart(data) {
// //     this.setState(previousState => ({
// //       cartItem: [...previousState.cartItem, data]
// //     }));
// //   }
// //   IncrementItem = index => {
// //     const cartItemCopy = this.state.cartItem;
// //     cartItemCopy[index].qty++;
// //     this.setState({ cartItem: cartItemCopy });
// //   };
// //   DecreaseItem = index => {
// //     const cartItemCopy = this.state.cartItem;
// //     cartItemCopy[index].qty--;
// //     this.setState({ cartItem: cartItemCopy });
// //   };

// //   componentDidMount() {
// //     Axios.get('http://localhost:8000/product')
// //     .then(response => {
// //       // console.log('dataaaf',response.data.message.data)
// //       const allData= response.data.message.data
// //       this.setState({
// //         product: allData
// //       })
// //     })
// //     .catch(function (error) {
// //       console.log('ini error',error)
// //     })
// //   }

// //   render() {
// //     console.log("Ini cart:", this.state.cartItem);
// //     const { size } = this.state; 
// //     console.log("ini product", this.state.product)

// //     return (
// //       // <>
// //       // <h1>temporary</h1>
// //       // {
// //       //   this.state.product.map((food, index) => {
// //       //     return(
// //       //       <Card
            
// //       //       />
// //       //     );
// //       //   })
// //       // }
// //       // </>
// //       <Layout style={{ minHeight: "100vh" }}>
// //         <Sider
// //           collapsible
// //           collapsed={this.state.collapsed}
// //           onCollapse={this.onCollapse}
// //         >
// //           <div className="logo" />
// //           <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
// //             <Menu.Item key="1">
// //               <Icon type="ordered-list" />
// //               <span>Option 1</span>
// //             </Menu.Item>
// //             <Menu.Item>
// //               <Icon type="history" />
// //               <span>Option 1</span>
// //             </Menu.Item>
// //             <Menu.Item>
// //               <Icon type="plus" />
// //               <span>Option 1</span>
// //             </Menu.Item>
// //           </Menu>
// //         </Sider>
// //         <Layout>
// //           <Header style={{ background: "#fff", padding: 0 }}>
// //             <Row>
// //               <Col span={17}>
// //                 <div>
// //                   {/* <Icon type="ordered-list" /> */}
// //                   <h3
// //                     style={{
// //                       textAlign: "center",
// //                       fontWeight: "bold"
// //                     }}
// //                   >
// //                     Food Items
// //                   </h3>
// //                 </div>
// //               </Col>
// //               <Col span={1}>
// //                 <Button shape="circle" icon="search" />
// //               </Col>
// //               <Col span={6}>
// //                 <h3
// //                   style={{
// //                     textAlign: "center",
// //                     fontWeight: "bold"
// //                   }}
// //                 >
// //                   Cart
// //                 </h3>
// //               </Col>
// //             </Row>
// //           </Header>

// //           <Row>
// //             <Col span={18}>
// //               <Content style={{ margin: "24px 16px 0" }}>
// //                 <div
// //                   style={{
// //                     padding: 24,
// //                     background: "#fff",
// //                     minHeight: 360
// //                   }}
// //                 >
// //                   <Row gutter={16}>
// //                     {this.state.product.map((food, index) => {
// //                       return (
// //                         <Col span={8}>
// //                           <Card
// //                             key={index}
// //                             hoverable
// //                             style={{
// //                               width: 240,
// //                               marginBottom: 20,
// //                               borderTopLeftRadius: 10,
// //                               borderTopRightRadius: 10
// //                             }}
// //                             cover={
// //                               <img
// //                                 onClick={() =>
// //                                   this.state.cartItem.filter(
// //                                     cart => food.id === cart.id
// //                                   ).length > 0
// //                                     ? null
// //                                     : this.handleAddcart({ ...food, qty: 1 })
// //                                 }
// //                                 alt="example"
// //                                 src={food.image}
// //                                 style={{
// //                                   opacity:
// //                                     this.state.cartItem.filter(
// //                                       cart => food.id === cart.id
// //                                     ).length > 0
// //                                       ? 0.5
// //                                       : "",
// //                                   backgroundColor:
// //                                     this.state.cartItem.filter(
// //                                       cart => food.id === cart.id
// //                                     ).length > 0
// //                                       ? "black"
// //                                       : "",
// //                                   height: 200,
// //                                   objectFit: "cover",
// //                                   borderTopLeftRadius: 10,
// //                                   borderTopRightRadius: 10
// //                                 }}
// //                               />
// //                             }
// //                           >
// //                             <Meta
// //                               title={food.name}
// //                               description={food.price}
// //                             />
// //                             {this.state.cartItem.filter(
// //                               cart => food.id === cart.id
// //                             ).length > 0 && (
// //                               <img
// //                                 style={{
// //                                   position: "absolute",
// //                                   bottom: "50%",
// //                                   left: "25%",
// //                                   paddingLeft: 10
// //                                 }}
// //                                 width="50%"
// //                                 src="https://image.flaticon.com/icons/png/512/443/443138.png"
// //                               />
// //                             )}
// //                           </Card>
// //                         </Col>
// //                       );
// //                     })}
// //                   </Row>
// //                 </div>
// //               </Content>
// //             </Col>
// //             <Col span={6}>
// //               <Content style={{ margin: "24px 16px 0" }}>
// //                 <div
// //                   style={{
// //                     padding: 24,
// //                     background: "#fff",
// //                     minHeight: 360
// //                   }}
// //                 >
// //                   {this.state.cartItem.length > 0 ? (
// //                     this.state.cartItem.map((cartcontent, index) => {
// //                       return (
// //                         <Row gutter={[16, 16]}>
// //                           <Card
// //                             title={cartcontent.name}
// //                             bordered={false}
// //                             extra={
// //                               <a
// //                                 onClick={() =>
// //                                   this.removeCartItem(cartcontent.id)
// //                                 }
// //                               >
// //                                 Remove
// //                               </a>
// //                             }
// //                             style={{ width: "100%" }}
// //                           >
// //                             <Col span={12}>
// //                               <img
// //                                 src={cartcontent.image}
// //                                 style={{ width: "100%" }}
// //                               />
// //                               <p>{cartcontent.price}</p>
// //                             </Col>
// //                             <Col span={12}>
// //                               <Row gutter={[8, 8]}>
// //                                 <Col span={6}>
// //                                   <Button
// //                                     onClick={() => this.DecreaseItem(index)}
// //                                     size="small"
// //                                   >
// //                                     -
// //                                   </Button>
// //                                 </Col>
// //                                 <Col span={8}>
// //                                   <InputNumber
// //                                     onChange={this.state.clicks}
// //                                     size="small"
// //                                     style={{
// //                                       width: "30px"
// //                                     }}
// //                                     min={1}
// //                                     max={100000}
// //                                     value={cartcontent.qty}
// //                                   />
// //                                 </Col>
// //                                 <Col span={6}>
// //                                   <Button
// //                                     size="small"
// //                                     onClick={() => this.IncrementItem(index)}
// //                                   >
// //                                     +
// //                                   </Button>
// //                                 </Col>
// //                               </Row>
// //                             </Col>
// //                           </Card>
// //                         </Row>
// //                       );
// //                     })
// //                   ) : (
// //                     <div style={{ paddingTop: "40%" }}>
// //                       {/* <img
// //                         src={require("../Assets/cartempty.png")}
// //                         style={{
// //                           objectFit: "cover",
// //                           width: "100%",
// //                           height: "100%"
// //                         }}
// //                       /> */}
// //                     </div>
// //                   )}
// //                 </div>
// //               </Content>
// //             </Col>
// //           </Row>
// //         </Layout>
// //       </Layout>
// //     );
// //   }
// // }// import React from 'react';
// // // import logo from './logo.svg';
// // // import './App.css';

// // // function App() {
// // //   return (
// // //     <div className="App">
// // //       <header className="App-header">
// // //         <img src={logo} className="App-logo" alt="logo" />
// // //         <p>
// // //           Edit <code>src/App.js</code> and save to reload.
// // //         </p>
// // //         <a
// // //           className="App-link"
// // //           href="https://reactjs.org"
// // //           target="_blank"
// // //           rel="noopener noreferrer"
// // //         >
// // //           Learn React
// // //         </a>
// // //       </header>
// // //     </div>
// // //   );
// // // }

// // // export default App;
