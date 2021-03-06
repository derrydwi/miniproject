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
      order_items_aggregate {
        aggregate {
          count(columns: id)
        }
      }
    }
  }
`

export const getProductDetailUser = gql`
  query getProductDetail($id: Int!, $_eq: String!) {
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
      order_items(where: { user_id: { _eq: $_eq } }, limit: 1) {
        product_id
      }
      order_items_aggregate {
        aggregate {
          count(columns: id)
        }
      }
      carts(limit: 1) {
        id
        product_id
        quantity
      }
      saveds(limit: 1) {
        id
      }
    }
  }
`

export const subscriptionProductDetail = gql`
  subscription subscriptionProductDetail($id: Int!, $_eq: String!) {
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
      order_items(where: { user_id: { _eq: $_eq } }, limit: 1) {
        product_id
      }
      order_items_aggregate {
        aggregate {
          count(columns: id)
        }
      }
      carts(limit: 1) {
        id
        product_id
        quantity
      }
      saveds(limit: 1) {
        id
      }
    }
  }
`
