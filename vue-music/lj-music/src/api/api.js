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

 /**
 * @method 获取推荐歌单
 */
export const getNewSongs = () => api.get(`/personalized/newsong`, {})

/**
 * @method 获取排行榜内容摘要
 */
 export const getToplist = () => api.get(`/toplist/detail`, {})

 /**
 * @method 获取歌单分类
 */
export const getCatList = () => api.get(`/playlist/catlist`, {})

/**
 * @method 获取热门歌单分类
 */
 export const getHotlist = () => api.get(`/playlist/hot`, {})

 /**
  * @method 获取歌单
  */
 export const getPlayList = params => api.get(`/top/playlist`, { params })

 /**
 * @method 获取歌手分类列表
 * @params cat 即 category Code,歌手类型,默认 1001,返回华语男歌手数据
 * @params limit 返回数量 , 默认为30
 * @params offset 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * @params initial 按首字母索引查找参数, 如 /artist/list?type=1&area=96&initial=b 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列, 热门传-1,#传0
 */
export const getSingerList = params => api.get(`/artist/list`, { params })

/**
 * @method 获取全部mv
 */
 export const getMvAll = params => api.get(`/mv/all`, { params })
