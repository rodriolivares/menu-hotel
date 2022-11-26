import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import usePlatos from "../helpers/hooks/usePlatos";
import { formatearDinero } from "../helpers/utils/formatearDinero";
import Alerta from "./Alerta";

const Navegador = () => {
   const { alerta, menuInfo, pedirMenu } = usePlatos()
   const { precioTotal } = menuInfo
   const location = useLocation()
   const [ruta, setRuta] = useState(location.pathname)
   useEffect(() => {
     setRuta(location.pathname)
   }, [location.pathname])
   return (
      <nav className="navbar">
         { ruta === "/" && 
            <div className="d-flex flex-column justify-content-between">
               <div>
                  <Link 
                     className="btn btn-primary bg-white mb-1 fs-6"
                     to="/platos"
                  >Buscar</Link>
                  <button 
                     className="btn btn-primary bg-white mb-1 fs-6"
                     onClick={pedirMenu}
                  >Pedir este menú  { precioTotal ? <span>(${formatearDinero(+precioTotal)})</span> : null}</button>
               </div>
               {alerta ? (
                  <div className="mt-3">
                     <Alerta>{alerta}</Alerta>
                  </div>
               ) : null }
            </div> }
         { ruta === "/platos" && 
            <div>
               <Link 
                  className="btn btn-primary d-flex bg-white mb-1 fs-6"
                  to="/" 
               >Volver a mi menú</Link>
            </div> } 
      </nav>
   )
}

export default Navegador