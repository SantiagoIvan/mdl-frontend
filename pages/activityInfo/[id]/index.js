import React, {useEffect, useState, useContext} from 'react'
import {API_URL,imageToUrl} from '../../../utils/urls'
import style from '../../../styles/About.module.css'
import AuthContext from '../../../context/AuthContext'
import Loading from '../../../components/Loading'
import {useRouter} from 'next/router'

const axios = require('axios');

const ActivityInfo = ({activity}) => {
    const router = useRouter();
    const [subscriptionId, setSubscriptionId] = useState(null);
    const [loading, setLoading] = useState(true);
    const { getToken, user } = useContext(AuthContext);

    const isSubscribed = async () => {
        const token = await getToken();
        const res = await fetch(`${API_URL}/users/${user.id}/subscriptions`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const subs = await res.json();
        const f = subs.find( sub => sub.activity.id === activity.id);
        setSubscriptionId(() => {if(f)return f.id});
        return f;
    }

    const subscribe = async () => {
        try{
            setLoading(() => true);
            const token = await getToken();
            const payload = {
                user: user.id,
                activity: activity.id
            };
            const config = {
                url: `${API_URL}/subscriptions`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            if(!subscriptionId){
                config.method='POST';
                config.data = payload;
                const res = await axios(config);
                setSubscriptionId(res.data.id)
            }else{
                config.url += `/${subscriptionId}`;
                config.method='DELETE';
                const res = await axios(config);
                setSubscriptionId( prev => null);
            }
            router.push('/subscriptions');
        }catch(error){
            console.log(error)
            setLoading(() => false)
        }
    }

    useEffect(() => {
        isSubscribed();
        setLoading(() => false);
    }, [])

    return (
        <>
            {loading? <Loading/> : (
                <section className={style.aboutSection}>
                    <img src={imageToUrl(activity.image)} alt="activity img" style={{width:"100%",height:"100%",margin:"auto 4rem"}}/>
                    <div className={style.container}>
                        <div className="title">
                            <h1 className={style.aboutTitle}>{activity.title}</h1>
                            <div className="underline"/>
                        </div>
                        <p style={{marginTop:"2rem",marginLeft:"2rem"}}>{activity.description}</p>
                        <button onClick={subscribe} type="button" className="btn" style={{marginLeft: "20.5rem"}}>{subscriptionId? "Unsubscribe!" : "Subscribe"}</button>
                    </div>
                </section>
            )}
        </>
    )
}

export const getStaticProps = async (ctx) => {
    const res = await fetch(`${API_URL}/activities/${ctx.params.id}`);
    const activity = await res.json();
    return {
        props: {
            activity
        }
    }
}

export const getStaticPaths = async () => {
    const res = await fetch(`${API_URL}/activities`);
    const activities = await res.json();
    const ids = activities.map(act=>act.id);
    const paths = ids.map( id => ({params: { id: id.toString()}}))
    return {
        paths,
        fallback: true
    }
}

export default ActivityInfo
