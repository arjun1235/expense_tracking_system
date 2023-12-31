import { useQuery } from '@apollo/client'
import React from 'react'
import{Link} from 'react-router-dom'
import { GET_USERS } from '../gqloperations/queries'

export default function User_dashboard() {
  const username = localStorage.getItem("user_name")
  const {loading,error,data} = useQuery(GET_USERS,{ 
    variables : {user_name : username},
    // onCompleted(data){
    //   localStorage.setItem("user_id", data.userOne.id)
    // },
  },
  )
  const userid = data?.userOne?.id

  function to_clear(){
    localStorage.removeItem("token")
    localStorage.removeItem("userid")
  }
  
  return (
    <div className='bg'>
          <h1 className='welcome'> Welcome {data?.userOne?.first_name}
          <Link to ="/report"><button className="report">View Report</button></Link>
          </h1>
          {/* <h1 className='welcome'> Welcome {data?.userOne?.id}</h1> */}
          {
            localStorage.setItem("user_id" , data?.userOne?.id)
          }
          <div class="homecontainer">
          <Link to = "/"></Link>
          <div>
            
              <Link to ="/add_income"><button className="log">Add Income</button></Link>
              <Link to ="/add_wishlist" ><button className="reg">Add Wishlist</button></Link>
              <div className='space'>
                 <Link to ="/add_expense"><button className="reg">Add Expense</button></Link>
                 <Link to ="/add_emis" ><button className="log">Add EMIs</button></Link>
               </div>
               <div className='space'>
                 <Link to ="/add_saving"><button className="sv">Add Saving</button></Link>
                 </div>
                
                <div className='space'>
                <Link to ="/Login"><button className="logout"  onClick={to_clear}>Logout</button></Link>
                </div>
               
          </div> 
        </div>
    
  </div>)
}
