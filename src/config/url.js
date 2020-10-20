// 定义电影列表需要的地址
export const nowPlayingListUri = 
    'gateway?cityId=110100&pageSize=10&type=1&k=6519854&pageNum='

export const comingSoonListUri = 
    'gateway?cityId=110100&pageSize=10&type=2&k=7874647&pageNum='

// 电影详情数据
export const moiveDetailUrl = 'gateway?k=1816047&filmId='

// 电影院数据
export const cinemaListUri = 'gateway?cityId=110100&ticketFlag=1&k=3962399'

// 城市列表
export const cityListUrl = "gateway?k=8495770"

// 个人中心相关接口
export const loginUrl = "http://127.0.0.1:3000/api/v1/login"
export const centerUrl = "http://127.0.0.1:3000/api/v1/user_info"