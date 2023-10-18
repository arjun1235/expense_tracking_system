import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { GET_INCOME } from "../../gqloperations/queries"
import { useQuery } from "@apollo/client"


const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const IncomeReport = () => {
    const userid = +localStorage.getItem("user_id")
    const username = localStorage.getItem("user_name")

    const income_obj = useQuery(GET_INCOME, {
        variables: { "user_id": userid }
    })

    const mappedData = income_obj?.data?.incomeOne?.map(item => ({
        name: item.description, // Use 'description' as 'name'
        pv: item.amount, // Use 'amount' as 'pv'
        amt: item.amount,
      }));

    console.log(mappedData)
    return (
       
            <div className='income-container'>

<ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={mappedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
            </div>
     
    )
}

export default IncomeReport