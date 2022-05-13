/* eslint-disable import/no-named-as-default */
import gql from 'graphql-tag'

export const getProduct = gql`
  query getProduct($limit: Int!, $offset: Int!) {
    product(order_by: { id: desc }, limit: $limit, offset: $offset) {
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
      order_items_aggregate {
        aggregate {
          count(columns: id)
        }
      }
    }
  }
`

export const getAllProduct = gql`
  query getAllProduct {
    product(order_by: { id: desc }) {
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

export const subscriptionProduct = gql`
  subscription subscriptionProduct($limit: Int!, $offset: Int!) {
    product(order_by: { id: desc }, limit: $limit, offset: $offset) {
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
      order_items_aggregate {
        aggregate {
          count(columns: id)
        }
      }
    }
  }
`

export const subscriptionProductByCategory = gql`
  subscription subscriptionProductByCategory($_ilike: String!) {
    product(order_by: { id: desc }, where: { category: { _ilike: $_ilike } }) {
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
      order_items_aggregate {
        aggregate {
          count(columns: id)
        }
      }
    }
  }
`
