import React, { useState } from "react";
import Usuario from "../../Classes/User/user";
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Link, useNavigate } from "react-router-dom";
import planetImage from '../../assets/planet.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usuarioLogado } from "../../Classes/User/user";





const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const RealizarLogin = async () => {
    const loginSuccess = await usuarioLogado.LoginUsuario(email, password);

    if (loginSuccess) {
      navigate('/loading');
    } else {
      toast("Informações inválidas! 🚨");
    }
  };

    return (
        <div className="container-fluid d-flex login-page">
        <ToastContainer />
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
          <button type="button" className="btn btn-dark btnlogin">Create an account</button>
          </Link>
        </form>
      </div>
    )
}

export default Login;