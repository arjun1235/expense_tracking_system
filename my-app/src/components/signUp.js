import { useMutation } from '@apollo/client'
import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { RET_INT, SIGN_UP } from '../gqloperations/mutations'


export default function SignUp() {
    const [formData, setFormData] = useState({})

    const navigation = useNavigate()
    

    const [signupUser] = useMutation(SIGN_UP,{
        onCompleted (data)
        {navigation("/Login")}})
    // if(loading) return <h1>Loading</h1>
  
  const handleChange = (e)=> {
    setFormData({
        ...formData,
        [e.target.name]:e.target.value
        })
    }
    
  const handleSubmit = async(e)=>{

    e.preventDefault()
    const data =await signupUser({
        variables: {
            user : formData
        }
       
    }    )
        const user = data?.addUser;
        if (!user){
            console.log("error")
        }
        console.log(data)
    }

    return (
    <div className='bg'>
        <Link to ="/" ><button class="reg">Home</button></Link>
        <div className='form_signin'>

        <h1 className='container'>SignUp</h1>
        <form onSubmit={handleSubmit} className='form-floating'>
            <input className='form-control'
                type='text'
                placeholder='First Name'
                name='first_name'
                onChange={handleChange}
                required
            />
            
            <input className='form-control'
                type='text'
                placeholder='Last Name'
                name='last_name'
                onChange={handleChange}
                required
            />
            <input className='form-control'
                type='text'
                placeholder='Gender'
                name='gender'
                onChange={handleChange}
                required
            />
            <input className='form-control'
                type='email'
                placeholder='Email'
                name='email'
                onChange={handleChange}
                required
            />
            <input className='form-control'
                type='user_name'
                placeholder='user_name'
                name='user_name'
                onChange={handleChange}
                required
            />
            <input className='form-control'
                type='password'
                placeholder='password'
                name='password'
                onChange={handleChange}
                required
            />
            <button className='btn #673ab7 deep-purple' type='submit'>Register</button>
        </form>
        </div>
        <Link to="/Login"><h1 style={{
            fontSize : '14px'
        }}>Already have an account</h1></Link>

<Link to="/user_dashboard"><h1 style={{
            fontSize : '14px'
        }}>for user dashboard</h1></Link>


    </div>
  )
}
