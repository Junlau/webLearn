import * as types from './mutation-type'

// 选择播放
export const selectPlay = function ({commit, state}, {list, index}) {
    console.log(state)
    commit(types.SET_SEQUENCE_LIST, list)
    commit(types.SET_PLAYLIST, list)
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_PLAYING_STATE, true)
}

// 播放全部
export const playAll = function ({ commit }, { list }) {
    console.log(list)
    commit(types.SET_PLAY_MODE, 0)
    commit(types.SET_SEQUENCE_LIST, list)
    commit(types.SET_PLAYLIST, list)
    commit(types.SET_CURRENT_INDEX, 0)
    commit(types.SET_PLAYING_STATE, true)
}
// 暂停播放
export const pausePlay = function ({ commit }) {
    commit(types.SET_PLAYING_STATE, false)
}

// 移除播放
export const stopPlay = function ({ commit }) {
    commit(types.SET_PLAYING_STATE, false)
    commit(types.SET_PLAYLIST, [])
    commit(types.SET_SEQUENCE_LIST, [])
    commit(types.SET_CURRENT_INDEX, -1)
}
