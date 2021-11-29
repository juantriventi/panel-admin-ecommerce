import React, {useState} from 'react';
import DetalleUsuario from './DetalleUsuario';

const BuscarUsuario = () => {

    const [nombre, setNombre] = useState("")
    const [user, setUser] = useState(null)

    const handleOnChange = (event)=> {

        console.log(event.target.value);
        setNombre(event.target.value);
    }

    const getUserByName = async(name) => {
       
        const request = await fetch(`http://localhost:3030/api/users/name/${name}`);
        const response = await request.json();

        const {user} = response.data;
        setUser(user);
    }

     const handleOnSubmit = (event) => {
        event.preventDefault();
        getUserByName(nombre);
    }
 
    return (
        <div>
           <form onSubmit={handleOnSubmit}>
                <label htmlFor="name">id del usuario</label>
                <input 
                    type="text" 
                    name="name" 
                    id="name"
                    onChange={handleOnChange} 
                    value={nombre}
                    />

                <button type="submit">Buscar</button>   
            </form> 
            <section>
                { user === null? 
                    <p style={{color:'red'}}>No se encontro Usuario</p>
                    :
                    <div>
                        <h3>Detalle</h3>
                        <DetalleUsuario user={user}/>
                    </div>
                    
                }
            </section>
        </div>
    )
}

export default BuscarUsuario
