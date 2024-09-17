import {useState} from 'react'
import Mensaje from './Mensaje'

const NuevoPresupuesto = ({presupuesto,setPresupuesto,setIsValidPresupuesto}) => {

    //Un State para cuando sea valido o no el presupuesto mostrar en pantalla
    const [mensaje,setMensaje] = useState('')
    //Hacemos un handleSubmit para antes de presionar Añadir
    const handleSubmit=(e)=>{
        //Prevenir el evento
        e.preventDefault();

        //Validamos Presupuesto para que no sea una cadena de texto
        //o sea un numero negativo
        if(!presupuesto || presupuesto<0){
            setMensaje('No es un presupuesto valido')
        //rompemos el ciclo para que no se ejecute otra vez     
            return
        }
        setMensaje('')
        
        //Comprobamos que el presupuesto es valido
        setIsValidPresupuesto(true)
    }

  return (
    <div className="contenedor-presuuesto contenedor sombra">
        <form action=""onSubmit={handleSubmit} className="formulario">
            <div className="campo">
                <label htmlFor="">Definir Presupuesto</label>
                <input
                    className="nuevo-presupuesto"
                    type="number"
                    placeholder='Añade tu Presupuesto'
                    onChange={e=>setPresupuesto(Number(e.target.value))}
                />
            </div>
            <input type="submit" value='Añadir'/>
            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        </form>  
    </div>
  )
}

export default NuevoPresupuesto