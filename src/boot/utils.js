import Vue from 'vue';
import apis from "../apis";
import exchange from './exchange';
import moment from 'moment';
import XLSX from 'xlsx';
import axios from "axios";
import store from "src/store";

moment.locale("zh_cn");

/**
 * @description: 处理文件
 * @param {Object} file 文件对象
 * @param {function} callback 回调函数
 * @return:
 */
function _file(file, callback) {
  const make_cols = refstr => Array(XLSX.utils.decode_range(refstr).e.c + 1).fill(0).map((x, i) => ({
    name: XLSX.utils.encode_col(i),
    key: i
  }));

  /* Boilerplate to set up FileReader */
  const reader = new FileReader();
  reader.onload = (e) => {
    /* Parse data */
    const wb = XLSX.read(e.target.result, {
        type: 'binary'
      }),
      /* Get first worksheet */
      ws = wb.Sheets[wb.SheetNames[0]],
      /* Convert array of arrays */
      data = XLSX.utils.sheet_to_json(ws, {
        header: 1
      });

    /* Update state */
    callback(data, make_cols(ws['!ref']))

  };
  reader.readAsBinaryString(file);
}

/**
 * @description: 获取map的长度
 * @param {Object} obj map对象
 * @return: map的长度
 */
function getLength(obj) {
  let count = 0;
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      count++;
    }
  }
  return count;
}

const utils = {
  /**
   *
   * @param to 跳转的目标路由
   * @param data 传递的参数
   * @param router 路由对象（App下无效）
   * @param token 携带的token（仅App下有效）
   * @param show 是否展示（仅App下有效）
   * @param showBar 是否展示title bar（仅App下有效）
   */
  pushWindow: (to, data, router, token, show, showBar) => {
    if (!window.JSBridge) {
      router.push({
        path: to,
        query: data
      });
    } else {
      exchange.pushWindow(to, token, data, show, showBar);
    }
  },
  getUserInfo(token) {
    // axios.api('java', '/user/getByToken', {token}); 根据用户token拉取用户数据
    const user = {
      id: 1,
      name: '左慈',
      token
    };

    store.dispatch('updateData', {
      ref: 'authorization',
      entity: user,
      _save: true
    });

    return user;
  },
  /**
   * 日期工具
   */
  dateUtils: {
    /**
     * 格式化时间
     *
     * @param t 时间戳或时间对象
     * @param format 格式化的格式，默认是YYYY/MM/DDTHH:mm:ss
     * @see https://quasar.dev/quasar-utils/date-utils
     * @returns {string}
     */
    format(t, format) {
      if (typeof t == Date) {
        t = t.getTime();
      } else if (typeof t != "number") {
        t = parseInt(t);
      }

      format = format || "YYYY/MM/DDTHH:mm:ss";
      return date.formatDate(t, format);
    },
    /**
     * 格式化时间差
     *
     * @param t 时间戳或时间对象
     * @see http://momentjs.cn/
     * @returns {string}
     */
    from(t) {
      if (typeof t == Date) {
        t = t.getTime();
      } else if (typeof t != "number") {
        t = parseInt(t);
      }

      return moment(t).fromNow();
    }
  },
  /**
   * 正则工具
   */
  regexUtils: {
    /**
     * 弱验证字符串是否符合手机号标准
     *
     * @param t
     * @returns {boolean}
     */
    isPhone(t) {
      return t && /^1[3456789]\d{9}$/.test(t);
    },
    /**
     * 验证字符串是否是URL地址
     *
     * @param t
     * @returns {boolean}
     */
    isUrl(t) {
      return t && /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/g.test(t);
    }
  },
  /**
   * excel工具
   */
  excelUtils: {
    /**
     * @description:
     * @param {Array} items 服务端发过来的数据
     * @param {String} name 导出Excel文件名字
     * @param {Array} titles 导出Excel字段数组,[{prop: 'name', title: '设备名称'}, {...}, ...]
     * @return:
     */
    export(items, name, titles) {
      let data = [], keys = [];

      if (titles && titles.length) {
        keys = titles.map(t => t.title || t.prop || t);
      }

      items.forEach(t => {
        let rows = [];
        if (titles && titles.length) {
          titles.map(k => k.prop || k).forEach(p => {
            rows.push(t.hasOwnProperty(p) ? t[p] : '');
          });
        } else {
          for (const p in t) {
            if (t.hasOwnProperty(p)) {
              rows.push(t[p]);
              if (keys.length < getLength(t)) {
                keys.push(p);
              }
            }
          }
        }
        data.push(rows);
      });

      data.splice(0, 0, keys);
      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
      XLSX.writeFile(wb, name + ".xlsx");
    },
    /**
     * @description: 导入excel文件并返回数据
     * @param {function} callback 回调函数参数data,dataRef,一个是数据，一个是excel表单的索引
     * @return:
     */
    import(callback) {
      var inputObj = document.createElement('input')
      inputObj.setAttribute('id', 'file');
      inputObj.setAttribute('type', 'file');
      inputObj.setAttribute('name', 'file');
      inputObj.setAttribute("style", 'visibility:hidden');
      inputObj.setAttribute("accept", ".xlsx,.xls,.csv")
      inputObj.addEventListener('change', (evt) => {
        const files = evt.target.files;
        if (files && files[0]) _file(files[0], (data, dataRef) => {
          callback(data, dataRef)
        });
      })
      document.body.appendChild(inputObj);
      inputObj.value;
      inputObj.click();
    }
  }
};

Vue.prototype.$apis = apis;
Vue.prototype.$utils = utils;

export default utils;
