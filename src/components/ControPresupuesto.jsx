import {useState,useEffect} from 'react'
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const ControlDePresupuesto = ({presupuesto,setPresupuesto,gastos,setGastos,setIsValidPresupuesto}) => {
 
  //Creamos dos States para llevar el control de disponible y gastado
  const [disponible,setDisponible]=useState(0)
  const [gastado,setGastado] = useState(0)
  const [porcetaje,setPorcentaje] = useState(0)
  //useEffect para que los gastos se actualizen
    useEffect(()=>{
      //el metodo .reduce() toma dos valores uno acumulativo y el oto la variableTemporal
      const totalGastado = gastos.reduce((total,gastoTemporal)=>{
        return gastoTemporal.cantidadGasto+total
      },0)
      //console.log(totalGastado)
      setGastado(totalGastado)
      //Disponible
      const totalDisponible = presupuesto - totalGastado;
      setDisponible(totalDisponible)
      //Calcular el porcentajegastado
      const nuevoPorcentaje = (((presupuesto - totalDisponible)/presupuesto)*100).toFixed(2);
      setTimeout(()=>
      setPorcentaje(nuevoPorcentaje),400)
    },[gastos])
  //Funcion para formatear la cantidad y no modificar la variable original
const formatearCantidad = (cantidadTemporal) =>{
  return cantidadTemporal.toLocaleString('en-US',{
    style:'currency',
    currency:'USD'
  })
}

//Handle Reset
const handleResetApp=(e)=>{
  const resultado = confirm('Deseas Resetear?')
  if(resultado){
    setGastos([])
    setPresupuesto(0)
    setIsValidPresupuesto(false)
  }
}
  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div><CircularProgressbar
              styles={buildStyles({
                //Estilos a aplicar
                pathColor: porcetaje>100?'#DC2626':'#3B82F6',
                trailColor:'#F5F5F5',
                textColor: porcetaje>100?'#DC2626':'#3B82F6'
              })}
              value={porcetaje}
              text={`${porcetaje}% Gastado`}
              />
        </div>
        
        <div className="contenido-presupuesto">
          <button
          className='reset-app'
          type='button'
          onClick={handleResetApp}
          >
            Resetear App
          </button>
            <p>
                <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? 'negativo': ''}`}>
                <span>Disponible: </span>{formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado: </span>{formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlDePresupuesto