"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _vuexPersistedstate = _interopRequireDefault(require("vuex-persistedstate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var _default = new _vuex["default"].Store({
  state: {
    // 初始化状态
    filteredTags: ["R-18", "R-18G"]
  },
  mutations: {
    // 处理状态
    setFilteredTags: function setFilteredTags(state, tagsArr) {
      state.filteredTags = tagsArr;
    }
  },
  actions: {// 提交改变后的状态
  },
  // 使用vuex-persistedstate保证vuex数据持久化
  plugins: [(0, _vuexPersistedstate["default"])({
    storage: window.localStorage
  })]
});

exports["default"] = _default;