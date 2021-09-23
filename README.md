# AppNestWeb(WebApp快速开发框架)
AppNestWeb是基于vuejs及Quasar(ver 1.x)开源项目开发的WebApp快速开发框架，支持配合AppNest下的App外壳快速构建高性能hybrid项目。

## 框架简介
AppNestWeb主要提供两种能力：
1. 在 Quasar 框架基础上作二次封装，默认集成了vuex、vue-router、vue-i18n等插件能力，提供丰富的样式定义，增加了页面登录校验、统一的vuex数据管理方案等。 项目本身也可以直接通过 Quasar CLI 管理。
2. 提供AppNest的App外壳的数据交互能力，包含适配hybrid app所需的基础功能，提供预定义的API接口，支持通过App外壳直接调用源生API。

有关Quasar框架的基础能力，请参阅 https://v1.quasar.dev/ 。

## Quickstart
1. 将项目下载到本地，安装 Quasar CLI 环境。
   ```bash
   npm install -g @quasar/cli
   ```
2. 定位到项目所在目录，安装项目依赖。
   ```bash
   npm install
   ```
3. 本地启动项目。
   ```bash
   quasar dev
   ```
如果开发完成后需要打包发布，可以执行`quasar build`命令进行打包。

## 目录结构
```
.
├── README.md // 说明文档
├── quasar.conf.js // 项目配置文件
└── src
     ├── apis // 目前支持的源生App接口
     ├── assets // 静态资源文件
     ├── boot // 项目启动加载的工具库
          ├── axios.js // axios封装
          ├── exchange.js // 通信库
          ├── i18n.js // 国际化
          └── utils.js // 工具库
     ├── components // 组件
     ├── css
          ├── app.scss // 自定义样式
          └── quasar.variables.scss // 样式常量，修改后全局生效
     ├── i18n // 国际化资源
     ├── layouts // 布局
     ├── pages // 页面
     ├── router // vue-router封装
     ├── store // vuex
     ├── template // 内置页面开发模板
     ├── App.vue
     └── index.template.html
```
有关`quasar.conf.js`的更多选项，请参考 https://v1.quasar.dev/quasar-cli/quasar-conf-js#introduction 。

## JSBridge
AppNest项目中，App和Web之间通过App壳在启动阶段注入的`JSBridge`对象进行数据交换。该对象可以在代码中通过`window.JSBridge`访问。 
1. 运行环境判断

   开发者可以通过`if(window.JSBridge)`判断当前是否处于App壳中。

   该方法仅支持判断Web应用是否运行于AppNest的App壳内。如果是通过其他框架实现的hybrid app，可以通过Quasar自带的环境判断参数判断当前环境。

   | class                 | 简介                                |
   |-----------------------|:----------------------------------|
   | desktop-only          | 仅PC可见（含浏览器、桌面应用）                  |
   | mobile-only           | 仅移动设备可见（含App、浏览器）                 |
   | native-mobile-only    | 仅基于Cordova/Capacitor的hybrid app可见 |
   | cordova-only          | 仅基于Cordova的hybrid app可见           |
   | capacitor-only        | 仅基于Capacitor的hybrid app可见         |
   | electron-only         | 仅基于Electron的桌面应用可见                |
   | touch-only            | 仅可触控设备可见                          |
   | platform-ios-only     | 仅iOS平台可见                          |
   | platform-android-only | 仅Android可见                        |
   | within-iframe-only    | 仅当当前页面在iframe控件中可见                |

   对应的还有`*-hide`（如`desktop-hide`、`mobile-hide`等）系列class可以控制在指定平台隐藏。

2. API

   JSBridge提供了丰富的API，方便开发人员控制Web页面在App中的表现。
    * mpaasReady

      JSBridge注入完成回调。调用时，如果JSBridge尚未就绪，会进行短暂的等待。
      示例代码:
      ```javascript
      this.mpaasReady(() => {
        console.log('JSBridge ready');
      });
      ```
    * mpaasPushWindow

      允许开发者打开新的App窗口展示目标页面，而不是直接经过Web路由跳转。这么做的好处是可以同步App的返回按钮，不至于点击返回按钮时退出整个Web应用。
      ```javascript
      this.mpaasPushWindow(path, token, data, showOptionBar, showTitleBar);
      ```
      AppNestWeb项目中内置了适配不同环境下的页面路由跳转，用可以直接调用。
      ```javascript
      this.$utils.pushWindow(path, data, this.$router, token, showOptionBar, showTitleBar);
      ```
      此时，Web会根据当前场景选择合适的跳转方式。
    * mpaasPostNotification

      向App推送数据，或调起源生API。详情参见“调用源生API”。
    * mpaasSetTitle

      设置Web页面标题。

