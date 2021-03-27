import React, {useEffect, useState, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import Loading from '../components/Loading'
import {API_URL} from '../utils/urls'
import SubscriptionsList from '../components/SubscriptionList'

const Subscriptions = () => {
    const [ loading, setLoading ] = useState(true);
    const [ subscriptions, setSubscriptions ] = useState([]);
    const { user, getToken } = useContext(AuthContext);

    useEffect( () => {
        const getSubs = async () => {
            try{
                const token = await getToken();
                const res = await fetch(`${API_URL}/users/${user.id}/subscriptions`,{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const subs = await res.json();
                setSubscriptions(subs);
            }catch(error){
                console.log(error)
            }
        }
        getSubs();
        setLoading(false);
    }, []);

    return (
        <>
            { loading ? (<Loading/>) :
                    <SubscriptionsList subscriptions={subscriptions}/> }
        </>
    )
}

export default Subscriptions
