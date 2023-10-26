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
query balanceOne($user_id:Int!){
  balanceOne(user_id: $user_id){
    amount
  }
}
`
export const GET_EXPENSE = gql`
query expenseOne($user_id:Int!){
  expenseOne(user_id : $user_id){
    category_id
    amount
    description
    date
  }
}
`
export const GET_INCOME =gql`
query incomeOne($user_id :Int!){
  incomeOne(user_id:$user_id){
    amount
    description
    date
    
  }
}
`
export const GET_EMIS= gql`
query emisOne($user_id:Int!){
  emisOne(user_id:$user_id){
   category_id
    lender
    amount
    interest_rate
    start_date
    end_date
  }
}
`
export const GET_WISHLSIT = gql`
query wishlistOne($user_id:Int!){
  wishlistOne(user_id:$user_id){
    categories_id
    item_name
    estimated_cost
    status
    priority
    source
  }
}
`