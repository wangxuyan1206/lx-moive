<template>

    <div class='nav'>
       <header :class="fixed ? 'fixed' : ''">
            <div class="list">
                <div @click="goCity()">{{city}}</div>
                <div class="center">影院</div>
                <div>图标</div>
            </div>
            <div class="list">
                <div>全城</div>
                <div>APP订票</div>
                <div>最近去过</div>
            </div>
       </header>
           
        
         

        <!-- 内容部分 -->
        
            <div class="ban" v-for="(item, index) in cinema" :key="index">
                <div class="left">
                    <div class="name">{{item.name}}</div>
                    <div class="address">{{item.address}}</div>
                </div>
                    
                <div class="right">
                    <div class="price">￥{{item.lowPrice/100}}起</div>
                    <strong>距离未知</strong>
                </div>
            </div>
        
    </div>
</template>

<script>
// 导入正在热映列表数据
import {cinemaListData} from '@/api/api'
import BScroll from "better-scroll";
export default {
    data(){ 
        return{
            fixed:false,
            city:'北京',
            cinema:[],
            bs:null,
      
        }
    },
    async mounted(){
        let ret = await cinemaListData()
        this.cinema = ret.data.data.cinemas;
        this.city = this.$store.state.city;
        window.addEventListener('scroll',(e) => {
            let top = document.documentElement.scrollTop
            if(top > 90){
                this.fixed = true
            }else{
                this.fixed = false
            }
        },true)

       
    },
    methods: {
        goCity: function(cityName){
            this.$router.push({path: '/city'})
            this.$store.commit('setCity',cityName)

        },
        
    },
   
    
   
    
}
</script>

<style lang="scss" scoped>
    .nav{
        margin-bottom: 50px;
        header{
            width: 100%;
            
        
            .list{
                display: flex;
                text-align: center;
                border-bottom: 1px solid #ededed;
                height: 45px;
                line-height: 50px;
                div{
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    font-size:14px;
                    
                }
                
            }
        }
        .fixed{
            position: fixed;
            top:0;
            background:#fff;
            
        }
        .ban{
            width: 100%;
            height: 75px;
            padding:15px;
            box-sizing: border-box;
            display:flex;
            justify-content: space-around;
            border-bottom: 1px solid #ededed;
            
            .left{
                font-size: 15px;
                width: 170px;
                .name{
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                }
                .address{
                    font-size:12px;
                    color:#797D82;
                    margin-top:5px;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                }

            }
            .right{
                font-size: 12px;
                .price{
                    color:#fe5100;
                    font-size: 14px;
                    margin-bottom: 5px;
                }
                strong{
                    color:#797D82;
                    font-weight: 100;
                }
            }
        }
       
    
    }
    
</style>

