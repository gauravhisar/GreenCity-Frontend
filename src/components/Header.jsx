import React from 'react'
import { NavLink} from "react-router-dom";
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
                    <NavLink to="/projects" className="nav-link" aria-current="page">Projects</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/customers" className="nav-link" >Customers</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/dealers" className="nav-link" >Dealers</NavLink>
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