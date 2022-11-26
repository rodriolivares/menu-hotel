import useWindowDimensions from "../../helpers/hooks/useWindowDimension";
import ListadoPlatos from "../ListadoPlatos";
import DetallesMenu from "../DetallesMenu";
import Platos from "./Platos"
import usePlatos from "../../helpers/hooks/usePlatos";
import { formatearDinero } from "../../helpers/utils/formatearDinero";
import Alerta from "../Alerta";

const Menu = () => {
  const { platosMenu, menuInfo, pedirMenu, alerta } = usePlatos()
  const { precioTotal } = menuInfo
  const [ isMobile ] = useWindowDimensions(767)

  return (
    <div className="container-lg">
      <div className="row mt-3">
        <div className="shadow rounded-3 mx-2 col bg-white h-25 d-inline-block">
          { !isMobile ? 
            <div className="mb-2 border-primary border-bottom ">
              <h2 className="fs-2 mt-2">Tu menú</h2>
            </div>
          : null }
          <div className="d-flex flex-column bd-highlight mb-3">
            { platosMenu.length ? <>
              <ListadoPlatos isMenu={true} />
              <DetallesMenu />
              <div className={`${isMobile ? "order-0" : "order-3"}  bd-highlight`}>
                <div className={`d-flex flex-column justify-content-${isMobile ? "between" : "end"}`}>
                  { !isMobile && ( <>
                    <button 
                      className="btn btn-primary mb-2"
                      onClick={pedirMenu}
                    >Pedir este menú  { precioTotal ? <span>(${formatearDinero(+precioTotal)})</span> : null } </button>
                    { alerta && (
                      <Alerta>{alerta}</Alerta>
                    ) }
                  </> ) } 
                </div>
              </div>
            </> : <p className="my-2">Aun no has agregado ningun plato. Comienza buscando uno.</p> }
          </div>
        </div>
        { !isMobile ? 
          <div className="shadow rounded-3 mx-2 col bg-white mb-3 p-0">
            <Platos /> 
          </div>
        : null }
      </div>
    </div>
  )
}

export default Menu