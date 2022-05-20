/* eslint-disable import/no-named-as-default */
import gql from 'graphql-tag'

export const getAllProduct = gql`
  query getAllProduct {
    product(order_by: { id: desc }) {
      id
      name
      image_url
      price
      reviews_aggregate {
        aggregate {
          avg {
            rating
          }
          count(columns: id)
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

export const getProductByCategory = gql`
  query getProductByCategory($_ilike: String!) {
    product(order_by: { id: desc }, where: { category: { _ilike: $_ilike } }) {
      id
      name
      image_url
      price
      reviews_aggregate {
        aggregate {
          avg {
            rating
          }
          count(columns: id)
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

export const getProductByName = gql`
  query getProductByName($_ilike: String!) {
    product(order_by: { id: desc }, where: { name: { _ilike: $_ilike } }) {
      id
      name
      category
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
      order_items_aggregate {
        aggregate {
          count(columns: id)
        }
      }
    }
  }
`

export const getLatestProduct = gql`
  query getLatestProduct($limit: Int!) {
    latestProduct: product(order_by: { id: desc }, limit: $limit) {
      id
      name
      description
      image_url
      price
    }
  }
`
