
/* STATE */
export const state = {
  simpleText: 'Hello From Vuex',
  user: null
}

export const mutations = {

  SimpleMutation (state, { text }) {
    state.simpleText = text
  }

}
