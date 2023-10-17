import {gql} from '@apollo/client'

export const RET_INT= gql `
mutation id($user_name : String!){
  idret(user_name : $user_name)
}
`

export const SIGN_UP = gql`
mutation adduser($user : addUserValue! ){
    addUser(user : $user){
      id
      first_name
      email
      user_name
      last_name
      gender
    }
    
  }
`

export const LOGIN = gql `
mutation login($username: String!, $password: String!){
  login(user_name: $username, password: $password){
    user_name
    token
  }
}
`

export const ADD_INCOME = gql`
mutation addincome($income : addIncomeValue!){
  addIncome(income : $income){
    user_id
    amount
    description
    date
  }}
`

