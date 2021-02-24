import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { Link } from '@material-ui/core'
import './login.css';
import logo from './logo.png';

function Login() {

    const history = useHistory()

    const routerBack = () => {
        history.push('/')
    }

    const routerHall = () => {
        history.push('/Hall')
    }
    const routerKitchen = () => {
        history.push('/Kitchen')
    }


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    function btnLogin(event) {
        event.preventDefault();
        fetch('https://lab-api-bq.herokuapp.com/auth', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `email=${email}&password=${password}`
        })
            .then((response) => response.json()).then((json) => {
                console.log(json);
                const token = json.token
                const id = json.id

                localStorage.setItem("token", token)
                localStorage.setItem("id", id)

                if (json.id !== null) {
                    routerBack();
                } if (json.role === "hall") {
                    routerHall();
                } if (json.role === "cook") {
                    routerKitchen();
                }

            })


    };

    return (
        <div className="App">

            <p className="login"> <img src={logo} /></p>
            <form className="loginForm">

                <input type="text" placeholder="E-mail*" value={email} id="emailInput" onChange={(event) => setEmail(event.target.value)} />

                <input type="password" placeholder="Senha*" value={password} id="loginInput" onChange={(event) => setPassword(event.target.value)} />

                <button className="loginBtn" onClick={btnLogin}>Acessar</button>

                <p className="novo"> Novo por aqui? <Link href="/register">Registre-se</Link></p>

                <footer> © Desenvolvido por <a href="https://github.com/CamilaKikuchi" target="_blank">Camila Kikuchi</a>, <a href="https://github.com/giomadeira" target="_blank">Giovana Madeira</a>, <a href="https://github.com/julianaads" target="_blank">Juliana Souza</a></footer>

            </form>
        </div>
    )

};


export default Login;