import React, { useState, useEffect } from "react";
import './Loading.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Link, useNavigate } from "react-router-dom";

const CreateUser = () => {
    const textSequence = ["Configurações iniciais...", "Validando usuário...", "Iniciando informações...", "Finalizando...", ""];
    const [textIndex, setTextIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prevIndex) => (prevIndex + 1) % textSequence.length);
        }, 2000);

        if (textIndex === 4) {
            navigate('/home');
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [textIndex, navigate]);

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center loading-page">
                <div className="text-center titulo">
                    <div className="glitch-container">
                        <div data-glitch={textSequence[textIndex]} className="glitch"></div>
                    </div>
                </div>
        </div>
    );
    
}

export default CreateUser;