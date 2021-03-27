import React,{useEffect, useContext, useState} from 'react'
import {API_URL} from '../../../../../utils/urls'
import AuthContext from '../../../../../context/AuthContext'
import Loading from '../../../../../components/Loading';

const axios = require('axios');

const index = ({task, activityId}) => {
    const { getToken, user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [sub, setSub] = useState('');

    const updateCurrentTask = async () => {
        try {
            const token = await getToken();
            let res = await fetch(`${API_URL}/users/${user.id}/subscriptions`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const subs = await res.json();
            const f = subs.find( sub => sub.activity.id === activityId);
            setSub(() => f.id);

            const config = {
                method: 'PUT',
                url: `${API_URL}/subscriptions/${f.id}`,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                data: { taskId: task.id}
            };
            res = await axios(config);
            if(res.status!=200){
                console.log(res)
            }
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        setLoading(true);
        updateCurrentTask();
        setLoading(false);
    }, [])
    return (
        <section>
            {loading ? <Loading/> : (
                <>
                    <h2>{task.title}</h2>
                    <p>{task.description}</p>
                    <audio controls>
                        <source src={`${API_URL}${task.media.url}`} type="audio/mp3"/>
                    </audio>
                </>
            )}
        </section>
    )
}

export default index

export const getStaticProps = async (ctx) => {
    const activityRes = await fetch(`${API_URL}/activities/${ctx.params.id}`);
    const activity = await activityRes.json();
    const res = await fetch(`${API_URL}/activities/${ctx.params.id}/tasks/${ctx.params.taskid}`);
    const task = await res.json();
    
    return {
        props: {
            task,
            activityId: activity.id
        }
    }
}

export const getStaticPaths = async () => {
    const res = await fetch(`${API_URL}/activities`);
    const activities = await res.json();

    const paths = activities.map(act=> {
        let arr = [];
        for (let i = 0; i < act.tasks.length; i++) {
            arr.push({params: { id:act.id.toString(),taskid: act.tasks[i].id.toString() } })
        }
        return arr;
    }).reduce((acc, val) => acc.concat(val), []);
    return {
        paths,
        fallback: false
    }
}