export default (context) => {
  return {
    httpEndpoint: context.$config.hasuraBaseUrl,
    wsEndpoint: context.$config.hasuraWsBaseUrl,
    getAuth: () => context.$auth.getToken('auth0'),
  }
}
