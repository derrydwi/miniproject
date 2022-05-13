// import { getCart } from '~/graphql/queries'

// const state = () => ({
//   cart: {},
// })

// const getters = {
//   getCart: (state) => {
//     return state.cart
//   },
// }

// const mutations = {
//   SET_CART(state, param) {
//     state.cart = param
//   },
// }

// const actions = {
//   fetchCart({ commit }, param) {
//     // eslint-disable-next-line no-console
//     console.log(this.$auth.getToken('auth0'))
//     this.app.apolloProvider.defaultClient
//       .query({
//         query: getCart,
//         context() {
//           return {
//             headers: {
//               Authorization: this.$auth.getToken('auth0'),
//             },
//           }
//         },
//       })
//       .then((result) => {
//         // eslint-disable-next-line no-console
//         console.log('result', result)
//         commit('SET_CART', result.data.cart)
//       })
//   },
// }

// export default {
//   state,
//   getters,
//   mutations,
//   actions,
// }
