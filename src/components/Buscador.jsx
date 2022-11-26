import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import usePlatos from "../helpers/hooks/usePlatos"
import Alerta from "./Alerta"

const Buscador = () => {
   const { urlBusqueda, setUrlBusqueda } = usePlatos()

   const nuevaBusquedaSchema = Yup.object().shape({
      nombrePlato: Yup.string()
                 .min(3, 'El Nombre es muy corto')
                 .required('El nombre del Plato es Obligatorio'),
      dieta: '',
      tipoPlato: '', 
      region: ''
   })
   const handleSubmit = async (valores) => {
      let url = `&query=${valores.nombrePlato}`
      if(valores.dieta.length) {url = `${url}&diet=${valores.dieta}`}
      if(valores.tipoPlato.length) {url = `${url}&type=${valores.tipoPlato}`}
      if(valores.region.length) {url = `${url}&cuisine=${valores.region}`}
      setUrlBusqueda(url)
   }

   return (
      <Formik
         initialValues={{
            nombrePlato: urlBusqueda?.nombrePlato ?? "",
            dieta: urlBusqueda?.dieta ?? "",
            tipoPlato: urlBusqueda?.tipoPlato ?? "",
            region: urlBusqueda?.region ?? "",
         }}
         enableReinitialize={true}
         onSubmit={ async (values, {resetForm}) => {
            await handleSubmit(values)
            resetForm()
         }}
         validationSchema={nuevaBusquedaSchema}
      >
         {({errors, touched}) => {
            return (
         <Form className="m-2">
            <div className="d-flex flex-column mb-3">
               <div className="input-group mb-3">
                  <Field 
                     type="text" 
                     id="nombrePlato"
                     name="nombrePlato"
                     className="form-control" 
                     placeholder="Buscar platos"
                  />
               </div>
               {errors.nombrePlato && touched.nombrePlato ? (
                  <Alerta>{errors.nombrePlato}</Alerta>
               ) : null }
               <div className="d-flex">
                  <div className="mx-1">
                     <Field 
                        component="select" 
                        id="dieta"
                        name="dieta"
                        className="form-select form-select-sm"
                     >
                        <option value="">Consumo platos</option>
                        <option value="ketogenic">Cetogénicos</option>
                        <option value="vegetarian">Vegetarianos</option>
                        <option value="vegan">Veganos</option>
                        <option value="gluten">Libres de Gluten</option>
                     </Field>
                  </div>
                  <div className="mx-1">
                     <Field 
                        component="select" 
                        id="tipoPlato"
                        name="tipoPlato"
                        className="form-select form-select-sm"
                     >
                        <option value="">Categorias</option>
                        <option value="lunch">Platos Principales</option>
                        <option value="salad">Ensaladas</option>
                        <option value="breakfast">Desayunos</option>
                        <option value="snack">Meriendas</option>
                        <option value="dessert">Postres</option>
                        <option value="beverage">Bebidas</option>
                        <option value="appetizer">Aperitivos</option>
                     </Field>
                  </div>
                  <div className="mx-1">
                     <Field 
                        component="select" 
                        id="region"
                        name="region"
                        className="form-select form-select-sm"
                     >
                        <option value="">Cocina</option>
                        <option value="african">Africana</option>
                        <option value="german">Alemana</option>
                        <option value="american">Americana</option>
                        <option value="british">Britanica</option>
                        <option value="cajun" >Cajún</option>
                        <option value="chinese" >China</option>
                        <option value="korean" >Coreana</option>
                        <option value="spanish" >Española</option>
                        <option value="french" >Francesa</option>
                        <option value="greek" >Greca</option>
                        <option value="indian" >India</option>
                        <option value="italian" >Italiana</option>
                        <option value="japanese" >Japonesa</option>
                        <option value="mediterranean" >Mediterranea</option>
                        <option value="nordic" >Nordica</option>
                        <option value="thai">Thai</option>
                        <option value="vietnamese">Vietnamita</option>
                     </Field>
                  </div>
               </div>
            </div>
            <div className="d-flex justify-content-end">
               <button 
                  type="submit"
                  className="btn btn-primary bg-white mb-1 fs-6"
               >Buscar</button>
            </div>
         </Form>
         )}}
      </Formik>
   )
}

Buscador.defaultProps = {
   urlBusqueda: ''
}

export default Buscador