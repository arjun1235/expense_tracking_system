import { useMutation } from '@apollo/client'
import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { ADD_SAVING } from '../gqloperations/mutations'


export default function Add_Saving() {

    const [formData, setFormData] = useState({})
    const navigation = useNavigate()
    
    const [addsaving] = useMutation(ADD_SAVING,{
        onCompleted(data){
            navigation("/user_dashboard")
        }
    })
  
  const handleChange = (e)=> {
        let value = parseInt(e.target.value);

        console.log("this is a line")
        console.log(formData)
        console.log(parseInt(localStorage.getItem("user_id")))
        console.log("this is other line") 

        if (Number.isNaN(value)){
            value = e.target.value
            }

            setFormData({
            ...formData,
            [e.target.name]:value
        })
    }
    
  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log(formData)
    await addsaving({
        variables: {
            saving : {
                user_id: parseInt(localStorage.getItem("user_id")),
                amount: formData.amount
            }
        }
    })
  }
    return (
    <div className='bg'>
        <div className='form_signin'>

        <h1 className='container'>Adding Saving</h1>
        <form onSubmit={handleSubmit} className='form-floating'>
            
            <input className='form-control'
                type='number'
                placeholder='Amount'
                name='amount'
                onChange={handleChange}
                required
            />
            
            
            <button className='btn #673ab7 deep-purple' type='submit'>Add</button>
        </form>
        </div>

    </div>
  )
}
