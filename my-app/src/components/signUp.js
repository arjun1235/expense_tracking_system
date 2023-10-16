import React, {useState} from 'react'
import {Link} from 'react-router-dom'
export default function SignUp() {
  const [formData, setFormData] = useState({})
  
  const handleChange = (e)=> {
    setFormData({
        ...formData,
        [e.target.name]:e.target.value
    })
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(formData)
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
                placeholder='Middle Name'
                name='middle_name'
                onChange={handleChange}
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
    </div>
  )
}
