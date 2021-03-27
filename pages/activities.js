import React from 'react'
import ActivityList from '../components/ActivityList'
import activitiesStyle from '../styles/Activities.module.css'
import {API_URL} from '../utils/urls'

const Activities = ({activities}) => {
    return (
        <>
            <section className={activitiesStyle.container}>
                <div className="title">
                    <h1 className={activitiesStyle.activitiesTitle}>Activities</h1>
                    <div className="underline"/>
                    <ActivityList activities={activities}/>
                </div>
            </section>
        </>
    )
}

export default Activities

export const getStaticProps = async () => {
    const res = await fetch(`${API_URL}/activities`);
    const activities = await res.json();
  
    return {
      props: {
        activities
      }
    }
}