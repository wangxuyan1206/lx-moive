// 发送具体的请求
import http from '@/api/http'

import {
    nowPlayingListUri,
    comingSoonListUri,
    moiveDetailUrl,
    cityListUrl,
    loginUrl,
    centerUrl,
    cinemaListUri,
} from "@/config/url"


// 正在热映列表数据
export const nowPlayingListData = (pageNum) =>{
    http.defaults.headers.info = ''
    http.defaults.headers.authorization = ""
    return http.get(nowPlayingListUri + pageNum)
}

// 即将上映列表数据
export const comingSoonListData = (pageNum) =>{
    http.defaults.headers.authorization = ""
    return http.get(comingSoonListUri + pageNum)
}

// 电影详情数据
export const  moiveDetailData = (filmId) =>{
    http.defaults.headers.info = 'info'
    http.defaults.headers.authorization = ""
    return http.get(moiveDetailUrl + filmId)
}

// 电影院数据
export const  cinemaListData = () => {
    http.defaults.headers.info = 'cinema'
    http.defaults.headers.authorization = ""
    return http.get(cinemaListUri)
}

// 城市列表数据
export const cityListData = async () =>{
    http.defaults.headers.authorization = ""
    http.defaults.headers.info = 'city'
    let ret = await http.get(cityListUrl)
    let cities = ret.data.data.cities
    let codeList = []
    let dataList = []
    let indexList = []

    for(let i = 65; i <= 90; i++){
        codeList.push(String.fromCharCode(i))
    }

    codeList.forEach((element)=>{
        let tempArr = cities.filter((item) => element.toLowerCase() == item.pinyin.substr(0,1))
        // console.log(tempArr);
        if(tempArr.length >0){
            indexList.push(element)
            dataList.push({
                index:element,
                data:tempArr,
            })
        }
        
    })
    // 返回数据
    return Promise.resolve([dataList,indexList])
}

// 登录
export const userLogin = (data) => {
    return http.post(loginUrl,data);
}

// 获取用户个人信息
export const userInfo = (_token) => {
    http.defaults.headers.authorization = _token
    // http.interceptors.response.use(function(response){
    //     response.data.user_info.gender = response.data.user_info.gender
    //     ? '女' 
    //     : '男';
    //     return response
    // },function(error){

    // })
    return http.get(centerUrl)
}