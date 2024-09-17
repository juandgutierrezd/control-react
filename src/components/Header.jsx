import React, { useEffect } from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlDePresupuesto from './ControPresupuesto'

const Header = ({presupuesto,setPresupuesto,isValidPresupuesto,setIsValidPresupuesto,gastos,setGastos}) => {
  
  return (
    <header>
        <h1>Planificador de Gastos</h1>
        {isValidPresupuesto?
        <ControlDePresupuesto
            gastos={gastos}
            setGastos={setGastos}
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
            />
            
        :
        <NuevoPresupuesto
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
        />}
        
    </header>
  )
}

export default Header