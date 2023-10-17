import {gql} from '@apollo/client'

export const GET_USERS = gql`
query userone($user_name : String!){
  userOne(user_name : $user_name)
  {
    id
    user_name
    first_name
  }
}
`