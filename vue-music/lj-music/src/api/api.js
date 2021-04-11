import api from './instance'

/**
 * @method 获取轮播图
 */
 export const getBanner = () => api.get('/banner', {})

/**
 * @method 获取热搜列表
 */
 export const getSearchHot = () => api.get('/search/hot', {})

 /**
  * @method 搜索
  * @param {String} keywords 关键词
  * @param {Number} limit 返回数量 , 默认为 30
  * @param {Number} offset 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
  * @param {Number} type 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
  */
 export const search = (keywords, limit, offset, type) =>
   api.get(
     `/search?keywords=${keywords}&limit=${limit}&offset=${offset}&type=${type}`,
     {}
    )

/**
 * @method 获取推荐歌单
 * @params limit 取出数量默认为 30
 */
 export const getPersonalized = limit =>
 api.get(`/personalized?limit=${limit}`, {})
