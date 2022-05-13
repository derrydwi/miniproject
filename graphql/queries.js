// eslint-disable-next-line import/no-named-as-default
import gql from 'graphql-tag'

export const getProduct = gql`
  query {
    product {
      id
      name
      description
      image_url
      price
      stock
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
`

export const getCart = gql`
  query {
    cart {
      id
      product {
        id
        name
        image_url
        price
      }
    }
  }
`

export const getOrder = gql`
  query {
    order {
      id
      provinsi
      kota
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
        }
      }
    }
  }
`
