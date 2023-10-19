import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import React from 'react'
import { GET_BALANCE, GET_EMIS, GET_EXPENSE, GET_INCOME, GET_SAVINGS, GET_USERS } from '../gqloperations/queries'

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
    }

    ))

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
                        <div className="income-item">
                            <div>Description</div>
                            <div>Amount</div>
                            <div>Date</div>

                        </div>

                        {mappedData?.map((item, index) => (
                            <div className={`income-item`} key={index}>
                                <div>{item.name}</div>
                                <div>{item.amount}</div>
                                <div>{item.date}</div>
                            </div>
                        ))}


                    </div>
                    <div className='report-item'>
                        <div>Expense</div>

                        {mappedExpense?.map((item, index) => (
                            <div className="income-item" key={index}>
                                <div className="left">{item?.categoryid}</div>
                                <div className="middle">{item?.amount}</div>
                                <div className="right">{item?.date}</div>
                                <div className="right">{item?.description}</div>
                            </div>
                        ))}
                    </div>
                    <div className='report-item'>three</div>
                    <div className='report-item'>four</div>
                    <div className='report-item'>five</div>
                </div>

                {/* <div className='saving'>
                    : saving
                    {
                        saving_obj?.data?.savingOne?.map((elem, index) => {
                            return <div key={index}> {elem?.amount}</div>
                        })
                    }

                    <div className='expense'>
                        : expense
                        {
                            expense_obj?.data?.expenseOne?.map((elem, index) => {
                                return <div key={index}> {elem?.description}</div>
                            })
                        }
                    </div>

                    <div className='income'>
                        :income
                        {income_obj?.data?.incomeOne?.map((elem, index) => {
                            return <div key={index}>{elem?.amount}</div>
                        })
                        }
                    </div>

                    <div className='emis'>
                        :emis
                        {emis_obj?.data?.emisOne?.map((elem, index) => {
                            return <div key={index}>{elem?.lender}</div>
                        }
                        )
                        }
                    </div>

                </div> */}
            </div>
        </div>
    )
    
}
