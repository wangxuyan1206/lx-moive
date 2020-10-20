<template>
  <div>
    <FilmList :list="list" :type="type" :key="'film' + list.length"></FilmList>
    <!-- <Loading/> -->
  </div>
</template>

<script>
// 导入正在热映列表数据
import { comingSoonListData } from "@/api/api";
import FilmList from "@/components/FilmList";

export default {
  data() {
    return {
      pageNum: 1,
      list: [],
      type: 2,
    };
  },

  components: {
    FilmList,
  },
  async mounted() {
    let ret = await comingSoonListData(this.pageNum);
    this.list = ret.data.data.films;
  },
};
</script>