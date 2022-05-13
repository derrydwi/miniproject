export default (graphqlError, { $auth }) => {
  const { gqlError } = graphqlError

  if (gqlError.extensions.code === 'invalid-jwt') {
    $auth.logout()
  }
}
