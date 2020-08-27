"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

var _antDesignVue = _interopRequireDefault(require("ant-design-vue"));

require("ant-design-vue/dist/antd.less");

require("@/assets/css/basic.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].config.productionTip = false;

_vue["default"].use(_antDesignVue["default"]);

new _vue["default"]({
  router: _router["default"],
  store: _store["default"],
  // 注册store
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');