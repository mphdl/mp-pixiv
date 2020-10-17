<template>
  <div class="search">
    <a-form-model
      layout="inline"
      :model="rankParam"
      @submit="handleSubmit"
      @submit.native.prevent
      style="padding: 10px 0"
    >
      <a-form-model-item>
        <a-input
          v-model="rankParam.param"
          placeholder="参数"
          style="width: 500px; height: 50px; font-size: 20px"
        ></a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-button
          type="primary"
          html-type="submit"
          :disabled="rankParam.param === ''"
          style="width: 80px; height: 50px; font-size: 20px"
          >搜索</a-button
        >
      </a-form-model-item>
    </a-form-model>
    <div
      :style="{
        background: '#fff',
        padding: '24px',
        minHeight: '280px',
        display: 'flex',
      }"
    >
      <span v-show="isResultUndifined">什么都没有哦~</span>
      <a-row ref="picsRow">
        <a-col
          :span="4"
          v-for="(item, index) in tempUrlArr"
          :key="'card' + index"
        >
          <a-card
            hoverable
            style="width: 90%; margin-bottom: 30px"
            @click="
              openImg(
                'https://pximg.pixiv-viewer.workers.dev' +
                  item.image_urls.large.slice(
                    item.image_urls.large.indexOf('/c/')
                  )
              )
            "
            :bodyStyle="{ 'white-space': 'nowrap' }"
          >
            <img
              slot="cover"
              :src="
                'https://pximg.pixiv-viewer.workers.dev' +
                item.image_urls.square_medium.slice(
                  item.image_urls.square_medium.indexOf('/c/')
                )
              "
            />
            <a-card-meta :title="item.id">
              <template slot="description">{{ item.title }}</template>
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
        param: "", // 搜索框内容
        page: 1, // 下一页的页码
        isComplete: false, // 搜索结果是否全部展示
        isRun: true, // 当前是否可搜索
      },
      tempUrlArr: [], // 小图url数组
      isResultUndifined: false, // 查询返回结果是否为空
      scrollInterval: {}, // 滚轮循环的存储
    };
  },
  created() {
    this.rankParam.param = "原神";
    this.handleSubmit();
  },
  activated() {
    // 切入时绑定滚轮事件、设置定时器监听是否到底部
    this.scrollInterval = setInterval(() => {
      this.scrollevent()
    }, 5000);
    document.addEventListener("scroll", this.scrollevent);
  },
  deactivated() {
    // 切出时解绑滚轮事件、取消定时器
    clearInterval(this.scrollInterval)
    document.removeEventListener("scroll", this.scrollevent);
  },
  computed: {
    // vuex中获取要过滤的tags数组
    filteredTags() {
      return this.$store.state.filteredTags;
    },
  },
  methods: {
    handleSubmit() {
      this.tempUrlArr = [];
      this.rankParam.page = 1
      this.rankParam.isComplete = false
      this.rankParam.isRun = true
      this.getPics();
    },
    // 向后台发送请求并将结果处理后存入tempUrlArr
    getPics() {
      if (this.rankParam.isComplete || !this.rankParam.isRun) {
        return
      }
      // 去后台搜索前对搜索功能进行封闭，以免重复触发搜索出bug
      this.rankParam.isRun = false
      let tempUrl = "https://api.imjad.cn/pixiv/v2/?type=search&word=" + this.rankParam.param + "&page=" + this.rankParam.page;
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
            // 向临时数组中增加过滤后的作品
            _t.tempUrlArr.push(res.data.illusts[i]);
          }
          // 请求成功后增加当前页码
          _t.rankParam.page++
        })
        .catch((err) => {
          console.log(err); 
        })
        .finally(()=> {
          // 请求结束后打开搜索功能
          _t.rankParam.isRun = true
        })
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
    // 滚轮滚动检测是否到底
    scrollevent() {
      var scr = document.documentElement.scrollTop || document.body.scrollTop; // 向上滚动的那一部分高度
      var clientHeight = document.documentElement.clientHeight; // 屏幕高度也就是当前设备静态下你所看到的视觉高度
      var scrHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight; // 整个网页的实际高度，兼容Pc端
      if ((scr + clientHeight) > (scrHeight - 150)) {
        this.getPics()
      }
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