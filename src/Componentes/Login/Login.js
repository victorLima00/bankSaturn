import React, { useState, useEffect } from "react";
import Usuario from "../../Classes/User/user";
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Link, useNavigate } from "react-router-dom";
import planetImage from '../../assets/planet.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usuarioLogado } from "../../Classes/User/user";
import { getAuth, signInWithPopup } from "firebase/auth";
import {  GoogleOAuthProvider  }  from  '@react-oauth/google' ;
import GoogleLogin from "react-google-login";
import GoogleImage from '../../assets/google.png';
import LoginGoogle from "../LoginGoogle";





const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const auth = getAuth();
  const clientId = "999951030063-e0jfqenvt4fb0c821gg60mfrgvigd3pe.apps.googleusercontent.com"

  useEffect(() => {
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
          RealizarLogin();
        }
    };

    const formElement = document.getElementById('createUserForm'); // Substitua pelo ID do formulário
    if (formElement) {
        formElement.addEventListener('keydown', handleKeyDown);
    }

    return () => {
        if (formElement) {
            formElement.removeEventListener('keydown', handleKeyDown);
        }
    };
  }, []);

  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    if (storedEmail) {
        setEmail(storedEmail);
    }
  }, []);

  const RealizarLogin = async () => {
      const loginSuccess = await usuarioLogado.LoginUsuario(email, password);

      if (loginSuccess) {
          if (document.getElementById("rememberCheckbox").checked) {
              localStorage.setItem("rememberedEmail", email);
          } else {
              localStorage.removeItem("rememberedEmail");
          }
          navigate('/loading');
      } else {
          toast("Informações inválidas! 🚨");
      }
  };


  const RealizarLoginComGoogle = async (response) => {

    if (email) {
      const userExists = await usuarioLogado.VerificarUsuarioPorEmail(email);
  
      if (userExists) {
        const provider = new GoogleOAuthProvider();
        try {
          const result = await signInWithPopup(auth, provider);
          navigate("/loading")
        } catch (error) {
          console.error("Erro ao fazer login com o Google:", error);
        }
      } else {
        toast("Usuario não cadastrado! 🚨");
        navigate("/")
      }
    } else {
      console.error("Erro ao obter email do Google Sign-In:", response);
    }
  };
  

  const RealizarRegistroComGoogle = async () => {
    const auth = getAuth();
  
    const provider = new GoogleOAuthProvider();
  
    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;
  
      // Verificar se o e-mail já está cadastrado
      const userExists = await usuarioLogado.VerificarUsuarioPorEmail(email);
  
      if (userExists) {
        toast("E-mail already registered. Please log in instead.");
        navigate("/login");
      } else {
        navigate("/createuser", {
          state: {
            name: result.user.displayName,
            email: email,
          },
        });
      }
    } catch (error) {
      console.error("Erro ao fazer registro com o Google:", error);
      toast("Erro ao fazer registro com o Google 🚨");
    }
  };
  
  
  
  

    return (
      <GoogleOAuthProvider clientId={clientId}>
        <div className="container-fluid d-flex login-page">
        <ToastContainer />
        <a className="navbar-brand text-white p-0 mb-2" href="#">
            <span className="titulo">Bank</span>
            <img src={planetImage} alt="Planet" id="img"></img>
        </a>
        <form className="bg-light formedit" id="createUserForm">
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
              <input type="checkbox" className="form-check-input" id="rememberCheckbox"></input>
              <label className="form-check-label">Check me out</label>
          </div>
          <button type="button" className="btn btn-dark mr-2" id="btnlogin" onClick={RealizarLogin}>Submit</button>
          <Link to="/createuser">
          <button type="button" className="btn btn-dark btnlogin">Create an account</button>
          </Link>
          <div id="buttongoogle">
            <LoginGoogle />
          </div>
          <button type="button" className="google-button" id="btnlogin" onClick={RealizarRegistroComGoogle}>
            <img src={GoogleImage} alt="Google"></img>
            Register with Google
          </button>
        </form>
        
      </div>
      </GoogleOAuthProvider>
    )
}

export default Login;