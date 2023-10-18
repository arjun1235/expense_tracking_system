import { useMutation } from '@apollo/client'
import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { ADD_WISHLIST } from '../gqloperations/mutations'


export default function Add_Wishlist() {

    const [formData, setFormData] = useState({})
    const navigation = useNavigate()
    
    const [addwishlist] = useMutation(ADD_WISHLIST,{
        onCompleted(data){
            navigation("/user_dashboard")
        }
    })
  
  const handleChange = (e)=> {
    let value = parseInt(e.target.value);
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
    await addwishlist({
        variables: {
            wishlist : {
                user_id: parseInt(localStorage.getItem("user_id")),
                category_id: formData.category_id,
                item_name: formData.item_name,
                estimate_cost: formData.estimate_cost,
                priority: formData.priority,
                source: formData.source,

            }
        }
    })

  }
    return (
    <div className='bg'>
        <div className='form_signin'>

        <h1 className='container'>Adding Wishlist</h1>
        <form onSubmit={handleSubmit} className='form-floating'>
            
            <input className='form-control'
                type='number'
                placeholder='category id'
                name='category_id'
                onChange={handleChange}
                required
            />
            <input className='form-control'
                type='text'
                placeholder='Item name'
                name='item_name'
                onChange={handleChange}
                required
            />
            <input className='form-control'
                type='number'
                placeholder='Amount'
                name='estimate_cost'
                onChange={handleChange}
                required
            />
            <input className='form-control'
                type='number'
                placeholder='Priority'
                name='priority'
                onChange={handleChange}
                required
            />
            <input className='form-control'
                type='text'
                placeholder='Source'
                name='source'
                onChange={handleChange}
                required
            />
            
            
            <button className='btn #673ab7 deep-purple' type='submit'>Add</button>
        </form>
        </div>

    </div>
  )
}
