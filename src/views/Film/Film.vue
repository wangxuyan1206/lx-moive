<template>
    <div>
        <FilmListTopNav :class="fixed ? 'fixed' : '' "> </FilmListTopNav>
        <router-view></router-view>
    </div>
</template>

<script>
import FilmListTopNav from '@/components/FilmListTopNav'
export default {
    components:{
        FilmListTopNav
    },
    data(){
        return{
            fixed:false
        }
    },
    mounted(){
        // 事件监听，判断滚动条的位置
        window.addEventListener('scroll',(e)=>{
            let top = document.documentElement.scrollTop
            // console.log(top);
            if(top > 66){
                this.fixed = true

            }else{
                this.fixed = false
            }
        },true)
    }
}
</script>
<style lang="scss" scoped>
    .fixed{
        position: fixed;
        top:0;
        background:#fff;
    }
</style>