// 封装axios 添加请求拦截器

import axios from 'axios'

// 设置基础域名
axios.defaults.baseURL = "https://m.maizuo.com/"

axios.interceptors.request.use(function(config){
    let host = "mall.film-ticket.film.list"
    let info = config.headers.info
    if(info == 'cinema'){
        host = "mall.film-ticket.cinema.list"
    }
    if(info == 'info'){
        host = "mall.film-ticket.film.info"
    }
    if(info == 'city'){
        host = "mall.film-ticket.city.list"
    }

    
    if(config.headers.authorization){
        config.headers = {
            "authorization":config.headers.authorization,
        }
    }else{
        config.headers = {
            "X-Client-Info": 
                  '{"a":"3000","ch":"1002","v":"5.0.4","e":"16022333792873419020369921","bc":"110100"}',
            "X-Host":host
        }
    }
    return config
},function(err){

})

// 导出封装好的axios
export default axios