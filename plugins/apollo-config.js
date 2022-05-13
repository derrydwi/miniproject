export default (context) => {
  return {
    httpEndpoint: 'https://capital-airedale-21.hasura.app/v1/graphql',
    wsEndpoint: 'wss://capital-airedale-21.hasura.app/v1/graphql',
    getAuth: () => context.$auth.getToken('auth0'),
  }
}
