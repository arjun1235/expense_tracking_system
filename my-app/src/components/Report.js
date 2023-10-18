import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_BALANCE, GET_EXPENSE, GET_SAVINGS, GET_USERS } from '../gqloperations/queries'

export default function Report() {
    const userid = +localStorage.getItem("user_id")
    const username = localStorage.getItem("user_name")

    const balance_obj = useQuery(GET_BALANCE,{
        variables:{"user_id" :userid},
        fetchPolicy: "network-only"
    })

    const user_obj = useQuery(GET_USERS,{
        variables : {"user_name" :username},
        fetchPolicy: "network-only"
    })

    const saving_obj = useQuery(GET_SAVINGS,{
        variables:{"user_id":  userid}
    })

    const expense_obj = useQuery(GET_EXPENSE,{
        variables : {
            variables:{"user_id" : userid},
            fetchPolicy: "network-only"}
    })

    console.log(balance_obj)
    console.log(user_obj)
    console.log (saving_obj?.data?.savingOne)
    console.log()
    
    return (
    <div  className='bg'>
        <div>Report
            <div className='top'>testing data</div>
            
            <div className='user'>
                {user_obj?.data?.userOne?.first_name} : name </div>
            <div className='balance'>
                {balance_obj?.data?.balanceOne?.amount}
            </div>
            <div className='saving'>
                {saving_obj?.data?.savingOne?.amount} : amount
            {
                saving_obj?.data?.savingOne?.map((elem, index) => {
                    return <div key={index}> {elem?.amount}</div>
                })
            }
    
            </div>
        </div>
    </div>
  )
}
