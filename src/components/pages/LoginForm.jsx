import { useState } from "react"
import mostrarAlerta from "../../helpers/utils/mostrarAlerta"
import clienteAxios from "../../helpers/config/axios"
import Spinner from "../Spinner"
import { useNavigate } from "react-router-dom"

const LoginForm = () => {
   const [usuario, setUsuario] = useState({
      email: '',
      password: ''
   })
   const [cargando, setCargando] = useState(false)
   const {email, password} = usuario
   const handleChange = e => {
      setUsuario({
         ...usuario,
         [e.target.name]: e.target.value
      })
   }
   const token = sessionStorage.getItem('token')
   if(token) {
      sessionStorage.removeItem('token')
   }
   let history = useNavigate()
   const handleSubmit = async e =>{
      e.preventDefault()
      setCargando(true)
      if(email.trim() === '' || password.trim() === ''){
         mostrarAlerta('Error', 'Todos los campos son obligatorios', 'error')
         setCargando(false)
         return
      }
      try {
         const respuesta = await clienteAxios.post('http://challenge-react.alkemy.org/', {email, password})
         sessionStorage.setItem('token', respuesta.data.token)
         setCargando(false)
         history('/menu')
      } catch (error) {
         const title = 'Hubo un error'
         const text = '¡Intenta nuevamente!'
         const icon = 'error'
         setCargando(false)
         mostrarAlerta(title, text, icon)
         return
      }
   }
   return (
      <form
         onSubmit={handleSubmit}
      >
         <div className="modal-body">
            <div className="mb-3">
               <label htmlFor="email" className="form-label">Email</label>
               <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Tu Email"
                  value={email}
                  className="form-control"
                  aria-describedby="emailHelp"
                  onChange={handleChange}
               />
            </div>
            <div className="mb-3">
               <label htmlFor="password" className="form-label">Contraseña</label>
               <input 
                  type="password" 
                  id="password" 
                  name="password"
                  placeholder="Tu Contraseña"
                  value={password}
                  className="form-control"
                  onChange={handleChange}
               />
            </div>
         </div>
         <div className="modal-footer">
            { cargando ? <Spinner mensaje='Procesando informacion'/> : <>
               <button type="submit" className="btn btn-primary">Enviar</button>
            </> }
         </div>
      </form>
   )
}

export default LoginForm