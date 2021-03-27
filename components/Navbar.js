import React, {useState, useRef, useEffect, useContext} from 'react'
import { FaBars } from 'react-icons/fa'
import navStyle from '../styles/Navbar.module.css'
import Link from 'next/link'
import { imageToUrl } from '../utils/urls'
import AuthContext from '../context/AuthContext'
import { VscAccount } from 'react-icons/vsc'

const Navbar = () => {
    const [showLinks, setShowLinks] = useState(false);
    const linksContainerRef = useRef(null);
    const linksRef = useRef(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const linksHeight = linksRef.current.getBoundingClientRect()["height"]
        if(showLinks){
            linksContainerRef.current.style.height = `${linksHeight}px`
        }else{
            linksContainerRef.current.style.height = `0px`
        }
    }, [showLinks])

    return (
        <nav className={navStyle.nav}>
            <div className={navStyle.navCenter}>
                <div className={navStyle.navHeader}>
                    <Link href='/'>
                        <a>
                            <img className={navStyle.logo} src={imageToUrl()} alt="Magia de Luz Logo"/>
                        </a>
                    </Link>
                    <button className={navStyle.navToggle} onClick={() => setShowLinks(!showLinks)}>
                        <FaBars/>
                    </button>
                </div>
                <div className={navStyle.linksContainer} ref={linksContainerRef}>
                    <ul className={navStyle.links} ref={linksRef}>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/activities">Activities</Link></li>
                        {user && <li><Link href={`/subscriptions`}>My subscriptions</Link></li>}
                        {showLinks && <li style={{fontWeight:'bold'}}><Link href="/activities">Log in</Link></li>}
                    </ul>
                </div>
                {!user ? (
                    <Link href="/login"><button type="button" className={`${navStyle.loginBtn} btn`}>Log in</button></Link>
                ) : (
                    <Link href="/account">
                        <VscAccount className={navStyle.accountBtn} size={24}/>
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default Navbar