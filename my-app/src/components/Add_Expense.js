import { useMutation } from '@apollo/client'
import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { ADD_EXPENSE } from '../gqloperations/mutations'


export default function Add_Expense() {

    const [formData, setFormData] = useState({})
    const navigation = useNavigate()
    
    const [addexpense] = useMutation(ADD_EXPENSE,{
        onCompleted(data){
            navigation("/user_dashboard")
        }
    })
  
  const handleChange = (e)=> {
    let value = parseInt(e.target.value);
    if (Number.isNaN(value) || e.target.name==="date"){
        value = e.target.value
    }

    setFormData({
        ...formData,
        [e.target.name]:value
        })
    }
   

  const handleSubmit = async(e)=>{
    console.log(parseInt(localStorage.getItem("user_id")))
    e.preventDefault()
    await addexpense({
        variables: {
            expense : {
                user_id: parseInt(localStorage.getItem("user_id")),
                category_id : formData.category_id,
                amount: formData.amount,
                description: formData.description,
                date: formData.date
            }
        }
    })

  }
    return (
    <div className='bg'>
        <div className='form_signin'>

        <h1 className='container'>Adding Expense</h1>
        <form onSubmit={handleSubmit} className='form-floating'>
            
            <input className='form-control'
                type='number'
                placeholder='category id'
                name='category_id'
                onChange={handleChange}
                required
            />
            <input className='form-control'
                type='number'
                placeholder='Amount'
                name='amount'
                onChange={handleChange}
                required
            />
            <input className='form-control'
                type='text'
                placeholder='Description'
                name='description'
                onChange={handleChange}
                required
            />
            <input className='form-control'
                type='date'
                placeholder='Date(yyyy-mm-dd)'
                name='date' 
                onChange={handleChange}
                required
            />
            
            <button className='btn #673ab7 deep-purple' type='submit'>Add</button>
        </form>
        </div>

    </div>
  )
}
