<template>
  <div class="search">
    <a-form-model
      layout="inline"
      :model="rankParam"
      @submit="handleSubmit"
      @submit.native.prevent
      style="padding: 10px 0;"
    >
      <a-form-model-item>
        <a-input
          v-model="rankParam.param"
          placeholder="参数"
          style="width: 500px;height:50px;font-size:20px"
        ></a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-button
          type="primary"
          html-type="submit"
          :disabled="rankParam.param === ''"
          style="width: 80px;height:50px;font-size:20px"
        >搜索</a-button>
      </a-form-model-item>
    </a-form-model>
    <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' , display: 'flex'}">
      <span v-show="isResultUndifined">什么都没有哦~</span>
      <a-row @scroll="scrollevent" ref="picsRow">
        <a-col :span="4" v-for="(item,index) in tempUrlArr" :key="'card'+index">
          <a-card
            hoverable
            style="width: 90%; margin-bottom: 30px"
            @click="openImg('https://pximg.pixiv-viewer.workers.dev' + item.image_urls.large.slice(item.image_urls.large.indexOf('/c/')))"
            :bodyStyle="{ 'white-space': 'nowrap' }"
          >
            <img
              slot="cover"
              :src="'https://pximg.pixiv-viewer.workers.dev' + item.image_urls.square_medium.slice(item.image_urls.square_medium.indexOf('/c/'))"
            />
            <a-card-meta :title="item.id">
              <template slot="description">{{item.title}}</template>
            </a-card-meta>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<style lang="less">
</style>

<script>
import Axios from "axios";

export default {
  name: "Search",
  data() {
    return {
      // 输入框内容
      rankParam: {
        param: "",
      },
      tempUrlArr: [], // 小图url数组
      isResultUndifined: false, // 查询返回结果是否为空
    };
  },
  created() {
    this.rankParam.param = "type=search word=公主连结";
    this.handleSubmit();
  },
  mounted() {
    document.addEventListener("scroll", this.scrollevent);
  },
  computed: {
    comParam() {
      let tempParam = "?";
      if (this.rankParam.param.indexOf("type") == -1) {
        return false;
      }
      let tempArr = this.rankParam.param
        .slice(this.rankParam.param.indexOf("type"))
        .split(" ");
      tempArr.forEach((e, i) => {
        tempParam += e + "&";
      });
      tempParam = tempParam.slice(0, tempParam.length - 1);
      return tempParam;
    },
    // vuex中获取要过滤的tags数组
    filteredTags() {
      return this.$store.state.filteredTags;
    },
  },
  methods: {
    handleSubmit(e) {
      this.tempUrlArr = [];
      this.getPics(e);
    },
    // 向后台发送请求并将结果处理后存入tempUrlArr
    getPics(e) {
      if (!this.comParam) {
        alert("格式有误！");
        return;
      }
      let tempUrl = "https://api.imjad.cn/pixiv/v2/" + this.comParam;
      let _t = this;
      Axios.get(tempUrl)
        .then((res) => {
          // 当返回结果为空时给出页面提示
          if (res.data.illusts.length == 0) {
            _t.isResultUndifined = true;
          } else {
            _t.isResultUndifined = false;
          }

          // 根据tempUrlArr循环过滤作品tags
          for (let i = 0; i < res.data.illusts.length; i++) {
            if (this.checkTags(res.data.illusts[i].tags)) {
              continue;
            }
            _t.tempUrlArr.push(res.data.illusts[i]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 新窗口打开图片
    openImg(imgUrl) {
      window.open(imgUrl, "_blank");
    },
    // 检查tags对象数组中是否包含需要过滤的tag，若是返回true
    checkTags(tags) {
      for (let i = 0; i < tags.length; i++) {
        if (this.filteredTags.includes(tags[i].name)) {
          return true;
        }
      }
      return false;
    },
    // 滚轮滚动的方法
    scrollevent(e) {
      // console.log(this.$refs.picsRow.clientHeight);
    },
  },
};
</script>
<style lang="less" scoped>
.ant-card {
  margin: 0 auto;
}

// 图片卡片描述超出范围隐藏
.textEllipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>