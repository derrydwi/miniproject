const { Router } = require('express')
const router = Router()
const midtransClient = require('midtrans-client')
const axios = require('axios')

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
})

const header = {
  headers: {
    'x-hasura-admin-secret': process.env.HASURA_SECRET,
  },
}

const baseURL = process.env.HASURA_BASE_URL

router.post('/payment/pay', function (req, res, next) {
  snap
    .createTransaction(req.body)
    .then((transaction) => {
      const transactionToken = transaction.token
      const transactionRedirectUrl = transaction.redirect_url
      const query = `mutation updateToken($id: Int!, $transaction_token: String!) {
        updateToken: update_order_by_pk(pk_columns: {id: $id}, _set: {transaction_token: $transaction_token}) {
          id
          transaction_token
        }
      }`
      const body = {
        query,
        variables: {
          id: req.body.transaction_details.order_id,
          transaction_token: transactionToken,
        },
      }

      axios
        .post(baseURL, body, header)
        .then((result) => {
          res.send({
            transactionToken,
            transactionRedirectUrl,
            token: result.data.data.updateToken,
          })
        })
        .catch((err) => {
          res.json(err)
        })
    })
    .catch((err) => {
      res.send(err.message)
    })
})

router.post('/payment/notification', function (req, res, next) {
  snap.transaction.notification(req.body).then((statusResponse) => {
    const orderId = statusResponse.order_id
    const transactionStatus = statusResponse.status_code
    const responseMidtrans = JSON.stringify(statusResponse)
    const query = `mutation updateResponseMidtrans($id: Int!, $status: String!, $response_midtrans: String!) {
      updateResponseMidtrans: update_order_by_pk(pk_columns: {id: $id}, _set: {status: $status, response_midtrans: $response_midtrans}) {
        id
        status
        response_midtrans
      }
    }`

    let status
    switch (transactionStatus) {
      case '200':
        status = 'SUCCESS'
        break
      case '201':
        status = 'PENDING'
        break
      case '202':
        status = 'CANCEL'
        break
    }

    const body = {
      query,
      variables: {
        id: orderId,
        status,
        response_midtrans: responseMidtrans,
      },
    }

    axios
      .post(baseURL, body, header)
      .then((result) => {
        res.json(result.data.data.updateResponseMidtrans)
      })
      .catch((err) => {
        res.json(err)
      })
  })
})

module.exports = router
