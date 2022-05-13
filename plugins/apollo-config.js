// export default (context) => {
//   return {
//     // httpEndpoint: 'http://localhost:4000/graphql-alt',

//     /*
//      * For permanent authentication provide `getAuth` function.
//      * The string returned will be used in all requests as authorization header
//      */
//     httpEndpoint: 'https://capital-airedale-21.hasura.app/v1/graphql',
//     // tokenName: 'auth._token.auth0',
//     httpLinkOptions: {
//       headers: {
//         ...(localStorage.getItem('auth._token.auth0') !== false && {
//           Authorization: localStorage.getItem('auth._token.auth0'),
//         }),
//         ...(localStorage.getItem('auth._token.auth0') === false && {
//           'x-hasura-default-role': 'anonymous',
//         }),
//         // Authorization: this.$auth.getToken('auth0'),
//         // 'x-hasura-default-role': 'anonymous',
//       },
//     },
//     // getAuth: () => 'Bearer my-static-token',
//   }
// }
