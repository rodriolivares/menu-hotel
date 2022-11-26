import { Outlet } from "react-router-dom";
import Header from "../Header";
import Navegador from "../Navegador";
import useWindowDimensions from "../../helpers/hooks/useWindowDimension";
import Spinner from "../Spinner";
import usePlatos from "../../helpers/hooks/usePlatos";

const Layout = () => {
   const { cargando } = usePlatos()
   const [ isMobile ] = useWindowDimensions(767)
   return (
      <>
         { cargando ? 
            <Spinner mensaje={"Cargando"}/> 
         : <>
            <div className="modal-header header">
               { isMobile ? 
                  <Navegador />
               :  <Header titulo='Agrega 4 platos a tu menú: 2 veganos y 2 no veganos' /> }
            </div> 
            <Outlet />
         </> }
      </>
   )
}

export default Layout