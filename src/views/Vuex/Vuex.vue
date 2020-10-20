<template>
    <div>
        {{num}}
        {{city}}
        {{getCount}}
        <br>
        <button @click="handle4()">点我+13</button>
        <button @click="handle5()">获取总数</button>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'
export default {
    data(){
        return{
            num:1
        }
    },
    mounted(){
        console.log(this.$store.state.count);
    },
    computed:{
        ...mapState(['count','city']),
        ...mapGetters(['getCount'])
    },
    methods:{
        ...mapMutations(['add']),
        ...mapActions(['addAsync']),
        handle1:function(){
            this.$store.commit('add',13)
        },
        handle2:function(){
            this.add(13)
        },
        handle3:function(){
            this.$store.dispatch('addAsync',31)
        },
        handle4:function(){
            this.addAsync(31)
        },
        handle5:function(){
            console.log(this.$store.getters.getCount);
        }
    },
    
}
</script>