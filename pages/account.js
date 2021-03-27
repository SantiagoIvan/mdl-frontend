import React, {useContext, useEffect, useState} from 'react'
import AuthContext from '../context/AuthContext'
import Link from 'next/link'
import styles from '../styles/Account.module.css'
import Loading from  '../components/Loading'

const Account = () => {
    const {logoutUser, user} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout( () => setLoading(false), 2000);
    }, []);

    return (
        <>
            <div className={styles.accountInfo}>
                {loading ? (<Loading/>) : user? (
                    <>
                        <h2 className={styles.mainTitle}>Account Info</h2>
                        <p><span className={styles.attr}>Logged in as: </span>{user.email}</p>
                        <button className="btn" type="button" onClick={logoutUser}>Log out</button>
                    </>
                ) : (
                    <>
                        <h2 className={styles.mainTitle}>Please log in first</h2>
                        <Link href='/login'>
                            <a>
                                <button type="button" className="btn">Go to Login</button>
                            </a>
                        </Link>
                    </>
                )}
            </div>
        </>
    )
}

export default Account
