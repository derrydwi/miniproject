/* eslint-disable import/no-named-as-default */
import gql from 'graphql-tag'

export const getOrder = gql`
  query getOrder($limit: Int!, $offset: Int!) {
    order(order_by: { id: desc }, limit: $limit, offset: $offset) {
      id
      alamat
      nama
      no_hp
      shipping_price
      total_price
      status
      transaction_token
      created_at
      updated_at
      order_items {
        id
        quantity
        price
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
  }
`

export const insertOrder = gql`
  mutation insertOrder(
    $alamat: String!
    $nama: String!
    $no_hp: String!
    $shipping_price: bigint!
    $total_price: bigint!
    $status: String!
    $response_midtrans: String!
  ) {
    insert_order_one(
      object: {
        alamat: $alamat
        nama: $nama
        no_hp: $no_hp
        shipping_price: $shipping_price
        total_price: $total_price
        status: $status
        response_midtrans: $response_midtrans
      }
    ) {
      id
    }
  }
`

export const subscriptionOrder = gql`
  subscription subscriptionOrder($limit: Int!, $offset: Int!) {
    order(order_by: { id: desc }, limit: $limit, offset: $offset) {
      id
      alamat
      nama
      no_hp
      shipping_price
      total_price
      status
      transaction_token
      created_at
      updated_at
      order_items {
        id
        quantity
        price
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
  }
`
