import { Outlet } from "react-router-dom"
import Header from "../Header"

const Login = () => {

   return (
      <div className="modal-dialog">
         <div className='modal-md modal-content'>
            <div className="modal-header header">
               <Header 
                  titulo='¡Inicia sesión para pedir tu menú!'
               />
            </div>
            <Outlet />
         </div>
      </div>
   )
}
export default Login