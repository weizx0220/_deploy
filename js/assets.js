/* 插画资源：统一取址。图片按需加载；所有使用方都带缺图回退
   （img 用 onerror 隐藏，CSS background 加载失败则不绘制），无需预探测。 */
var Assets = (function () {
  var DIR = 'assets/chahua/';
  return {
    url: function (name) { return DIR + name.replace(/\.png$/, '.jpg'); },
    DIR: DIR
  };
})();
