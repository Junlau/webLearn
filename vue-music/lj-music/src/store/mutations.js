import * as types from './mutation-type'

const mutations = {
  // 获取歌手信息
  [types.SET_SINGER] (state, singer) {
    state.singer = singer
  },

  // 播放状态
  [types.SET_PLAYING_STATE] (state, flag) {
    state.playing = flag
  },

  // 播放列表
  [types.SET_PLAYLIST] (state, list) {
    state.playList = list
  },

  // 顺序播放列表
  [types.SET_SEQUENCE_LIST] (state, list) {
    state.sequenceList = list
  },

  // 播放模式
  [types.SET_PLAY_MODE] (state, mode) {
    state.mode = mode
  },

  // 播放索引
  [types.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  }
}

export default mutations
