import React from "react";
import { Layout, Row, Col, Card, Button, InputNumber, Input, Select } from "antd";
import axios from "axios";
import Checkout from "./Checkout";
// import MenuFood from "../Helpers/Menu";
import Meta from "antd/lib/card/Meta";
import "../Style/Home.css";
import Title from "antd/lib/typography/Title";
import ModalEdit from './ModalEdit';
import Pagination from './Pagination';
const { Header, Content } = Layout;
const { Search } = Input;
const { Option } = Select;

export default class Contents extends React.Component {
  constructor(props) {
    super();
    this.state = {
      collapsed: false,
      cartItem: [],
      products: [],
      clicks: 0,
      show: true,
      size: "large",
      visible: false,
      search: "",
      orderby: "",
      MaxProduct:'',
      currentPage: 1,
      postsPerPage: 6,
      dataParams: {search:"", page: ''},
      sortby: "name_product",
      dataCheckout: []
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

  showModalEdit(d) {
    this.setState({
      edit_id: d.id,
      edit_name_product: d.name_product,
      edit_price_product: d.price_product,
      edit_category_name: d.category_name,
      edit_image_product: d.image_product
    });
    this.refs.childEdit.showModalEdit(
      d.id,
      d.name_product,
      d.price_product,
      d.category_name,
      d.image_product
    );
  }

  showModal = () => {
    this.setState({
      visible: true,
      dataCheckout: this.state.cartItem
    });
  };
  hideModal = () => {
    this.setState({
      visible: false
    });
  };
  
  componentDidMount() {
    axios
      .get("http://localhost:8000/product",)
      .then(response => {
        console.log(response.data);
        this.setState({ products: response.data.message.data, productsShow: response.data.message.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const indexOflastpost = this.state.currentPage * this.state.postsPerPage;
    const indexOffirstPost = indexOflastpost - this.state.postsPerPage;
    const currentPost = this.state.products.slice(
      indexOffirstPost,
      indexOflastpost
    );
 
    const total = this.state.cartItem.reduce(
      (totals, sum) => totals + sum.qty * sum.price_product,
      0
    );
    const ppn = total * 0.1;


    

    const products = this.state.products;
    console.log("INI PRODUCT", products);

   

   
    const handleChange = event => {
      this.setState( {
          dataParams: {
            ...this.state.dataParams, 
            [event.target.name]: event.target.value , 
            page: 1
          }
        
      })
    };

    const handleChangeOrder = async value => {
      await axios
      .get(`http://localhost:8000/product?orderby=${value}`,)
      .then(response => {
        console.log(response.data);
        this.setState({ products: response.data.message.data, productsShow: response.data.message.data });
      })
      .catch(function(error) {
        console.log(error);
      });
    };


    const fetchData = async (dataParams = {}) => {
      console.log(dataParams, 'DATA PARAMSSS')
      const getData = axios
      .get(`http://localhost:8000/product?value=${dataParams}`)
      .then(response => {
        console.log(response, 'YUHUUUUU');
        this.setState({ products: response.data.message.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  
    };

    const onSearch = value => {

      console.log('value', value)
      fetchData(value);
    };
  

    // console.log("Ini cart:", this.state.cartItem);
    const { size } = this.state;

    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2
    });
    // console.log(qty, 'INI QUANTITY')
    return (
      <Layout>
         <ModalEdit ref="childEdit" />
        <Checkout
          ppn={ppn}
          total={total}
          dataCheckout={this.state.cartItem}
          visible={this.state.visible}
          handleOk={this.hideModal}
          handleCancel={this.hideModal}
        />
        <Header style={{ background: "#fff", padding: 0 }}>
          <Row>
            <Col span={14}>
              <div>
                {/* <Icon type="ordered-list" /> */}
                <h3
                  style={{
                    textAlign: "center",
                    fontWeight: "bold"
                  }}
                >
                  Food Items
                </h3>
              </div>
            </Col>
          
            <Row span={1}>
              <Col span={4}>
  
            <Select style={{width:'60%'}} defaultValue="Ascending" value={this.state.dataParams.sortby} onChange={handleChangeOrder}>
            <Option value="asc">Ascending</Option>
            <Option value="desc">Descending</Option>
          </Select> 
          </Col>
          
      
        
                <Search
                  placeholder="Search Product"
                  value={this.state.dataParams.search}
                  name='search'
                  onSearch={value => onSearch(value)}
                  onChange={handleChange}
                  enterButton
                  style={{ width: 200, marginTop: 16 }} 
                />
            </Row>
            <Col span={9}>
              <h3
                style={{
                  textAlign: "center",
                  fontWeight: "bold"
                }}
              >
                Cart
              </h3>
            </Col>
          </Row>
        </Header>

        <Row>
          <Col span={16}>
            <Content style={{ margin: "24px 16px 0" }}>
              <div
                style={{
                  padding: 24,
                  background: "#fff",
                  minHeight: 360
                }}
              >
                <Row gutter={16}>
                  {currentPost.map((d, index) => {
                    return (
                      <Col span={8}>
                        <Card
                          key={index}
                          hoverable
                          style={{
                            width: 210,
                            marginBottom: 20,
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10
                          }}
                          cover={
                            <img
                              onClick={() =>
                                this.state.cartItem.filter(
                                  cart => d.id === cart.id
                                ).length > 0
                                  ? null
                                  : this.handleAddcart({
                                      ...d,
                                      qty: 1
                                    })
                              }
                              alt="example"
                              src={d.image_product}
                              style={{
                                opacity:
                                  this.state.cartItem.filter(
                                    cart => d.id === cart.id
                                  ).length > 0
                                    ? 0.5
                                    : "",
                                backgroundColor:
                                  this.state.cartItem.filter(
                                    cart => d.id === cart.id
                                  ).length > 0
                                    ? "black"
                                    : "",
                                height: 200,
                                objectFit: "cover",
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10
                              }}
                            />
                          }
                        >

                          <Meta
                            title={d.name_product}
                            description={formatter.format(d.price_product)}
                          />
                          
                          {localStorage.token ? (
                            <div>
                              <div style={{ padingTop: 10}}>
                                <Button type="primary"
                                style={{width: "100%", marginTop: 10}}
                                onClick={() => {
                                  this.showModalEdit(d);
                                }}>
                                  Edit
                                </Button>
                              </div>
                          </div> ) : ("")
                          }


                          {this.state.cartItem.filter(cart => d.id === cart.id)
                            .length > 0 && (
                            <img
                              style={{
                                position: "absolute",
                                bottom: "50%",
                                left: "25%",
                                // paddingLeft: 10
                              }}
                              width="50%"
                              src="https://res.cloudinary.com/auliasandie/image/upload/v1577949860/Assets%20Wagyu/verified_1_iadok2.png"
                            />
                          )}
                        </Card>
                      </Col>
                    );
                  })}
               
                </Row>
                <center>
              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  margin: "auto",
                  left: 0,
                  right: 0
                }}
              >
     
                <Pagination
                  currentPage={this.state.currentPage}
                  totalPosts={this.state.products.length}
                  postsPerPage={this.state.postsPerPage}
                  paginate={pagenumbers =>
                    this.setState({ currentPage: pagenumbers })
                  }
                />
              </div>
            </center>
               
              </div>
              
            </Content>
           
          </Col>
          <Col span={7}>
            <Content style={{ margin: "24px 16px 0" }}>
              <div className="itemconfiguration">
                <div
                  style={{
                    padding: 24,
                    background: "#fff",
                    minHeight: 200
                  }}
                >
               
                  
                  {this.state.cartItem.length > 0 ? (
                    this.state.cartItem.map((cartcontent, index) => {
                      return (
                        <Row gutter={[16, 16]}>
                          <Card
                            title={cartcontent.name_product}
                            bordered={false}
                            extra={
                              <a
                                onClick={() =>
                                  this.removeCartItem(cartcontent.id)
                                }
                              >
                                Remove
                              </a>
                            }
                            style={{ width: "100%" }}
                          >
                            <Col span={12}>
                              <img
                                src={cartcontent.image_product}
                                style={{ width: "100%" }}
                              />
                              <br />
                              <br />
                              <Row>
                                {/* <Col span={15}>
                                  <Title level={4}>Subtotal</Title>
                                </Col> */}
                                <br />
                                <Col span={5}>
                                  <Title level={4}>
                                    <p>
                                      {cartcontent.qty == 0
                                        ? this.removeCartItem(cartcontent.id)
                                        : formatter.format(
                                            cartcontent.price_product *
                                              cartcontent.qty
                                          )}
                                    </p>
                                  </Title>
                                </Col>
                              </Row>
                            </Col>
                            <Col span={12}>
                              <Row gutter={[8, 8]}>
                                <Col span={6}>
                                  <Button
                                    onClick={() => this.DecreaseItem(index)}
                                    size="small"
                                  >
                                    -
                                  </Button>
                                </Col>
                                <Col span={9}>
                                  <InputNumber
                                    onChange={this.state.clicks}
                                    size="small"
                                    style={{
                                      width: "40px"
                                    }}
                                    min={1}
                                    max={100000}
                                    value={cartcontent.qty}
                                  />
                                </Col>
                                <Col span={7}>
                                  <Button
                                    size="small"
                                    onClick={() => this.IncrementItem(index)}
                                  >
                                    +
                                  </Button>
                                </Col>
                              </Row>
                            </Col>
                          </Card>
                        </Row>
                      );
                    })
                  ) : (
                    <div style={{ paddingTop: "40%", marginBottom: '100%' }}>
                      <img
                        src={require("../Assets/empty-cart-rappi.png")}
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                          
                        }}
                      />
                      <p style={{fontWeight: 'bold'}}>CART EMPTY</p>
                    </div>
                    
                  )}
                </div>
              </div>
            </Content>
          </Col>
        </Row>
        <Row>
          <Col span={16}></Col>

          <Col
            span={8}
            style={{
              marginTop: "-20%",
              backgroundColor: "none",
              width: "30%"
            }}
          >
               
            {this.state.cartItem.length > 0 ? (
              <Card style={{ width: "100%", marginTop: "5%" }}>
                <Row>
                  <Col span={16}>
                    <p
                      style={{
                        textAlign: "left",
                        fontSize: 20,
                        fontWeight: "bold"
                      }}
                      level={4}
                    >
                      Total :{" "}
                    </p>
                  </Col>
                  <Col span={4}>
                    <p
                      style={{ fontWeight: "bold", marginRight: 70 }}
                      level={4}
                    >
                      {formatter.format(total)}*
                    </p>
                  </Col>
                </Row>

                <p>*EXCLUDE PPN</p>

                <Button
                  onClick={this.showModal}
                  type="primary"
                  style={{
                    width: "100%",
                    marginBottom: 10
                  }}
                >
                  Checkout
                </Button>
                <Button
                  style={{
                    width: "100%"
                  }}
                  type="danger"
                >
                  Cancel
                </Button>
              </Card>
            ) : (
              <Card style={{ width: "100%", marginTop: "30%" }}>
                <Button
                  disabled
                  type="primary"
                  style={{
                    width: "100%",
                    marginBottom: 10
                  }}
                >
                  Checkout
                </Button>
                <Button
                  disabled
                  style={{
                    width: "100%"
                  }}
                  type="danger"
                >
                  Cancel
                </Button>
              </Card>
            )}
          </Col>
        </Row>
       
      </Layout>
    );
  }
}
