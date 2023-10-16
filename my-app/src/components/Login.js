import React, {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'


export default function Login() {
  const [formData, setFormData] = useState({})
  const navigation = useNavigate()

  const handleChange = (e)=> {
    setFormData({
        ...formData,
        [e.target.name]:e.target.value
    })
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(formData)
    navigation("/")
  }
    return (

      <div className='bg'>
      <Link to ="/"><button class="log">Home</button></Link>
        <div className='form_signin'>
        <h1 className='container'>SignIn</h1>
        <form onSubmit={handleSubmit} className='form-floating'>
            <input className='form-control'
            type='user_name'
            placeholder='User Name'
            name='user_name'
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

        </div>

    </div>
  )
}
