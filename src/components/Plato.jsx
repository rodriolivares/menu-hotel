import usePlatos from "../helpers/hooks/usePlatos";

const Plato = ({ plato }) => {
  const { setPlatoSeleccionado, setModal, setCargando } = usePlatos()
  const { id, image, title } = plato
  const handleVerDetalles = () => {
    setCargando(true)
    setModal(true);
    setPlatoSeleccionado(id)
    setCargando(false)
  }
  return (
    <>
    <div className="p-2 m-2 border-primary border d-flex flex-nowrap">
      <div className="me-1 p-0">
        <img src={image} alt="Berry Banana Breakfast Smoothie" width={120} />
      </div>
      <div className="flex-grow-1 d-flex justify-content-between">
        <div className="mx-1 w-100">
          <p className="m-0 py-1 fs-6 text">{title}</p>
        </div>
        <div className="flex-shrink-1">
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-primary mb-1 fs-6"
              onClick={handleVerDetalles}
              >Detalles</button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
export default Plato