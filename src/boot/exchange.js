import Vue from 'vue';

const ready = function (callback) {
    console.log("检查mpaas begin", window.JSBridge)
    if (callback) {
      if (window.JSBridge) {
        console.log("检查mpaas 已就绪", window.JSBridge)
        return callback()
      }
      console.log("检查mpaas 未就绪 开始等待", window.JSBridge)
      let checkCount = 0,
        h = setInterval(() => {
          checkCount++
          if (window.JSBridge) {
            console.log("检查mpaas  已就绪", window.JSBridge)
            clearInterval(h)
            callback()
          } else {
            if (checkCount >= 100) {
              clearInterval(h)
              callback()
            }
          }
        }, 20)
    }
  },
  checkDataReady = function (callback) {
    console.log("检查startupParams begin", window.JSBridge.startupParams)
    if (callback) {
      if (Object.keys(window.JSBridge.startupParams).length) {
        console.log("检查startupParams 已就绪", window.JSBridge.startupParams)
        return callback()
      }
      console.log("检查startupParams 未就绪 开始等待", window.JSBridge.startupParams)
      let checkCount = 0,
        h = setInterval(() => {
          checkCount++
          if (Object.keys(window.JSBridge.startupParams).length) {
            console.log("检查startupParams  已就绪", window.JSBridge.startupParams)
            clearInterval(h)
            callback()
          } else {
            // console.log("检查startupParams 未就绪 继续等待 100毫秒后再检查", window.JSBridge.startupParams)
            if (checkCount >= 100) {
              clearInterval(h)
              callback()
            }
          }
        }, 20)
    }
  },
  pushWindow = function (to, token, data, show, showBar) {
    ready(() => {
      let separator = '?';
      if (to.indexOf('?') > -1) {
        separator = '&'
      }
      console.log('to=' + to)
      let origin = window.location.origin,
        url = origin + to + separator + 'token=' + token; // 要打开页面的 URL
      if (to.indexOf('http://') > -1 || to.indexOf('https://') > -1) {
        url = to + separator + 'token=' + token
      }
      console.log('url=' + url)
      let pushData = {
        url: url,
        // 打开页面的配置参数
        param: {
          readTitle: false, //自动读取 title
          showTitleBar: showBar != null ? showBar : true,
          showOptionMenu: show != null ? show : false, // 隐藏右边菜单
          data: data,
        },
        // 用于给新开的页面传递参数，可选
        // 在新开的页面使用 JSBridge.startupParams 可以获取到 passData
        passData: {data: data},
      }
      console.log('pushData=', pushData)
      JSBridge.call('pushWindow', pushData);
    });
  },
  setRightMenu = function (title, color) {
    ready(() => {
      JSBridge.call("setOptionMenu", {
        title: title,
        redDot: -1,
        color: color,
      });
      JSBridge.call('showOptionMenu');
    });
  },
  setRightMenuWithIcon = function (icon) {
    ready(() => {
      JSBridge.call("setOptionMenu", {
        redDot: -1,
        icon: icon
      });
      JSBridge.call('showOptionMenu');
    });
  },
  popWindow = function (data) {
    if (!data) {
      data = {}
    }
    console.log('popWindow', data)
    ready(() => {
      let type = 'popWindow',
        obj = {
          data: data
        }
      if (data.index) {
        type = 'popTo'
        obj.index = data.index
      }

      JSBridge.call(type, {
        index: data.index,
        data: data
      });
    })
  },
  postNotification = function (name, data, announce) {
    console.log('postNotification=' + name)
    this.mpaasReady(() => {
      name = name + "_Notification";
      JSBridge.call("postNotification", {
        name, // H5 发出的事件必须以 NEBULANOTIFY_ 开通进行监听
        data,
        announce
      });
    });
  },
  getPassData = function (callback) {
    this.mpaasReady(() => {
      checkDataReady(() => {
        console.log('JSBridge=', JSBridge.startupParams)
        if (JSBridge.startupParams.passData) {
          let passDataString = JSBridge.startupParams.passData
          if (typeof passDataString == 'string') {
            passDataString = JSON.parse(passDataString)
          }
          if (passDataString) {
            let data = passDataString
            console.log('data.data=', data.data)
            callback(data.data)
          }
        } else if (JSBridge.startupParams.data) {
          let passDataString = JSBridge.startupParams.data
          if (passDataString && passDataString.length > 0) {
            let data = passDataString
            if (typeof passDataString == 'string') {
              data = JSON.parse(passDataString)
            }
            this.mpaasPostNotification('clearStartup', {})
            callback(data)
          } else {
            callback({})
          }
        } else {
          callback({})
        }
      })
    })
  },
  setTitle = function (title) {
    this.mpaasReady(() => {
      JSBridge.call('setTitle', {
        title: title,
      });
    })
  };

Vue.prototype.mpaasReady = ready
Vue.prototype.mpaasPushWindow = pushWindow
Vue.prototype.mpaasSetRightMenu = setRightMenu
Vue.prototype.mpaasPopWindow = popWindow
Vue.prototype.mpaasSetRightMenuWithIcon = setRightMenuWithIcon
Vue.prototype.mpaasPostNotification = postNotification
Vue.prototype.mpaasGetPassData = getPassData
Vue.prototype.mpaasSetTitle = setTitle

const exchange = {ready, pushWindow, setTitle, setRightMenu, setRightMenuWithIcon, popWindow, postNotification, getPassData};

export default exchange;
