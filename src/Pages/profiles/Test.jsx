import React, {useState, useEffect} from 'react'
import axios from "axios"
import { Carousel } from 'react-bootstrap'
import Profile from './Profile'
import styles from '../../styles/test.module.css'
const Test = () => {
  const [test, setTest] = useState({ results: [] })

  useEffect(()=> {
    axios.get("https://skt-drf.herokuapp.com/profiles/")
    .then(res => {
      console.log(res)
      setTest(res.data)
    })
    .catch(err=> {
      console.log(err)
    })
  },[])
  return (
    <Carousel className={styles.Width}>
        {test.results.map((profile) => (
              <Carousel.Item>
              <Profile key={Profile.id} profile={profile}></Profile>
              </Carousel.Item>
              ))}
    </Carousel>
  )
}

export default Test