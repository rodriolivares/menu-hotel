import axios from "axios"
import { createContext, useEffect, useState } from "react"
import mostrarAlerta from "../helpers/utils/mostrarAlerta"

const PlatosContext = createContext()
const PlatosProvider = ({children}) => {
   const [platosBusqueda, setPlatosBusqueda] = useState([])
   const [platoSeleccionado, setPlatoSeleccionado] = useState('')
   const [platosMenu, setPlatosMenu] = useState([])
   const [veganosRestantes, setVeganosRestantes] = useState(2)
   const [noVeganosRestantes, setNoVeganosRestantes] = useState(2)
   const [menuInfo, setMenuInfo] = useState({
     healthScoteTotal: 0,
     tiempoMaxPreparacion: 0,
     precioTotal: 0
   })
   const [detallePlatoSeleccionado, setDetallePlatoSeleccionado] = useState({})
   const [cargando, setCargando] = useState(false)
   const [cargandoPlato, setCargandoPlato] = useState(false)
   const [modal, setModal] = useState(false);
   const [urlBusqueda, setUrlBusqueda] = useState('')
   const [alerta, setAlerta] = useState('');
 
   useEffect(() => {
      if(!platoSeleccionado) return
      if(platosMenu.some(p => p.id === platoSeleccionado)) {
         console.log('sf');
         setDetallePlatoSeleccionado(platosMenu.find(p => p.id === platoSeleccionado))
         return
      }
      const consultarPlato = async () => {
         setCargandoPlato(true)
         const url = `https://api.spoonacular.com/recipes/${platoSeleccionado}/information?apiKey=${process.env.REACT_APP_API_KEY}`
         const resultado = await axios.get(url)
         setDetallePlatoSeleccionado(resultado.data)
      }
      consultarPlato()
      setTimeout(() => {
         setCargandoPlato(false)
      }, 1000);
   }, [platoSeleccionado])

   useEffect(() => {
      setCargando(true)
      if(Object.keys(urlBusqueda).length === 0) {
         setCargando(false)
         return
      } 
      const consultarPlatos = async () => {
         const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}${urlBusqueda}`
         const resultado = await axios.get(url)
         setPlatosBusqueda(resultado.data.results)
      }
      consultarPlatos() 
      setCargando(false)
   }, [urlBusqueda])

   const ocultarModal = () => {
      setModal(false)
      setPlatoSeleccionado('')
    }
   
   const agregarAlMenu = plato => {
      if(platosMenu.some(p => p.id === plato.id)) {
         mostrarAlerta('Error', 'Ya seleccionaste este plato', 'error')
         return
      } else {
         if (plato.vegan) {
            if(veganosRestantes === 0) {
            mostrarAlerta('Error', 'Ya seleccionaste 2 platos veganos', 'error')
            return
            } else { setVeganosRestantes(veganosRestantes - 1) }
         } else {
            if(noVeganosRestantes === 0) {
            mostrarAlerta('Error', 'Ya seleccionaste 2 platos no veganos', 'error')
            return
            } else { setNoVeganosRestantes(noVeganosRestantes - 1) }
         }
         const healthScoteTotal= menuInfo.healthScoteTotal + plato.healthScore
         const tiempoMaxPreparacion= menuInfo.tiempoMaxPreparacion + plato.readyInMinutes
         const precioTotal= menuInfo.precioTotal + plato.pricePerServing
         const menuActualizado = {healthScoteTotal, tiempoMaxPreparacion, precioTotal}
         
         setPlatosMenu([...platosMenu, plato])
         setMenuInfo(menuActualizado)
      }
   }
   
   const eliminarPlato = id => {
      const platoEliminar = platosMenu.filter( plato => plato.id === id)
      if (platoEliminar[0].vegan) {
         setVeganosRestantes(veganosRestantes + 1)
      } else { 
         setNoVeganosRestantes(noVeganosRestantes + 1 )  
      }
      const healthScoteTotal= menuInfo.healthScoteTotal - platoEliminar[0].healthScore
      const tiempoMaxPreparacion= menuInfo.tiempoMaxPreparacion - platoEliminar[0].tiempo
      const precioTotal= menuInfo.precioTotal - platoEliminar[0].precio
      const menuInfoActualizada = {healthScoteTotal, tiempoMaxPreparacion, precioTotal}
      setMenuInfo(menuInfoActualizada)
      const menuActualizado = platosMenu.filter( plato => plato.id !== id)
      setPlatosMenu(menuActualizado)
   }

   const pedirMenu = () => {
      if(platosMenu.length !== 4) {
         setAlerta('Debes seleccionar 4 platos')
         setTimeout(() => {
            setAlerta('')
         }, 4000);
      } else { 
         setAlerta('')
         mostrarAlerta('¡Perfecto!', 'Estamos preparando su pedido', 'success')
      }
   }
   return (
      <PlatosContext.Provider
         value={{
            platosBusqueda,
            platoSeleccionado,
            platosMenu,
            veganosRestantes,
            noVeganosRestantes,
            menuInfo,
            detallePlatoSeleccionado,
            cargando,
            modal,
            urlBusqueda, 
            cargandoPlato,
            alerta,
            setPlatosBusqueda,
            setPlatoSeleccionado,
            setModal,
            setCargando,
            ocultarModal,
            agregarAlMenu,
            eliminarPlato,
            setUrlBusqueda,
            pedirMenu
         }}
      >
         {children}
      </PlatosContext.Provider>
   )
}
export {
   PlatosProvider
}
export default PlatosContext