import {gql} from '@apollo/client'

export const GET_USERS = gql`
query userone($user_name : String!){
  userOne(user_name : $user_name)
  {
    id
    user_name
    first_name
    last_name
  }
}
`
export const GET_SAVINGS = gql `
query savingOne($user_id: Int!){
  savingOne(user_id:$user_id){
    amount
  }
}
`
export const  GET_BALANCE = gql`
query balanceone($user_id:Int!){
  balanceOne(user_id: $user_id){
    amount
  }
}
`
export const GET_EXPENSE = gql`
query expenseone($id:Int!){
  expenseOne(id : $id){
    category_id
    amount
    description
    date
  }
}
`