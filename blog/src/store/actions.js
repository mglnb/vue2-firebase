
export const simpleAction = ({ commit }, text) => {
  commit('SimpleMutation', { text })
}

export const setUser = ({ commit }, user) => {
  commit('SetUser', { user })
}
