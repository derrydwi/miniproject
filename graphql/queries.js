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
      quantity
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

export const getProductDetail = gql`
  query ($_eq: Int!) {
    productDetail: product(where: { id: { _eq: $_eq } }) {
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
      reviews {
        id
        name
        comment
        rating
        created_at
      }
    }
  }
`

export const insertToCart = gql`
  mutation ($product_id: Int!, $quantity: Int!) {
    insert_cart_one(object: { product_id: $product_id, quantity: $quantity }) {
      id
    }
  }
`

export const updateToCart = gql`
  mutation ($id: Int!, $quantity: Int!) {
    update_cart_by_pk(pk_columns: { id: $id }, _set: { quantity: $quantity }) {
      id
    }
  }
`

export const subscriptionCart = gql`
  subscription {
    cart {
      id
      quantity
      product {
        id
        name
        image_url
        price
      }
    }
  }
`
