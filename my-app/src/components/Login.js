import { useMutation } from '@apollo/client'
import React, {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { LOGIN } from '../gqloperations/mutations'


export default function Login() {
  const [formData, setFormData] = useState({})
  const navigation = useNavigate()

  const handleChange = (e)=> {
    setFormData({
        ...formData,
        [e.target.name]:e.target.value
    })
  }

  const [login,{loading, error, data}] = useMutation(LOGIN, {
    onCompleted(data){
      localStorage.setItem("token", data.login.token)
      localStorage.setItem("user_name",data.login.user_name)
      navigation("/user_dashboard")
    }
  })

  

  const handleSubmit = async (e)=>{
    e.preventDefault()
    console.log(formData)
    await login({
      variables : formData
    })
  }

    return (

      <div className='bg'>
      <Link to ="/"><button class="log">Home</button></Link>
        <div className='form_signin'>
        <h1 className='container'>SignIn</h1>
        <form onSubmit={handleSubmit} className='form-floating'>
            <input className='form-control'
            type='text'
            placeholder='User Name'
            name='username'
            onChange={handleChange}
            required
            />
            <input className='form-control'
            type='password'
            placeholder='Password'
            name='password'
            onChange={handleChange}
            required
            />
            <button className='btn #673ab7 deep-purple' type='submit'>Login</button>
        </form>
        <Link to ="/signUp"><h1 style={{
          fontSize : '14px'
        }}>Don't have account</h1></Link>
      </div>

    </div>
  )
}
