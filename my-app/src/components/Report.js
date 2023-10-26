import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import React from 'react'
import { GET_BALANCE, GET_EMIS, GET_EXPENSE, GET_INCOME, GET_SAVINGS, GET_USERS, GET_WISHLSIT } from '../gqloperations/queries'

export default function Report() {
    const userid = +localStorage.getItem("user_id")
    const username = localStorage.getItem("user_name")

    const balance_obj = useQuery(GET_BALANCE, {
        variables: { "user_id": userid },
        fetchPolicy: "network-only"
    })

    const user_obj = useQuery(GET_USERS, {
        variables: { "user_name": username },
        fetchPolicy: "network-only"
    })

    const saving_obj = useQuery(GET_SAVINGS, {
        variables: { "user_id": userid }
    })

    const expense_obj = useQuery(GET_EXPENSE, {
        variables: { "user_id": userid }
    })

    const income_obj = useQuery(GET_INCOME, {
        variables: { "user_id": userid }
    })

    const emis_obj = useQuery(GET_EMIS, {
        variables: { "user_id": userid }
    })

    const wishlist_obj = useQuery(GET_WISHLSIT, {
        variables: { "user_id": userid }
    })


    const mappedData = income_obj?.data?.incomeOne?.map(item => ({
        name: item?.description,
        amount: item?.amount,
        date: item?.date
    }));

    console.log(expense_obj)

    const mappedExpense = expense_obj?.data?.expenseOne?.map((item) => ({
        categoryid: item?.category_id,
        amount: item?.amount,
        description: item?.description,
        date: item?.date
    }))

    const mappedSaving = saving_obj?.data?.savingOne?.map((item) => ({
        amount: item?.amount
    }))

    const mappedEmis = emis_obj?.data?.emisOne?.map((item) => ({
        lender: item?.lender,
        amount: item?.amount,
        interest: item?.interest_rate
    }))

    const mappedWishlist = wishlist_obj?.data?.wishlistOne?.map((item) => ({
        name: item?.item_name,
        cost: item?.estimated_cost,
        status: item?.status,
        source: item?.source
    }))


    console.log(mappedExpense, 'mappeexfdd')


    return (
        <div className='main-report'>
            <div><h1>Report</h1>
                <Link to="/user_dashboard "><button className="dashboard">User Dashboard</button></Link>



                <div className='user-balance'>
                    <div className='user'>
                        <h1>Welcome {user_obj?.data?.userOne?.first_name}</h1> </div>

                    <div className='balance'>
                        <h2>Available Balance :  {balance_obj?.data?.balanceOne?.amount}</h2>
                    </div>
                </div>

                <div className='report-container'>
                    <div className='report-item'>
                        <div>Income data</div>
                        <div className="item">
                            <div>Description</div>
                            <div>|</div> <div>Amount</div>
                            <div>|</div><div>Date</div>

                        </div>

                        {mappedData?.map((item, index) => (
                            <div className={`item`} key={index}>
                                <div>{item.name}</div>
                                <div>|</div><div>{item.amount}</div>
                                <div>|</div><div>{item.date}</div>
                            </div>
                        ))}


                    </div>
                    <div className='report-item'>
                        <div>Expense</div>
                        <div className='item'>
                            <div>Category ID</div>
                            <div>|</div>
                            <div>Amount</div>
                            <div>|</div><div>Date</div>
                            <div>|</div><div>Description</div>
                        </div>

                        {mappedExpense?.map((item, index) => (
                            <div className="item" key={index}>
                                <div >{item?.categoryid}</div>
                                <div>|</div><div >{item?.amount}</div>
                                <div>|</div><div >{item?.date}</div>
                                <div>|</div><div >{item?.description}</div>
                            </div>
                        ))}
                    </div>
                    <div className='report-item'>
                        <div>Wishlist</div>
                        <div className='item'>
                            <div>Name</div>
                            <div>|</div> <div>Cost</div>
                            <div>|</div> <div>Status</div>
                            <div>|</div>  <div>source</div>
                        </div>
                        {mappedWishlist?.map((item, index) => (
                            <div className='item' key={index}>
                                <div>{item?.name}</div>
                                <div>|</div> <div>{item?.cost}</div>
                                <div>|</div> <div>{item?.status} </div>
                                <div>|</div><div>{item?.source}</div>
                            </div>
                        ))}

                    </div>
                    <div className='report-item'>
                        <div>EMIs</div>
                        <div className='item'>
                            <div>Lender</div>
                            <div>|</div><div>Amount</div>
                            <div>|</div><div>Interest</div>
                        </div>

                        {mappedEmis?.map((item, index) => (
                            <div className='item' key={index}>
                                <div> {item?.lender}</div>
                                <div>|</div><div> {item?.amount}</div>
                                <div>|</div><div> {item?.interest}</div>
                            </div>
                        ))}
                    </div>
                    <div className='report-item'>
                        <div>Saving</div>
                        <div>
                            <div>Amount</div>
                        </div>

                        {mappedSaving?.map((item, index) => (
                            <div>
                                <div>{item?.amount}</div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )

}
