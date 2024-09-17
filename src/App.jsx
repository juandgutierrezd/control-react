import { useState,useEffect } from 'react'
import {generarId} from'./helpers'
import ImagenNuevoGasto from './img/nuevo-gasto.svg'
import Header from './components/Header'
import Modal from './components/Modal';
import ListadoGastos from './components/ListadoGastos';
import Filtros from './components/Filtros';

function App() {
  //El State de presupuesto debe ir en App.jsx porque hay muchos componentes
  //Que lo requieren
  const [presupuesto,setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto'))??0
  );
  //State para comprobar que si es un presupuesto valido
  //cambie de pantalla
  const [isValidPresupuesto,setIsValidPresupuesto] = useState(false)
  //State para refrenciar la ventana modal
  const [modal,setModal]= useState(false)
  //State para habilitar edicion en modals
  const [animarModal,setAnimarModal] = useState(false)
  //State que guarda los objectos gastos
  const [gastos,setGastos] = useState(
    localStorage.getItem('gastos')?JSON.parse(localStorage.getItem('gastos')) : []
  ) 
  //State para editar gastos
  const [gastosEditar,setGastosEditar] = useState({})
  //State para filtrar 
  const [filtro,setFiltro] = useState('')
  const [gastosFiltrados,setGastosFiltrados] = useState([])
  //UseEffect para poder abir modal
  useEffect(()=>{
    if(Object.keys(gastosEditar).length > 0){
      setModal(true)
      setTimeout(()=>{
        setAnimarModal(true)
      },500)

  }},[gastosEditar])
//UseEfectt local storage
useEffect(()=>{
  localStorage.setItem('presupuesto',presupuesto ?? 0)
},[presupuesto])

useEffect(()=>{
  localStorage.setItem('gastos',JSON.stringify(gastos)??[])
},[gastos])

useEffect(()=>{
  const presupuestoLS = Number(localStorage.getItem('presupuesto'))??0
  if(presupuestoLS > 0){
    setIsValidPresupuesto(true)
  }
},[])

useEffect(()=>{
  //Muestra todos los filtros
  const gastosFiltrados = gastos.filter((gastosTemporal)=>{
    return gastosTemporal.categoriaGasto === filtro ? filtro :''
  })
  
  setGastosFiltrados(gastosFiltrados)
},[filtro])
 //Funcion para traer los datos de modal al App
  const guardarGasto = gastoTemporal => {
    if(gastoTemporal.id){
      //Actualizamos
      const gastosActualizados = gastos.map(gastoState  => gastoState.id === gastoTemporal.id
        ? gastoTemporal : gastoState )
        setGastos(gastosActualizados)
        setGastosEditar({})
    }else{
      //Nuevo Gasto
      gastoTemporal.id = generarId();
      gastoTemporal.fecha= Date.now();
      setGastos([...gastos,gastoTemporal])
    } 
    setAnimarModal(false)

    setTimeout(()=>{
        setModal(false)
      },500)
  }

  //Abre la ventana modal 
  const handleNuevoGasto= (e)=>{
    setModal(true)
    setGastosEditar({})
    setTimeout(()=>{
      setAnimarModal(true)
    },500)
  }
  //Eliminar Gasto
  const eliminarGasto= id =>{
    const gastosActualizados = gastos.filter(gastoTemporal => {gastoTemporal.id !== id ? gastos:null})
    setGastos(gastosActualizados)
  }
  return (
    <div className={modal ? 'fijar':''}>
      
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <>

        <main>
        <Filtros
        filtro={filtro}
        setFiltro={setFiltro}
        />
          <ListadoGastos
            gastos={gastos}
            setGastosEditar={setGastosEditar}
            eliminarGasto={eliminarGasto}
            filtro={filtro}
            gastosFiltrados={gastosFiltrados}
          />
        </main>
        <div className="nuevo-gasto">
            <img src={ImagenNuevoGasto}
             alt="imagen de nuevo gasto"
             onClick={handleNuevoGasto} 
            />
        </div>
        </>
      )}
      
      {modal && 
      (<Modal
        setModal={setModal}
        animarModal={animarModal}
        setAnimarModal={setAnimarModal}
        guardarGasto={guardarGasto}
        gastosEditar={gastosEditar}
        setGastosEditar={setGastosEditar}
      />)}
      </div> 
    
  )
}

export default App
