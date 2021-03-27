import homeStyle from '../styles/Home.module.css'
import ServicesList from '../components/ServicesList'
import {imageToUrl} from '../utils/urls'

const Home = () => {
    return (
        <>{/**TODO cambiar por una imagen de fondo con el titulo adelante tal vez */}
            <section className={homeStyle.heroSection}>
                <div className={homeStyle.heroTxt}>
                    <h1>Magia <br/>de Luz</h1>
                    <h4>Un lugar donde la magia <br/> se hace realidad o alguna frase vendehumo.</h4>
                </div>
                <div className={homeStyle.heroImg}>
                    <img src={imageToUrl()} alt="img hero"/>
                </div>
            </section>

            {/**TODO cambiar tal vez por un slider */}
            <section className={homeStyle.servicesSection}>
                <div className="title">
                    <h1 className={homeStyle.serviceTitle}>Our Services</h1>
                   <div className="underline"/>
                </div>
                <div className={homeStyle.servicesContainer}>
                    <img src={imageToUrl()} alt="alta img"/>
                    <ServicesList/>
                </div>
            </section>
        </>
    )
}


export default Home
