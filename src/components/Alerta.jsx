import React from 'react'

const Alerta = ({children}) => {
    return (
        <div className="text-center text-white mb-3 bg-danger font-bold p-1">
            {children}
        </div>
    )
}

export default Alerta
