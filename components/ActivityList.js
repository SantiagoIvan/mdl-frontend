import React from 'react'
import activityListStyle from '../styles/ActivityList.module.css'
import Link from 'next/link'
import {imageToUrl} from '../utils/urls'

const ActivityList = ({activities}) => {

    return (
        <div className={activityListStyle.listContainer}>
            {activities.map( act => {
                return (
                    <article key={act.id} className={activityListStyle.activity}>
                        <div className={activityListStyle.photo}>
                            <img src={imageToUrl(act.image)} alt="img act"/>
                        </div>
                        <div className={activityListStyle.activityInfo}>
                            <header>
                                <h4>{act.title}</h4>
                            </header>
                            <p className={activityListStyle.activityText}>{act.description.substring(0,100)}...</p>
                            <Link href={`/activityInfo/${act.id}`}>
                                <button type="button" className={`${activityListStyle.verMas} btn`}>More info</button>
                            </Link>
                        </div>
                    </article>
                )
            })}
        </div>
    )
}

export default ActivityList
