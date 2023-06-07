import React, { useState,useEffect } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineDatabase,
  AiOutlineUnorderedList,
  AiOutlineTag,
  AiOutlineBgColors,
  AiOutlinePaperClip,
} from "react-icons/ai";
import {removeToken, token} from "../utils/token"
import {RiCoupon2Fill} from "react-icons/ri"
import {} from "react-icons/bi"
import { Link, Outlet } from "react-router-dom";
import { BiCategoryAlt } from "react-icons/bi";
import { GrProductHunt } from "react-icons/gr";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [hide, setHide] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  useEffect(()=>{
    if(!token){
      navigate("/")
    }
  },[navigate])
  

  return (
    <Layout className="layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h1>
            <span className="lg-logo">DigiCom </span>
            <span className="sm-logo">DC</span>
            <sup>Admin</sup>
          </h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="dash-icon" />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <AiOutlineUser className="dash-icon" />,
              label: "Customers",
            },
            {
              key: "catalog",
              icon: <AiOutlineDatabase className="dash-icon" />,
              label: "Catalog",
              children: [
                {
                  key: "product",
                  icon: <GrProductHunt className="dash-icon" />,
                  label: "Product",
                },
                {
                  key: "product-list",
                  icon: <AiOutlineUnorderedList className="dash-icon" />,
                  label: "Product List",
                },
                {
                  key: "brand",
                  icon: <AiOutlineTag className="dash-icon" />,
                  label: "Brand",
                },
                {
                  key: "brand-list",
                  icon: <AiOutlineUnorderedList className="dash-icon" />,
                  label: "Brand List",
                },
                {
                  key: "category",
                  icon: <BiCategoryAlt className="dash-icon" />,
                  label: "Category",
                },
                {
                  key: "category-list",
                  icon: <AiOutlineUnorderedList className="dash-icon" />,
                  label: "Category List",
                },
                {
                  key: "color",
                  icon: <AiOutlineBgColors className="dash-icon" />,
                  label: "Color",
                },
                {
                  key: "color-list",
                  icon: <AiOutlineUnorderedList className="dash-icon" />,
                  label: "Color List",
                },
                {
                key: "coupon",
                icon: <RiCoupon2Fill className="dash-icon" />,
                label: "Coupons",
                },
                {
                key: "coupon-list",
                icon: <BiCategoryAlt className="dash-icon" />,
                label: "Coupons List",
                },
              ],
            },
            {
              key: "orders",
              icon: <AiOutlinePaperClip className="dash-icon" />,
              label: "Orders",
            },
            
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          className="db-header"
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="header-info-sec">
            <div className="user-info" onClick={() => setHide(!hide)}>
              <div className="user-name">
                <h2>Hamza Mukhtar</h2>
                <p>mukhtarhamza294@gmail.com</p>
              </div>
            </div>
          </div>
        </Header>
        <section className={`dropdown ${hide ? "hidden" : "show"}`}>
          <div className="signout">
            <button onClick={()=>{
              removeToken();
              window.location.reload()
            }}>Sign Out</button>
          </div>
        </section>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
