/* eslint-disable import/no-named-as-default */
import gql from 'graphql-tag'

export const getSaved = gql`
  query getSaved {
    saved(order_by: { id: desc }) {
      id
      product {
        id
        name
        description
        category
        image_url
        stock
        price
        reviews_aggregate {
          aggregate {
            avg {
              rating
            }
            count(columns: id)
          }
        }
      }
    }
  }
`

export const insertSaved = gql`
  mutation insertSaved($product_id: Int!) {
    insert_saved_one(object: { product_id: $product_id }) {
      id
    }
  }
`

export const deleteSaved = gql`
  mutation deleteSaved($id: Int!) {
    delete_saved_by_pk(id: $id) {
      id
    }
  }
`

export const subscriptionSaved = gql`
  subscription subscriptionSaved {
    saved(order_by: { id: desc }) {
      id
      product {
        id
        name
        description
        category
        image_url
        stock
        price
        reviews_aggregate {
          aggregate {
            avg {
              rating
            }
            count(columns: id)
          }
        }
      }
    }
  }
`
