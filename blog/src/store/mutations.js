/* STATE */
export const state = {
  simpleText: 'Hello From Vuex'
}

export const mutations = {

  SimpleMutation (state, { text }) {
    state.simpleText = text
  }

}
