import {
  currency,
  rating,
  dateTime,
  year,
  inv,
  capitalize,
  relativeTime,
  totalItem,
  totalWeight,
  totalBill,
  totalPrice,
} from '~/utils/helpers'

export default function ({ app }, inject) {
  inject('currency', (money) => {
    return currency(money)
  })

  inject('rating', (ratingValue) => {
    return rating(ratingValue)
  })

  inject('dateTime', (dateTimeValue) => {
    return dateTime(dateTimeValue)
  })

  inject('year', (date) => {
    return year(date)
  })

  inject('inv', (orderDate, orderId) => {
    return inv(orderDate, orderId)
  })

  inject('capitalize', (text) => {
    return capitalize(text)
  })

  inject('relativeTime', (d1, d2 = new Date()) => {
    return relativeTime(d1, (d2 = new Date()))
  })

  inject('totalItem', (items) => {
    return totalItem(items)
  })

  inject('totalPrice', (items) => {
    return totalPrice(items)
  })

  inject('totalBill', (items, shippingPrice) => {
    return totalBill(items, shippingPrice)
  })

  inject('totalWeight', (items) => {
    return totalWeight(items)
  })
}
