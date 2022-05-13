/* eslint-disable import/no-named-as-default */
import gql from 'graphql-tag'

export const getUser = gql`
  query getUser($id: String!) {
    user: users_by_pk(id: $id) {
      id
      username
      fullname
      email
      picture
      created_at
    }
  }
`

export const updateUserName = gql`
  mutation updateUserName($id: String!, $username: String!) {
    update_users_by_pk(pk_columns: { id: $id }, _set: { username: $username }) {
      id
    }
  }
`

export const subscriptionUser = gql`
  subscription subscriptionUser($id: String!) {
    user: users_by_pk(id: $id) {
      id
      username
      fullname
      email
      picture
      created_at
    }
  }
`
