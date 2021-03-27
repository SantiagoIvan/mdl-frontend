import React from 'react'
import Link from 'next/link'
import styles from '../styles/ActivityList.module.css'
import { imageToUrl } from '../utils/urls'

const SubscriptionList = ({subscriptions}) => {
    return (
        <>
            {subscriptions.length == 0 ? ( <div className="title"><h3>There is no subscriptions yet. <br/> Please join on one of our activities!</h3></div> ) 
            : (
                <>
                    <div className="title">
                        <h1>My subscriptions</h1>
                        <div className="underline"/>
                    </div>
                    <div className={styles.listContainer}>

                    {subscriptions.map( sub => 
                        <article key={sub.id} className={styles.activity}>
                            <div className={styles.photo}>
                                <img src={imageToUrl(sub.activity.image)} alt="img act"/>
                            </div>
                            <div className={styles.activityInfo}>
                                <header>
                                    <h4>{sub.activity.title}</h4>
                                </header>
                                {sub.isFinished ? <h4>Completed!</h4> : <h4>Current: Day {sub.currentTask}</h4> }
                                <div className={styles.btnContainer}>
                                    <Link href={`/activity/${sub.activity.id}`}><a><button type="button" className={`btn ${styles.btnSub}`}>See all Tasks</button></a></Link>
                                    {!sub.isFinished && (<Link href={`/activity/${sub.activity.id}/task/${sub.activity.tasks[sub.currentTask]}`}><a><button type="button" className={`btn ${styles.btnSub}`}>Next Task</button></a></Link>)}
                                </div>
                            </div>
                            
                            
                        </article>
                    )}
                    </div>
                </>
            )}
        </>
    )
}

export default SubscriptionList
