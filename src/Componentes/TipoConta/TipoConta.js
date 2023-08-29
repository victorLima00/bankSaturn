import React, { useState } from "react";
import Contas from "../../Classes/Contas/Contas"
import ContaCorrente from "../../Classes/Contas/ContaCorrente"
import ContaPoupanca from "../../Classes/Contas/ContaPoupanca"
import './TipoConta.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Link, useNavigate } from "react-router-dom";
import Usuario, { usuarioLogado } from "../../Classes/User/user";

const TipoConta = () => {
    var [cpf, setCpf] = useState("")
    let navigate = useNavigate();


  
    const contacorrente = async () => {

        const usercpf = await usuarioLogado.getUsuario();
        cpf = usercpf.cpf
        console.log(cpf)

        const conta = new Contas();
        const contaData = await conta.getConta(cpf);
        setCpf(contaData.cpf);
    
        const contacorrente = new ContaCorrente();
        const retorno = await contacorrente.setContaCorrente(cpf);
        navigate('/loading')
    }
    
    const contapoupanca = async () => {
        const conta = new Contas();
        const contaData = await conta.getConta(cpf);
        setCpf(contaData.cpf);
    
        const contapoupanca = new ContaPoupanca();
        const retorno = await contapoupanca.setContaPoupanca(cpf);
        navigate('/loading')
    }
    

    return (
        <div className="container-fluid d-flex login-page">
            <div className="row">
                <div className="col-6 card edit" onClick={contacorrente}>
                    <div className="text-center">
                    <h3>Conta Corrente</h3>
                    <span>Benefícios de uma Conta Corrente</span><br /><br />
                    </div>
                    <p>* Acesso a Serviços Bancários Completo<br />
                    * Pagamento de Contas<br />
                    * Transferências<br />
                    * Cheques<br />
                    * Acesso a Cartões de Débito e Crédito<br /></p>
                </div>
                <div className="col-6 card" onClick={contapoupanca}>
                    <div className="text-center">
                    <h3>Conta Poupança</h3>
                    <span>Benefícios de uma Conta Poupança</span><br /><br />
                    </div>
                    <p>* Baixas Taxas ou Taxas Isentas<br />
                    * Economia Disciplinada<br />
                    * Acesso Limitado<br />
                    * Reserva de Emergência<br />
                    * Metas de Poupança<br />
                    * Taxas de Juros</p>
                </div>
            </div>
        </div>
    )
}

export default TipoConta;