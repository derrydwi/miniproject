/* eslint-disable import/no-named-as-default */
import gql from 'graphql-tag'

export const insertOrderItem = gql`
  mutation insertOrderItem(
    $objectsOrder: [order_item_insert_input!] = {}
    $objectsProduct: [product_insert_input!] = {}
    $_in: [Int!]
  ) {
    insert_order_item(objects: $objectsOrder) {
      affected_rows
    }
    insert_product(
      objects: $objectsProduct
      on_conflict: { constraint: product_pkey, update_columns: stock }
    ) {
      affected_rows
    }
    delete_cart(where: { id: { _in: $_in } }) {
      affected_rows
    }
  }
`
