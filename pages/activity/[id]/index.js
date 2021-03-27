import React, {useEffect, useState, useContext} from 'react'
import Link from 'next/link'
import {API_URL} from '../../../utils/urls'
import styles from '../../../styles/ActivityList.module.css'

const index = ({tasks, activityId}) => {
    return (
        <>
            <div className="title">
                <h1>Tasks</h1>
                <div className="underline"/>
            </div>
            <section className={styles.listContainer}>
                {tasks.map( (task,index) => (
                    <article key={task.id} className={styles.activity}>
                        <div className={styles.activityInfo}>
                            <header>
                                <h4>Day {index}</h4>
                            </header>
                            <p className={styles.activityText}>{task.description.substring(0,50)}...</p>
                            <div className={styles.btnContainer}>
                                <Link href={`/activity/${activityId}/task/${task.id}`}>
                                    <button type="button" className={`btn ${styles.btnSub}`} style={{marginTop:"1rem"}}>Start</button>
                                </Link>
                            </div>
                        </div>
                    </article>
                ))}
            </section>
        </>
    )
}

export default index

export const getStaticProps = async (ctx) => {
    const res = await fetch(`${API_URL}/activities/${ctx.params.id}/tasks`);
    const tasks = await res.json();
    return {
        props: {
            tasks,
            activityId: ctx.params.id
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