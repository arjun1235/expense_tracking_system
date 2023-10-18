import {gql} from '@apollo/client'


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
export const ADD_SAVING = gql`
mutation addsaving($saving : addSavingValue!){
  addSaving(saving : $saving)
    {
      user_id
      amount
}}
`
export const ADD_WISHLIST = gql `
mutation addWishlist($wishlist : addWishlistValue!){
  addWishlist(wishlist : $wishlist){
    user_id
    status
    priority
    source
    item_name
    
  }}
  `
export const ADD_EMIS =gql`
mutation addEmis($emi : addEmisValue!) {
  addEmis(emi : $emi){
    user_id
    category_id
    lender
    amount
    interest_rate
    start_date
    end_date
  }
}
`
export const ADD_EXPENSE = gql`
mutation addexpense($expense : addExpenseValue!){
  addExpense(expense :$expense){
   	user_id
    category_id
    amount
    description
    date
    user_id
  }
}
`