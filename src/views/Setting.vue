<template>
  <div id="Setting">
    <div
      :style="{ background: '#fff', padding: '24px', minHeight: '280px' , display: 'flex', marginTop: '20px', flexDirection: 'column'}"
    >
      <div style="margin-bottom:10px">
        <span>过滤R-18内容</span>
        <a-switch
          :checked="R18Tag"
          checked-children="开"
          un-checked-children="关"
          @change="changeTag('R-18')"
        ></a-switch>
      </div>
      <div>
        <span>过滤R-18G内容</span>
        <a-switch
          :checked="R18GTag"
          checked-children="开"
          un-checked-children="关"
          @change="changeTag('R-18G')"
        ></a-switch>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "Setting",
  computed: {
    // vuex中拿取过滤tags数组
    filteredTags() {
      return this.$store.state.filteredTags;
    },
    // 判断过滤tags数组中是否有'R-18'，有返回true
    R18Tag() {
      return this.filteredTags.includes("R-18");
    },
    // 判断过滤tags数组中是否有'R-18G'，有返回true
    R18GTag() {
      return this.filteredTags.includes("R-18G");
    },
  },
  methods: {
    // vuex中拿取修改过滤tags数组的方法
    ...mapMutations(["setFilteredTags"]),
    // 切换按钮状态时，向过滤tags数组中加入或删除传入的tag
    changeTag(tempTag) {
      let tempIndex = this.filteredTags.indexOf(tempTag);
      let tempTags = []
      if (tempIndex != -1) {
        tempTags = [
          ...this.filteredTags.slice(0, tempIndex),
          ...this.filteredTags.slice(tempIndex + 1),
        ];
      } else {
        tempTags = [...this.filteredTags, tempTag];
      }
      this.setFilteredTags(tempTags);
    },
  },
};
</script>

<style>
</style>