import React from "react";
import './FooterNavBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import planetImage from '../../assets/planet.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faStore, faListUl } from "@fortawesome/free-solid-svg-icons";
import { faPix } from "@fortawesome/free-brands-svg-icons";

const FooterNavBar = () => {
    
    return (
        <nav className="footer-navbar bg-dark">
            <div className="container-fluid d-flex align-items-center justify-content-between text-white">
                <div className="other">
                    <FontAwesomeIcon icon={faUser} className="icon"/>
                    <p className="tituloimg">USER</p>
                </div>
                <div className="other">
                    <FontAwesomeIcon icon={faStore} />
                    <p className="tituloimg">STORE</p>
                </div>
                <div className="home">
                <img src={planetImage} alt="Planet" id="img"></img>
                <p className="tituloimg">HOME</p>
                </div>
                <div className="other">
                    <FontAwesomeIcon icon={faPix} />
                    <p className="tituloimg">PIX</p></div>
                <div className="other">
                    <FontAwesomeIcon icon={faListUl} />
                    <p className="tituloimg">MORE</p></div>
            </div>
        </nav>
    );
    
}

export default FooterNavBar;