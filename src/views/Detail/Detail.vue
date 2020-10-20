<template>
    <div>
        <div class="film-header">
            <div class="goBack" @click="goBack()">
                <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAt1BMVEVHcEz///////////////////////////////////////////////////////////////////////////////////97e3saGxyIiYnW1tYdHh9UVVUpKiulpaXLy8s6OzyysrIiIyPx8fEeHyC/v7/5+fklJihCQ0Ntb28bHB1hYWKXl5c0NTZLS0xAQUI4ODk3ODjh4eHr6+s2Nzfq6uptbm5gYGIbHB39/f2VlZdLS0wzNDUZGhs8UYRWAAAAPHRSTlMAGHpLE3cKgEdgVnJfNBZ+cBx9A28js/6sjPvK7p+Q3pn1g/iUgfLYuvzCpeTR2eHiiIXihrvD/YCl0uTUXbEtAAABd0lEQVRIx91W13KDQAw0xnCHARuDe+/dKY7T9f/flTzghCLdMaMXj/eRnZ0T0qqUSveBim96gRWGVuCZfqW4zpCuSMGVRiFhwxEInIY+0qogUFXHHcm6IFGXEa20HaGEY1PKWlNo0KzhylZZaFFuoW8WUP5qkXdtMtrnx4dkzLn/jcgMXY7wlMpVNs+SUs4nMOylvsiME6h6rjawHmfqm/YG6aETzJY5X6V8SykHsJjmvyb9TOVoD/0R5qpElxHKLewOKGHo0tuGThdn/pPsony3A20iHPevMih92MGW9OO1Pj5Gjvqwp63sx1IT4aYLGCi6wIylXp5azuCkaiAvlgY5ZryGzUolDWKplSV6Q5jMlW1rxdIwS7zA8azu+JCWfl+KSRkBM9KEF+fro0BxGJagjPimNyJp/1et/RlNx2l1esC8f2oGDGOscYYpY4RzFgdjXSmW5Fm3JBmrmXMQcM4QzvHDObk4hx7nvGQdtaxTmnXA3zR+AH8JUdNL967cAAAAAElFTkSuQmCC"
                    alt=""
                />
            </div>
            
            <!---->
        </div>
        <div class="detail">
            <div class="img">
                <img v-lazy="film.poster" />
            </div>
            <div class="film-detail">
                <div class="film-name">{{film.name}}</div>
                <div class="grey-text">{{film.category}}</div>
                <div class="grey-text">{{film.premiereAt|parsePremiereAt}}上映</div>
                <div class="grey-text">{{film.nation}} | {{film.runtime}} 分钟</div>
                <div class="film-synopsis">
                {{film.synopsis}}
                </div>
            </div>
            <diV class="actors">
                <div class="title">演职人员</div>
                <Swiper :key="'actors_' + film.actors.length">
                    <div v-for="(item,index) in film.actors"  :key="index" class="swiper-slide">
                        <img :src="item.avatarAddress" alt="">
                    </div>
                </Swiper>
            </diV>
        </div>
    </div>
</template>

<script>
import {moiveDetailData} from '@/api/api'
import moment from 'moment'
import Swiper from '@/components/Swiper'
export default {
    data(){
        return {
            film:{actors:[]}
        }
    },
    async mounted(){
        let ret = await moiveDetailData(this.$route.params.filmId)
        // console.log(ret.data);
        this.film = ret.data.data.film
    },
    filters:{
        parsePremiereAt:function(value){
            //时间戳的单位是秒，要*1000
            return moment(value*1000).format('YYYY-MM-DD')
        }
    },
    components:{
        Swiper
    },
    created(){
        // 通知app.vue 组件移除底部菜单
        this.eventBus.$emit('footernav',false)
    },
    beforeDestroy(){
         // 通知app.vue 组件恢复底部菜单
        this.eventBus.$emit('footernav',true)
    },
    methods:{
        // 返回上一页
        goBack:function(){
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="scss" scoped>
.film-header {
    position: fixed;
    background-color: hsla(0, 0%, 100%, 0);
    color: transparent;
    -webkit-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
    width: 100vw;
    height: 44px;
    z-index: 1;

    .goBack img {
        width: 30px;
        margin-top: 5px;
        margin-left: 5px;
    }
}

.detail {
    background:#F4F4F4;
    .swiper-slide{
        margin-right:10px;
        img{
            width: 80px;
            height: 80px;
        }
    }
    .img {
        width: 100%;
        height: 260px;

        img {
            width: 100%;
            height: 100%;
        }
    }
    .film-detail{
        width:100%;
        height: 260px;
        background:#fff;
        padding:15px;
        box-sizing: border-box;
        .film-name{
            font-size: 18px;
        }
        .grey-text{
            color:#797D82;
            font-size: 13px;
            margin-top:4px;
        }
        .film-synopsis{
            color:#797D82;
            font-size: 13px;
            margin-top:12px;
        }
    }
    .actors{
        width:100%;
        height: 200px;
        background:#fff;
        margin-top:10px;
        padding:15px 15px 0;
        box-sizing: border-box;
        .title{
            font-size:16px;
            margin-bottom: 15px;
        }
    }
}
</style>