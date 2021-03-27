import React from 'react'
import homeStyle from '../styles/Home.module.css'

const ServicesList = () => {
    return (
        <div className={homeStyle.services}>
            <li>Carta astral</li>
            <li>Terapeuta holistica</li>
            <li>Sanaciones a distancia</li>
            <li>Lectura de registros Akashicos</li>
        </div>
    )
}

export default ServicesList
