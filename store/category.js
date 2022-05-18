const state = () => ({
  categories: ['electronic', 'fashion', 'hobby', 'jewelry'],
})

const getters = {
  getCategories: (state) => {
    return state.categories
  },
}

export default {
  state,
  getters,
}
