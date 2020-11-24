import React, { Component } from "react";
import { Link } from "react-router-dom";
// import cookie from 'react-cookies';
import { Redirect } from "react-router";
import axios from "axios";
import { backendServer } from "../webconfig";
import "../assets/homefindericon.png";

//create the Navbar Component
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      selectedCategory: "All",
      addresses: [],
      cards: [],
      cart: [],
      name: null,
      searchValue: "",
      redirect: false,
      logoutRedirect: false,
    };
    this.handleLogout = this.handleLogout.bind(this);
  }
  //handle logout to destroy the cookie
  handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("status");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.clear();
    this.setState({
      logoutRedirect: true,
    });
    window.location.href = "/";
  };

  componeneDidUpdate() {
    if (this.stat.redirect) {
      this.setState({
        redirect: false,
      });
    }
  }
  categoriesChangeHandler = (e) => {
    this.setState({
      selectedCategory: e.target.value,
    });
  };

  searchChangeHandler = (e) => {
    this.setState({
      searchValue: e.target.value,
      redirect: false,
    });
  };

  submitSearch = () => {
    if (this.state.searchValue) {
      this.setState({
        redirect: true,
      });
    }
  };

  render() {
    let navLinks = null;
    let navLinkBottom = null;
    if (localStorage.getItem("role") === "admin") {
      navLinks = (
        <ul className="navbar-nav mr-auto">
          <li class="nav-item">
            <Link class="nav-link" to="/search">
              Search
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/" onClick={this.handleLogout}>
              Logout
            </Link>
          </li>
          {/* <li><Link to="/carthome"><span><i className="icon-shopping-cart icon-2x"></i></span><span className="badge badge-light">{this.state.cart.length}</span></Link></li> */}
          <li class="nav-item">
            <Link class="nav-link" to="/admin-dashboard">
              <span>
                <i className="icon-shopping-cart icon-2x">Dashboard</i>
              </span>
            </Link>
          </li>
        </ul>
      );
    } else {
      navLinks = (
        <ul className="navbar-nav mr-auto">
          <li class="nav-item">
            <Link class="nav-link" to="/search">
              Dashboard
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/rentalListings">
              Rent
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/homelistings">
              Buy
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/sell">
              Sell
            </Link>
          </li>
          {/* <li class="nav-item">
            <Link class="nav-link" to="/" onClick={this.handleLogout}>
              Logout
            </Link>
          </li> */}
        </ul>
      );
    }

    let redirectVar = null;
    let categoriesDropDownOptions = this.state.categories.map((c) => {
      return (
        <li className="li-dropdown" key={c.category}>
          <button
            className="btn btn-link"
            onClick={this.categoriesChangeHandler}
            value={c.category}
          >
            {" "}
            {c.category}{" "}
          </button>
        </li>
      );
    });
    if (this.state.redirect && localStorage.getItem("type") === "Customer") {
      let link =
        "/product-search?name=" +
        this.state.searchValue +
        "&category=" +
        this.state.selectedCategory;
      redirectVar = <Redirect to={link} />;
    } else if (
      this.state.redirect &&
      localStorage.getItem("type") === "Seller"
    ) {
      console.log("he is a seller");
      let link =
        "/sellerinventory?name=" +
        this.state.searchValue +
        "&category=" +
        this.state.selectedCategory +
        "&seller_id=" +
        localStorage.getItem("id");
      redirectVar = <Redirect to={link} />;
    }

    let logoutRedirect = null;
    if (this.state.logoutRedirect) {
      logoutRedirect = <Redirect to="/" />;
    }

    return (
      <div style={{ color: "black" }}>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <Link class="navbar-brand" to="/search">
            Home Finder
          </Link>
          {/* <a class="navbar-brand" href="#">
            <img src="http://placehold.it/150x50?text=Logo" alt="" />
          </a> */}
          {navLinks}
          {/* <li class="nav-item"> */}
          <Link class="nav-link" to="/" onClick={this.handleLogout}>
            Logout
          </Link>
        </nav>
        <nav class="navbar navbar-inverse">
          <div class="container-fluid">
            {/* <div class="navbar-header">
              <img 	style={{image:("../../assets/house2.jpg")}}/>
            </div> */}
            {/* <form class="navbar-form navbar-left" action="/action_page.php">
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Search"/>
            </div>
            <button type="submit" class="btn btn-default">Submit</button>
            </form> */}
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;