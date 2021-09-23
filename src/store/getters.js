import {LocalStorage} from "quasar";

/**
 * 获取全局变量
 *
 * @param prop
 * @param state
 * @param defaultValue
 * @returns {*|string}
 */
function getGlobalValue(prop, state, defaultValue) {
  const
    fetchCookie = name => {
      name = name + "=";
      let cookies = document.cookie.split(';');
      if (cookies && cookies.length) {
        let cookie = cookies.find(c => c.startsWith(name));
        if (cookie) {
          return cookie.substring(name.length);
        }
      }
      return "";
    },
    fetchQuery = () => {
      let query = location.search.substring(1);
      if (query) {
        return JSON.parse('{"' + query.replace(/&+/g, '&').replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) {
          return key === "" ? value : decodeURIComponent(value);
        })
      }
      return {};
    };

  let v = fetchCookie(prop); // 尝试从cookie中获取
  if (v) {
    return v;
  }

  v = window["envs"] && window["envs"][prop]; // 尝试从window对象中获取（App注入）
  if (v) {
    return v;
  }

  v = fetchQuery[prop]; // 尝试从URL中获取
  if (v) {
    return v;
  }

  v = LocalStorage.getItem(prop); // 尝试从本地LocalStorage中获取
  if (v) {
    return v;
  }

  v = state && state[prop]; // 尝试从Vuex中获取
  if (v || v == '') {
    return v;
  }

  return defaultValue; // 返回默认值
}

/**
 * 当前是否是App环境
 *
 * @param state
 * @returns {boolean}
 */
export function isApp(state) {
  return !!window.JSBridge;
}

/**
 * 当前授权主体（用户）
 *
 * @param state
 * @returns {*|string}
 */
export function authorization(state) {
  return getGlobalValue('authorization', state);
}

/**
 * 当前授权凭证（Token）
 *
 * @param state
 * @returns {*|string}
 */
export function authentication(state) {
  return getGlobalValue('authentication', state);
}

/**
 * 待跳转的目标
 *
 * @param state
 * @returns {*}
 */
export function target(state) {
  return state.target;
}
