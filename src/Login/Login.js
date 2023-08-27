import React, { useState } from "react";
import Usuario from "../User/user";
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Link, useNavigate } from "react-router-dom";
import planetImage from '../assets/planet.png';


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    let navigate = useNavigate();

    const RealizarLogin = () => {
        const realizarlogin = new Usuario('',email,'', password);
        realizarlogin.LoginUsuario().then(retorno => {
            alert(retorno);
        });
    };

    return (
        <div className="container-fluid d-flex login-page">
        <a className="navbar-brand text-white p-0 mb-2" href="#">
            <span className="titulo">Bank</span>
            <img src={planetImage} alt="Planet" id="img"></img>
        </a>
        <form className="bg-light formedit">
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" 
            className="form-control p-1" 
            id="exampleInputEmail1" 
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ></input>
            <div id="emailHelp" className="form-text">Type your e-mail.</div>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control p-1" id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ></input>
            <span id="passwordHelpInline" className="form-text">
              Must be 8-20 characters long.
            </span>
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
            <label className="form-check-label">Check me out</label>
          </div>
          <button type="button" className="btn btn-dark mr-2" id="btnlogin" onClick={RealizarLogin}>Submit</button>
          <Link to="/createuser">
          <button type="button" className="btn btn-dark">Create an account</button>
          </Link>
        </form>
      </div>
    )
}

export default Login;