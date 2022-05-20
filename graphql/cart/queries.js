/* eslint-disable import/no-named-as-default */
import gql from 'graphql-tag'

export const getCart = gql`
  query getCart {
    cart(order_by: { id: desc }) {
      id
      quantity
      product {
        id
        name
        image_url
        price
        stock
        weight
      }
    }
  }
`

export const insertToCart = gql`
  mutation insertToCart($product_id: Int!, $quantity: Int!) {
    insert_cart_one(object: { product_id: $product_id, quantity: $quantity }) {
      id
    }
  }
`

export const updateToCart = gql`
  mutation updateToCart($id: Int!, $quantity: Int!) {
    update_cart_by_pk(pk_columns: { id: $id }, _set: { quantity: $quantity }) {
      id
    }
  }
`

export const deleteItemFromCart = gql`
  mutation deleteItemFromCart($id: Int!) {
    delete_cart_by_pk(id: $id) {
      id
    }
  }
`

export const deleteCart = gql`
  mutation deleteCart {
    delete_cart(where: {}) {
      affected_rows
    }
  }
`

export const subscriptionCart = gql`
  subscription subscriptionCart {
    cart(order_by: { id: desc }) {
      id
      quantity
      product {
        id
        name
        image_url
        price
        stock
        weight
      }
    }
  }
`
