const express = require('express')
const midtransClient = require('midtrans-client')
const axios = require('axios')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: 'SB-Mid-server-Iebluo1JjS1t7YnlaMpGlzpo',
  clientKey: 'SB-Mid-client-JLNwUU1q9S-ilzd2',
})

const header = {
  headers: {
    'x-hasura-admin-secret': 123456,
  },
}

app.get('/test', function (req, res) {
  res.send('Test successful')
})

app.get('/province', (req, res) => {
  axios
    .get('https://api.rajaongkir.com/starter/province', {
      params: {
        key: '283f74f2ada23e0792583f1d4ff7ea7d',
      },
    })
    .then((result) => {
      res.json(result.data.rajaongkir.results)
    })
    .catch((err) => {
      res.json(err)
    })
})

app.get('/city', (req, res) => {
  axios
    .get('https://api.rajaongkir.com/starter/city', {
      params: {
        province: req.query.province,
        key: '283f74f2ada23e0792583f1d4ff7ea7d',
      },
    })
    .then((result) => {
      res.json(result.data.rajaongkir.results)
    })
    .catch((err) => {
      res.json(err)
    })
})

app.post('/cost', (req, res) => {
  axios
    .post('https://api.rajaongkir.com/starter/cost', {
      origin: req.body.origin,
      destination: req.body.destination,
      weight: req.body.weight,
      courier: req.body.courier,
      key: '283f74f2ada23e0792583f1d4ff7ea7d',
    })
    .then((result) => {
      res.json(result.data.rajaongkir.results[0].costs)
    })
    .catch((err) => {
      res.json(err)
    })
})

app.post('/pay', function (req, res, next) {
  snap
    .createTransaction(req.body)
    .then((transaction) => {
      const transactionToken = transaction.token
      const transactionRedirectUrl = transaction.redirect_url
      const body = {
        query: `
          mutation updateToken($id: Int!, $transaction_token: String!) {
            updateToken: update_order_by_pk(pk_columns: {id: $id}, _set: {transaction_token: $transaction_token}) {
              id
              transaction_token
            }
          }      
        `,
        variables: {
          id: req.body.transaction_details.order_id,
          transaction_token: transactionToken,
        },
      }

      axios
        .post('https://capital-airedale-21.hasura.app/v1/graphql', body, header)
        .then((result) => {
          // eslint-disable-next-line no-console
          console.log(result.data.data.updateToken)
          res.send({
            transactionToken,
            transactionRedirectUrl,
            token: result.data.data.updateToken,
          })
        })
        .catch((err) => {
          res.json(err)
        })

      // res.send({ transactionToken, transactionRedirectUrl })
    })
    .catch((e) => {
      res.send(e.message)
    })
})

app.post('/notification', function (req, res, next) {
  // eslint-disable-next-line no-console
  console.log(
    req.body.order_id,
    req.body.transaction_status,
    req.body.transaction_time,
    req.body.settlement_time
  )
  snap.transaction.notification(req.body).then((statusResponse) => {
    const orderId = statusResponse.order_id
    const transactionStatus = statusResponse.status_code
    const responseMidtrans = JSON.stringify(statusResponse)

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
      query: `
        mutation updateResponseMidtrans($id: Int!, $status: String!, $response_midtrans: String!) {
          updateResponseMidtrans: update_order_by_pk(pk_columns: {id: $id}, _set: {status: $status, response_midtrans: $response_midtrans}) {
            id
            status
            response_midtrans
          }
        }      
      `,
      variables: {
        id: orderId,
        status,
        response_midtrans: responseMidtrans,
      },
    }

    axios
      .post('https://capital-airedale-21.hasura.app/v1/graphql', body, header)
      .then((result) => {
        res.json(result.data.data.updateResponseMidtrans)
      })
      .catch((err) => {
        res.json(err)
      })
  })
})

export default {
  path: '/api',
  handler: app,
}
