import React from 'react'
import{Link} from 'react-router-dom'

export default function Home() {
  return (
    <div className='bg'>
       
          <h1 className='welcome'> Welcome to Expense Tracking System</h1>
          <div class="homecontainer">
          <Link to = "/"></Link>
          <div>
              <Link to ="/Login"><button className="log">Login</button></Link>
              <Link to ="/SignUp" ><button className="reg">Sign up</button></Link>
              <p>Made with <span>❤</span> by <a href="https://www.linkedin.com/in/arjun-chhetri-851ab3193/">@arjun:)</a></p>
          </div> 
        </div>
       
    
  </div>)
}
