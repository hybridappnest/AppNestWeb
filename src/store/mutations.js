import Vue from 'vue';
import {LocalStorage} from 'quasar';

/**
 * 更新对象
 *
 * @param state
 * @param data
 */
export function updateData(state, data) {
  if (!data || !data.ref) {
    return;
  }

  console.log("缓存数据...", data);

  Vue.set(state, data.ref, data.entity);

  if (data._save) {
    if (data.entity) {
      LocalStorage.set(data.ref, data.entity)
    } else {
      LocalStorage.remove(data.ref);
    }
  }
}

/**
 * 更新属性
 *
 * @param state
 * @param property
 */
export function updateProperty(state, property) {
  if (!property || !property.master || !property.ref) {
    return;
  }

  if (!property.entity) {
    delete state[property.master][property.ref];
  } else {
    Vue.set(state[property.master], property.ref, property.entity);
  }

  if (LocalStorage.has(property.master)) {
    LocalStorage.set(property.master, state[property.master]);
  }
}
