import { useMutation } from '@apollo/client'
import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { ADD_EMIS } from '../gqloperations/mutations'


export default function Add_EMIs() {

    const [formData, setFormData] = useState({})
    const navigation = useNavigate()
    
    const [addemis] = useMutation(ADD_EMIS,{
        onCompleted(data){
            navigation("/user_dashboard")
        }
    })

  const handleChange = (e)=> {
    console.log(parseInt(localStorage.getItem("user_id")))
    let value = parseInt(e.target.value);
    if (Number.isNaN(value) || e.target.name==="start_date" || e.target.name==="end_date"){
        value = e.target.value
    }

    setFormData({
        ...formData,
        [e.target.name]:value
        })
    }
   

  const handleSubmit = async(e)=>{
    e.preventDefault()
    await addemis({
        variables: {
            emi : {
                user_id: parseInt(localStorage.getItem("user_id")),
                category_id: formData.category_id,
                lender: formData.lender,
                amount: formData.amount,
                interest_rate : formData.interest_rate,
                start_date : formData.start_date,
                end_date : formData.end_date
            }
        }
    })

  }
    return (
    <div className='bg'>
        <div className='form_signin'>

        <h1 className='container'>Adding EMI</h1>
        <form onSubmit={handleSubmit} className='form-floating'>
            
            <input className='form-control'
                type='number'
                placeholder='Category id'
                name='category_id'
                onChange={handleChange}
                required
            />
            <input className='form-control'
                type='text'
                placeholder='Lender'
                name='lender'
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
                type='number'
                placeholder='Interest Rate'
                name='interest_rate'
                onChange={handleChange}
                required
            />
            <input className='form-control'
                type='date'
                placeholder='Start Date '
                name='start_date' 
                onChange={handleChange}
                required
            />
            <input className='form-control'
                type='date'
                placeholder='End Date(yyyy-mm-dd)'
                name='end_date' 
                onChange={handleChange}
                required
            />
            <button className='btn #673ab7 deep-purple' type='submit'>Add</button>
        </form>
        </div>

    </div>
  )
}
