/* eslint-disable import/no-named-as-default */
import gql from 'graphql-tag'

export const insertReview = gql`
  mutation insertReview($rating: Int!, $product_id: Int!, $comment: String!) {
    insert_review_one(
      object: { product_id: $product_id, rating: $rating, comment: $comment }
    ) {
      id
    }
  }
`
