const { Router } = require('express')
const router = Router()
const axios = require('axios')

const key = process.env.RAJA_ONGKIR_API_KEY

router.get('/shipping/province', (req, res) => {
  axios
    .get('https://api.rajaongkir.com/starter/province', {
      params: {
        key,
      },
    })
    .then((result) => {
      res.json(result.data.rajaongkir.results)
    })
    .catch((err) => {
      res.json(err)
    })
})

router.get('/shipping/city', (req, res) => {
  axios
    .get('https://api.rajaongkir.com/starter/city', {
      params: {
        province: req.query.province,
        key,
      },
    })
    .then((result) => {
      res.json(result.data.rajaongkir.results)
    })
    .catch((err) => {
      res.json(err)
    })
})

router.post('/shipping/cost', (req, res) => {
  axios
    .post('https://api.rajaongkir.com/starter/cost', {
      origin: req.body.origin,
      destination: req.body.destination,
      weight: req.body.weight,
      courier: req.body.courier,
      key,
    })
    .then((result) => {
      res.json(result.data.rajaongkir.results[0].costs)
    })
    .catch((err) => {
      res.json(err)
    })
})

module.exports = router
