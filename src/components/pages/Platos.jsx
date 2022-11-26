import usePlatos from "../../helpers/hooks/usePlatos";
import Buscador from "../Buscador"
import ListadoPlatos from "../ListadoPlatos"
import Spinner from "../Spinner";

const Platos = () => {
  const { cargando } = usePlatos()
  
  return (
    <>
      <div className="d-flex modal-header header rounded-top p-1">
        <Buscador />
      </div>
      <div>
        {cargando ? <Spinner mensaje={"Buscando Platos"}/> 
        : <ListadoPlatos isMenu={false} /> }
      </div>
    </>
  )
}

export default Platos