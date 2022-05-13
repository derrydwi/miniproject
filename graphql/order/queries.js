/* eslint-disable import/no-named-as-default */
import gql from 'graphql-tag'

export const getOrder = gql`
  query getOrder {
    order(order_by: { id: desc }) {
      id
      alamat
      no_hp
      shipping_price
      total_price
      is_paid
      created_at
      order_items {
        id
        quantity
        price
        product {
          id
          name
          image_url
          price
          weight
        }
      }
    }
  }
`

export const insertOrder = gql`
  mutation insertOrder(
    $alamat: String!
    $no_hp: String!
    $shipping_price: bigint!
    $total_price: bigint!
  ) {
    insert_order_one(
      object: {
        alamat: $alamat
        no_hp: $no_hp
        shipping_price: $shipping_price
        total_price: $total_price
      }
    ) {
      id
    }
  }
`

export const updatePayOrder = gql`
  mutation updatePayOrder($id: Int!, $is_paid: Boolean!) {
    update_order_by_pk(pk_columns: { id: $id }, _set: { is_paid: $is_paid }) {
      id
    }
  }
`

export const subscriptionOrder = gql`
  subscription subscriptionOrder {
    order(order_by: { id: desc }) {
      id
      alamat
      no_hp
      shipping_price
      total_price
      is_paid
      created_at
      order_items {
        id
        quantity
        price
        product {
          id
          name
          image_url
          price
          weight
        }
      }
    }
  }
`
