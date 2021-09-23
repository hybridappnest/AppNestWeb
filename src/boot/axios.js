import Vue from 'vue';
import axios from 'axios';
import store from '../store';
import utils from "./utils";

const
  /**
   * 部署平台，public公共环境，其他私有化环境请自行命名
   *
   */
  platform = "public",
  /**
   * 当前环境。可选环境包括开发(dev)、测试(test)、生成(prod)三种。
   */
  env = "dev",
  /**
   * 资源基础URL
   */
  rest = {
    public: {
      dev: {
        java: "http://0.0.0.0:8080/api", // 如果项目同时从多个不同的服务端拉取数据，都可以配置在这里
        node: "http://0.0.0.0:8081",
        // ...
      }
    }
  },
  /**
   * 请求服务端资源
   *
   * @param channel 资源识别符，即环境中的java、node等不同服务端资源名称
   * @param uri 资源路由
   * @param payload 数据参数
   * @param opt 配置项
   * @param raw 透传标志
   * @returns {Promise}
   */
  api = (channel, uri, payload, opt, raw) => {
    let url;

    if (channel && uri) {
      if (!utils.regexUtils.isUrl(uri)) {
        url = rest[platform][env][channel] + uri;
      } else {
        url = uri;
      }
    }

    return restapi(url, payload, opt, raw);
  },
  /**
   * 请求restful资源
   *
   * @param url 资源全路由
   * @param payload 数据载荷
   * @param opt 配置项
   * @param raw 透传标志
   * @returns {Promise}
   */
  restapi = (url, payload, opt, raw) => {
    let method = (payload && payload.dbxMethod) || (opt && opt.dbxMethod) || 'post';

    return new Promise((resolve, reject) => {
      url = url.trim();

      if (!url || !url.length) {
        reject("url is missing");
      }

      if (!utils.regexUtils.isUrl(url)) {
        reject("url:" + url + " is invalid");
      }

      if (!rest[platform][env]) {
        reject("invalid runtime environment code - " + env);
      }

      console.log("请求开始 => ", url, payload, opt, raw);

      axios[method](url, payload, opt).then(res => {
        console.log("请求结束 => ", res);
        if (raw) {
          resolve(res);
        } else {
          resolve(res && res.data);
        }
      }).catch(e => {
        console.error("请求失败 => ", e);
        if (payload && payload.deleted) {
          resolve("删除成功");
        }
        if (e && e.response) {
          if (e.response.status == 401) {
            reject('没有权限访问，请检查TOKEN是否正确');
          } else {
            reject(e.response);
          }
        }
        reject(e);
      })
    });
  };

/**
 * 前置拦截器，组装url以及x-access-token
 */
axios.interceptors.request.use(async config => {
  let token = store.getters.authentication;
  console.log("请求的token", token);

  if (config.url.startsWith("/pc") && baseUrl) {
    config.url = baseUrl + config.url.substr(3);
  }

  if (config.url.startsWith("/train") && baseUrl) {
    config.url = trainUrl + config.url.substr(6);
  }

  if (token && token.length) {
    config.headers["nest-access-token"] = token;
  }
  config.headers['Content-Type'] = 'application/json;charset=UTF-8';

  return config;
}, err => {
  console.error(err);
  return Promise.reject(err);
});

/**
 * 后置拦截器，用以处理401错误及拦截TOKEN
 */
axios.interceptors.response.use(resp => {
  console.log("resp => ", resp);

  if (resp && resp.headers && resp.headers['x-access-token']) {
    store.dispatch("updateData", {
      ref: "authentication",
      entity: resp.headers['nest-access-token'],
      _save: true
    }).then(res => {
      console.log("TOKEN保存成功");
    }).catch(e => {
      console.error(e);
    });
  }

  if ((resp.status == 401) || (resp.data && resp.data.code == 401)) {
    store.dispatch("logout");
    this.$router.push({path: '/login'});
  }

  return resp;
});

Vue.prototype.$axios = Object.assign(axios, {
  platform,
  env,
  api,
  restapi
});
Vue.prototype.$resource = rest[platform][env];
Vue.prototype.env = {
  platform: platform,
  cur_env: env
};
Vue.prototype.$api = api;
Vue.prototype.$restapi = restapi;
