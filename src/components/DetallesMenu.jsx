import React from 'react'
import usePlatos from "../helpers/hooks/usePlatos"
import { formatearDinero } from "../helpers/utils/formatearDinero"

const DetallesMenu = () => {
  const { menuInfo } = usePlatos()
  const { healthScoteTotal, tiempoMaxPreparacion, precioTotal } = menuInfo
  return (
    <div className="p-2 order-2 bd-highlight">
      <p className="col text-start"><span>Tiempo: </span>{tiempoMaxPreparacion}</p>
      <p className="col text-start"><span>Health Score: </span>{healthScoteTotal}</p>
      <p className="col text-start"><span>Precio total: </span>{`$${formatearDinero(+precioTotal)}`}</p>
    </div>
  )
}

export default DetallesMenu