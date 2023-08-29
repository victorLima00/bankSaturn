import React, { useEffect, useState } from "react";
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import FooterNavBar from "../FooterNavBar/FooterNavBar";
import Usuario, { usuarioLogado } from "../../Classes/User/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import Conta from "../../Classes/Contas/Contas"
import { faStore, faListUl } from "@fortawesome/free-solid-svg-icons";
import { faPix } from "@fortawesome/free-brands-svg-icons";
import visaImage from '../../assets/visa.png';
import planetImage from '../../assets/planet.png';
import ChipImage from '../../assets/chip.png';
import WifiImage from '../../assets/wifi.png';



const Home = () => {
    const [userInfo, setUserInfo] = useState(null);
     let cpf = ''
     var saldocorreto = ''

    useEffect(() => {
        async function fetchUserInfo() {
            const userData = await usuarioLogado.getUsuario();
            setUserInfo(userData);
        }

        fetchUserInfo();
    }, []);

    const Versaldo = async () => {
        const eyesim = document.getElementById('versaldo');
        const eyenao = document.getElementById('naoversaldo');
        const textsaldo = document.getElementById('saldo');
        const divblur = document.getElementById('backblur')

        const usercpf = await usuarioLogado.getUsuario();
        cpf = usercpf.cpf

        const saldo = new Conta()
        const saldoatual = saldo.getConta(cpf);

        saldoatual.then((resultado => {
            saldocorreto = resultado.saldo
        }))
        
        if (eyesim.classList.contains('disp')) {
            eyesim.classList.remove('disp');
            eyenao.classList.add('disp');
            textsaldo.textContent = 'R$' + saldocorreto
        } else {
            eyesim.classList.add('disp');
            eyenao.classList.remove('disp');
            textsaldo.textContent = ''
            testDeposita(cpf);
        }
    };

    const testDeposita = async (cpf) => {
        const saldo = new Conta();
        const saldoatualPromise = saldo.getConta(cpf);
    
        saldoatualPromise.then((resultado) => {
            if (resultado) {
                saldocorreto = resultado.saldo;
            } else {
                console.log("Conta não encontrada.");
            }
        });
    
        const cpfDoUsuario = cpf; // Substitua pelo CPF real
        const valorDoDeposito = 100; // Substitua pelo valor desejado
    
        saldo.depositaConta(cpfDoUsuario, valorDoDeposito)
        .then(() => {
            console.log('Depósito realizado com sucesso!');
        })
        .catch((error) => {
            console.error('Erro ao realizar o depósito:', error);
        });
    }
    

    return (
        <div className="container-fluid d-flex" id="home">
            <div className="row">
                <div className="card text-bg-dark mb-3 mt-4" id="card">
                    <div className="card-header">
                        <span>
                            Bem-vindo {userInfo ? userInfo.name : "Usuário não logado"}!
                        </span>
                        <span id="saldo"></span>
                        <div className="disp" id="versaldo" onClick={Versaldo}>
                        <FontAwesomeIcon icon={faEye} />
                        </div>
                        <div className="" id="naoversaldo" onClick={Versaldo}>
                            <FontAwesomeIcon icon={faEyeSlash} />
                        </div>
                    </div>
                    <div className="card-body d-flex">
                        <div>
                        </div>
                        <div className="card-geral">
                            <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <div className="top">
                                            <img src={planetImage} alt="Planet" id="cardimglogo"></img>
                                            <h6 className="text-white titlecard">BankSaturn</h6>
                                        </div>
                                        <div className="chipdiv">
                                            <div id="wifiimgdiv">
                                            <img src={ChipImage} alt="Planet" id="cardimgchip"></img>
                                            </div>
                                            <div id="wifiimgdiv">
                                            <img src={WifiImage} alt="Planet" id="wifiimg"></img>
                                            </div>
                                        </div>
                                        <div className="card-text texto-3d">
                                            7070 7070 7070 7070
                                        </div>
                                        <div className="mid">
                                            <div>
                                                <span className="coporcardsince">Since</span>
                                                <span id="datasince">00/00</span>
                                            </div>
                                            <div>
                                                <span className="coporcard">Valid</span>
                                                <span id="datavalid">00/00</span>
                                            </div>
                                        </div>
                                        <div className="end">
                                            <span className="text-white usercard">
                                                {userInfo ? userInfo.name : "Usuário não logado"}
                                            </span>
                                            <div className="ml-auto" id="imgcard">
                                                <img src={visaImage} alt="Card" id="imgcard"></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flip-card-back">
                                    <div class="strip"></div>
                                    <div class="mstrip"></div>
                                    <div class="sstrip">
                                    <p class="code">***</p>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <FooterNavBar />
        </div>
    );
}

export default Home;