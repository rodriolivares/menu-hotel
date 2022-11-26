import usePlatos from "../helpers/hooks/usePlatos"
import Plato from "./Plato"
import PlatoMenu from "./PlatoMenu"

const ListadoPlatos = ({ isMenu }) => {
   const { platosMenu, platosBusqueda } = usePlatos()
   return (
      <div className="mb-2 order-1 bd-highlight">
         {isMenu ? ( platosMenu.map( platoM => ( 
            <PlatoMenu 
               key={platoM.id}
               platoM={platoM}
            />
         ))) : ( platosBusqueda.map( plato => ( 
            <Plato 
               key={plato.id}
               plato={plato}
            />
         )))}
      </div>
   )
}
export default ListadoPlatos