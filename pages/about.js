import React from 'react'
import {imageToUrl} from '../utils/urls'
import aboutStyle from '../styles/About.module.css'

const About = () => {
    return (
        <>
            <section className={aboutStyle.aboutSection}>
                <img src={imageToUrl()} alt="some img"/>
                <div className={aboutStyle.container}>
                    <div className="title">
                        <h2 className={aboutStyle.aboutTitle}>My story</h2>
                        <div className="underline"/>
                    </div>
                    <p>lorem asda asaldasdsandlksadlsadsadsaddiwjkwldd
                        asdsakdlasdsadksladmksaldmlsakdmsalkdmsaldkmasldas
                        dsakdnlsakndlksadasldkasldlksadkasdlkksadadadasdk.
                    </p>
                </div>
            </section>
        </>
    )
}

export default About
