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
    cart(order_by: { id: desc }) {
      id
      quantity
      product {
        id
        name
        image_url
        price
        stock
      }
    }
  }
`

export const getOrder = gql`
  query {
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
        }
      }
    }
  }
`

export const getProductDetail = gql`
  query ($id: Int!) {
    productDetail: product_by_pk(id: $id) {
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
      reviews(order_by: { created_at: desc }) {
        id
        comment
        rating
        created_at
        user {
          username
          picture
        }
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
    cart(order_by: { id: desc }) {
      id
      quantity
      product {
        id
        name
        image_url
        price
        stock
      }
    }
  }
`

export const insertOrder = gql`
  mutation (
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

export const insertOrderItem = gql`
  mutation ($objects: [order_item_insert_input!]!) {
    insert_order_item(objects: $objects) {
      affected_rows
    }
  }
`

export const subscriptionOrder = gql`
  subscription {
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
        }
      }
    }
  }
`

export const deleteItemFromCart = gql`
  mutation ($id: Int!) {
    delete_cart_by_pk(id: $id) {
      id
    }
  }
`

export const deleteCart = gql`
  mutation ($_in: [Int!]) {
    delete_cart(where: { id: { _in: $_in } }) {
      affected_rows
    }
  }
`
