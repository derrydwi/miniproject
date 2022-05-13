/* eslint-disable import/no-named-as-default */
import gql from 'graphql-tag'

export const getUser = gql`
  query getUser($id: String!) {
    user: users_by_pk(id: $id) {
      id
      username
      fullname
      picture
    }
  }
`
