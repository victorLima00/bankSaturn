import React, { useState } from "react";
import Usuario from "../../Classes/User/user";
import Contas from "../../Classes/Contas/Contas"
import './CreateUser.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Link, useNavigate } from "react-router-dom";
import planetImage from '../../assets/planet.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreateUser = () => {
    const [user, setUser] = useState("")
    const [email, setEmail] = useState("")
    const [cpf, setCpf] = useState("")
    const [password, setPassword] = useState("")
    let navigate = useNavigate();

    const CreateAccount = async () => {
      const createaccount = new Usuario();
      const retorno = await createaccount.CreateUsuario(user, email, cpf, password);
      console.log(retorno)
      if (retorno.includes('Usuário criado com sucesso!')){
        const createcontas = new Contas('','0001','0', user, email, cpf, password);
        const retornar = await createcontas.setConta(cpf);
        navigate('/tipoconta')
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
            <label className="form-label">Name User</label>
            <input type="text" 
            className="form-control p-1" 
            id="exampleInputEmail1" 
            aria-describedby="emailHelp"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            ></input>
          </div>
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
            <label className="form-label">CPF</label>
            <input type="text" 
            className="form-control p-1" 
            id="exampleInputEmail1" 
            aria-describedby="emailHelp"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            ></input>
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
          <button type="button" className="btn btn-dark" id="btncreate" onClick={CreateAccount}>Create</button>
          <Link to="/">
          <button type="button" className="btn btn-dark">Return</button>
          </Link>
        </form>
      </div>
    )
}

export default CreateUser;