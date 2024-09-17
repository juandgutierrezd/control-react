import {useState,useEffect} from 'react'
import Mensaje from './Mensaje';
import CerrarBtn from '../img/cerrar.svg'

const Modal = ({setModal,animarModal,setAnimarModal,guardarGasto,gastosEditar,setGastosEditar}) => {
    //ESTE COMPONENTE TIENE STATE POR QUE VA A CONTENER UN FORMULARIO Y NECESITAMOS LOS DATOS
    //Agreando los states para guardar los valores del formuario en 
    //La ventana Modal
    const [nombreGasto,setNombreGasto]=useState('');
    const [cantidadGasto,setCantidadGasto] = useState('');
    const [categoriaGasto,setCategoriaGasto] = useState('');
    //  State para ubica el gasto a editar
    const [id,setId] = useState('');
    //State para mostrar mensaje de formulari incompleto
    const [mensaje,setMensaje]=useState('')
    const [fecha,setFecha] = useState('')
    //useEffect para colocar los valores de editar
    useEffect(()=>{
        if(Object.keys(gastosEditar).length > 0){
            setNombreGasto(gastosEditar.nombreGasto)
            setCantidadGasto(gastosEditar.cantidadGasto)
            setCategoriaGasto(gastosEditar.categoriaGasto)
            setId(gastosEditar.id)
            setFecha(gastosEditar.fecha)
      }
    },[])
    //funcion antes de enviar el formulario
    const handleSubmit =(e)=>{
        e.preventDefault();
        //Verificamos si el formulario es valido
        if([nombreGasto,cantidadGasto,categoriaGasto].includes('')){
            setMensaje('Todos los campos son Olbigatorios')
        //Eliminamos el mensaje de error poco tiempo despues
        setTimeout(()=>{setMensaje('')},3000)           
            return;
        }
        const objectoGasto={
            nombreGasto,
            cantidadGasto,
            categoriaGasto,
            id,
            fecha
        }
        guardarGasto(objectoGasto)

        //Reiniciar gasto despues de llenar el formulario
        setNombreGasto('')
        setCantidadGasto('')
        setCategoriaGasto('')
    }
    //Funcion para ocultar modals
    const ocultarModal =()=>{
        setAnimarModal(false)
        setGastosEditar({})
        setTimeout(()=>{
            setModal(false)
          },500)
        
    }
  return (
    
        <div className='modal'>
            <div className="cerrar-modal">
                <img 
                src={CerrarBtn} 
                alt="imagen de x" 
                onClick={ocultarModal}
                />
            </div>
            
            <form action="/google.com" onSubmit={handleSubmit} className={`formulario ${animarModal ? "animar":"cerrar"}`}>
                <legend>{gastosEditar.nombreGasto ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
                <div className='campo'>
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input 
                     id="nombre"
                     type="text"
                     placeholder='Añade nombre del gasto' 
                     value={nombreGasto}
                     onChange={(e)=> setNombreGasto(e.target.value)}
                     />
                </div>
                <div className='campo'>
                    <label htmlFor="cantidad">Cantidad del gasto</label>
                    <input 
                     id="cantidad"
                     type="number"
                     placeholder='Añade Cantidad del Gasto' 
                     value={cantidadGasto}
                     onChange={(e)=> setCantidadGasto(Number(e.target.value))}/>
                </div>
                <div className='campo'>
                    <label htmlFor="categorias">Categoria</label>
                    <select name="" id="categorias"
                     value={categoriaGasto}
                     onChange={(e)=> setCategoriaGasto(e.target.value)}>
                       <option value="">--Selecccione--</option>
                       <option value="ahorro">Ahorro</option>
                       <option value="comida">Comida</option>
                       <option value="casa">Casa</option>
                       <option value="gastos">Gastos</option>
                       <option value="ocio">Ocio</option>
                       <option value="salud">Salud</option>
                       <option value="suscripciones">Susccripciones</option>
                    </select>
                </div>
                <input
                    type="submit"
                    value={gastosEditar.nombreGasto ? 'Guardar Cambio' : 'Añadir Gasto'}
                    
                />
            </form>
        </div>
    
  )
}

export default Modal