3. 调用源生API

   AppNest项目中，App和Web之间通过App壳在启动阶段注入的JSBridge对象进行数据交换。开发者需要在页面中按约定的配置请求App。若需要接收回调数据，还需要在页面注册事件监听。

   开发者可以通过JSBridge的`mpaasPostNotification`函数调用，该函数包含三个参数，分别是`name`（行为）、`data`（配置参数）、`announce`（随机数）.
   ```javascript
   this.mpaasPostNotification(
        'choseImg',
        {
            needVideo: false,
            maxnum: 1
        },
        Math.floor(Math.random() * 10000)
   )
   ```
   App拍摄或选择完成后，会发出一个`choseImgCallback`的事件，并携带返回的数据。开发者需在页面上添加相关的事件监听。
   ```javascript
   // 定义回调方法
   window.choseImgCallback = data => {};
   // 注册事件监听
   document.addEventListener('choseImgCallback', evt => {
        let {data} = evt;
        if (!data || !data.announce) {
            return;
        }
        window.choseImgCallback(data);
    }, false);

    export default {
        ...,
        methods:{
            ...,
            choseImgCallback(data){
                // Do something ...
            }
        },
        mounted(){
            // DOM初始化完成后加载回调函数
            window.choseImgCallback = this.choseImgCallback;
        }
    }
   ```
   如此就完成了一个简单的交互接口。目前支持的API接口有`choseFile`（选择文件）、`choseImg`（选择或拍摄照片、视频）、`upload`（上传文件）、`socialLogin`（社会化登录）、`scan`（扫描二维码）等，未来还会进一步扩充。

## 易用性

### Vuex
为了方便读写缓存，项目中封装了一写通用的action方法，分别是`updateData`和`updateProperty`两个数据写入/更新方法，和`getGlobalValue`一个读取方法。其中，读取方法无需手动调用，开发者在getters中直接处理就可以，例如：
```javascript
/**
 * 当前授权主体（用户）
 *
 * @param state
 * @returns {*|string}
 */
export function authorization(state) {
  return getGlobalValue('authorization', state);
}
```
`updateData`和`updateProperty`的区别在于前者更新数据对象本身，后者只更新数据中的某个属性。`updateData`方法接受一个对象参数，该对象需要至少具备以下属性：
```javascript
{
    ref: 'authorization', // 待更新的对象名称
    entity: {}, // 对象
    _save: true // 如果该字段为true，则对象会被序列化到localstorage中
}
```
`updateProperty`方法也是接受一个对象参数，该对象包含以下属性:
```javascript
{
    master: 'authorization', // 待更新的对象名称
    ref: 'name', // 待更新的对象属性名称d
    entity: {} // 对象
}
```
Quasar提供了便捷的LocalStorage插件方便开发人员管理本地缓存。

### Axios
AppNestWeb在原Axios基础上封装了多平台、多环境、多服务端的支持。详情请参考`src/boot/axios.js`文件中的注释。

### Vue-router
在浏览器环境下，页面需要拦截用户是否登录。
```javascript
router.beforeEach((to, from, next) => {
  let user = store.getters.authorization, isApp = store.getters.isApp;
  console.log(user);
  if (!to.meta || !to.meta.restrict || (user && user.id) || isApp) {
    next();
  } else {
    store.dispatch("updateData", {
      ref: 'target',
      entity: to
    });
    next({
      name: 'login'
    });
  }
});
```
注意，vue-router只在浏览器环境下生效。在App环境下，页面跳转时会被添加token字段，页面在初始化时（`created()`方法）会自动根据token拉取用户信息。

## LICENSE
Apache License Version 2.0
