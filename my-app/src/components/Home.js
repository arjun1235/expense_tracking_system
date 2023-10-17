import React from 'react'
import{Link} from 'react-router-dom'
// import {useQuery} from '@apollo/client'
// import {GET_ALL_QUERIES} from '../gqloperations/queries';

export default function Home() {
  // const {loading,error,data} = useQuery(GET_ALL_QUERIES)
  // if (loading) return <h1>Loading</h1>
  // if(error){
  //   console.log(error.message)
  // }
  return (
    <div className='bg'>
       {/* { 
       data.catogeries.map(catogerie=>{
        return(
          <div>
            {catogerie.id}
            {catogerie.name} */}
          <h1 className='welcome'> Welcome to Expense Tracking System</h1>
          <div class="homecontainer">
          <Link to = "/"></Link>
          <div>
              <Link to ="/Login"><button className="log">Login</button></Link>
              <Link to ="/SignUp" ><button className="reg">Sign up</button></Link>
              <p>Made with <span>❤</span> by <a href="https://www.linkedin.com/in/arjun-chhetri-851ab3193/">@arjun:)</a></p>
          </div> 
        </div>
        {/* </div> */}
        {/* ) */}
        
        {/* )
} */}
    
  </div>)
}
