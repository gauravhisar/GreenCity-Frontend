import React from 'react'
import {
    Link
  } from "react-router-dom";
import PropTypes from 'prop-types'

export default function Header(props) {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#e3f2fd"}}>
            <div className="container-fluid">
            <span className="navbar-brand">{props.title}</span>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/" className="nav-link active" aria-current="page">Projects</Link>
                </li>
                <li className="nav-item">
                    <Link to="/dealers/" className="nav-link active" >Dealers</Link>
                </li>
                <li className="nav-item">
                    <Link to="/customers/" className="nav-link active" >Customers</Link>
                </li>
                {/* <li className="nav-item">
                    <a className="nav-link disabled"  tabindex="-1" aria-disabled="true">Disabled</a>
                </li> */}
                </ul>
            </div>
            </div>
        </nav>
        </div>
    )
}

Header.defaultProps = {
    title: "Rudra Estate"
}

Header.propTypes = {
    title: PropTypes.string
}