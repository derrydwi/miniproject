/* eslint-disable import/no-named-as-default */
import gql from 'graphql-tag'

export const getProductDetailGuest = gql`
  query getProductDetail($id: Int!) {
    productDetail: product_by_pk(id: $id) {
      id
      name
      description
      category
      image_url
      price
      stock
      weight
      reviews_aggregate {
        aggregate {
          avg {
            rating
          }
          count(columns: id)
        }
      }
      reviews(order_by: { created_at: desc }) {
        id
        comment
        rating
        created_at
        user {
          id
          username
          picture
        }
      }
    }
  }
`

export const getProductDetailUser = gql`
  query getProductDetail($id: Int!) {
    productDetail: product_by_pk(id: $id) {
      id
      name
      description
      category
      image_url
      price
      stock
      weight
      reviews_aggregate {
        aggregate {
          avg {
            rating
          }
          count(columns: id)
        }
      }
      reviews(order_by: { created_at: desc }) {
        id
        comment
        rating
        created_at
        user {
          id
          username
          picture
        }
      }
      order_items {
        product_id
      }
      carts {
        id
        product_id
        quantity
      }
    }
  }
`

export const subscriptionProductDetail = gql`
  subscription subscriptionProductDetail($id: Int!) {
    productDetail: product_by_pk(id: $id) {
      id
      name
      description
      category
      image_url
      price
      stock
      weight
      reviews_aggregate {
        aggregate {
          avg {
            rating
          }
          count(columns: id)
        }
      }
      reviews(order_by: { created_at: desc }) {
        id
        comment
        rating
        created_at
        user {
          id
          username
          picture
        }
      }
      order_items {
        product_id
      }
      carts {
        id
        product_id
        quantity
      }
    }
  }
`
