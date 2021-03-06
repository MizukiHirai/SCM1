import Vue from 'vue'
import * as constants from '@/assets/constants'

const state = {
  userPath: []
}

const mutations = {
  setPath (state, userpath) {
    state.userPath = userpath.EmpLocation
  },
  reset (state) {
    state.userPath = []
  }
}

const actions = {
  getuserpath ({ commit }, empNo, token) {
    Vue.http.post('/emplocation/FetchAllEmpLocationInfo', empNo, token)
      .then((data) => {
        if (data.ProcessStatus === constants.STATUS_OK) {
          commit('setPath', { EmpLocation: data.EmpLocation })
        }
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
