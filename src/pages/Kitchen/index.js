import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import logo from './logo.png';
import naBrasa from './naBrasa.gif';
import './Kitchen.css';

function Kitchen(){

    const token  = localStorage.getItem("token");
    const [pedidos, setPedidos] = useState('');
    

        const history = useHistory()
        const routerBack = () => {
            history.push('/')
        }
    
        const logout = () => {
            localStorage.getItem("token");
            localStorage.clear()
            routerBack()
        }
       

    useEffect (() => {
        fetch('https://lab-api-bq.herokuapp.com/orders/', {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization':`${token}`
            },
        })
            .then((response) => response.json()).then((json) => {
                const pendente = json.filter(item => item.status === 'pending')
                
                setPedidos(pendente)
                
                console.log(json)
                
            })
    }, []);

    
    

        const cozinhar = (event) => {
        const token = localStorage.getItem("token");


        const parent = event.target.parentNode.parentNode.parentNode;
        const idMudar = parent.getAttribute('id'); 
        localStorage.setItem("id", idMudar);
        const idPedido = Number (localStorage.getItem('id'))
        console.log(idPedido);

        
                fetch(`https://lab-api-bq.herokuapp.com/orders/${idPedido}`, {

                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization':`${token}`,
                        'Access-Control-Allow-Origin': '*', 
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT'

                    },
                    body:JSON.stringify({
                        "status": "pronto"
                    })
                })
                    .then((response) => response.json()).then((json) => {
                        const filtroPedido = pedidos.filter (item => item.id !== idPedido )
                        setPedidos(filtroPedido) 
                        console.log(pedidos)
                        console.log(idPedido)
                        console.log(filtroPedido)
                        
                    })
                    
    
        }
    return(

        <div className="App-cozinha">

        <p className="gif"> <img src={naBrasa}/></p>

            <div className="cabecalho-kitchen">
        <p className="img-logo"> <img src={logo}/></p>
             <button className="btnExit" onClick={logout}>{<ExitToAppIcon style={{ fontSize: 50 }}/>}</button>
       </div>

        <h1 className="title">Pedidos em Preparo</h1>
            <div className="place-orders">
                {pedidos && pedidos.map((item) => (
                        
                        <div id={item.id}
                            
                         key={Math.random()} className="container-requests">
                        <div className="requests-name"><p key={Math.random()} className="divName">Nome do Cliente: {item.client_name}</p></div>
                        <div className="requests-Id"><p key={Math.random()} className="divId">Id: {item.id}</p></div>
                        <div className="requests-table"><p key={Math.random()} className="divTable">Mesa: {item.table}</p></div>
                        <div className="requests-status"><p key={Math.random()} className="divStatus">Status: {item.status}</p></div>
                        <div className="requests-products"><div key={Math.random()} className="divProducts">Produtos: {item.Products.map((product) => 
                        <p> {product.name} </p>)}
                       <button className="btn-alterar-Pedido" onClick={cozinhar}>Pedido Pronto!</button>
                        </div>
                                </div>
                        </div>
                    ))
                }
            </div>

           

        </div>
    );
};

        
export default Kitchen;