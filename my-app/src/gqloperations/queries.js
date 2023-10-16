import {gql} from '@apollo/client'
export const GET_ALL_QUERIES = gql`
query all{
    catogeries{
        id
        name
      }
    }


`