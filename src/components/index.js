import Vue from 'vue'
import Find from './Find/Find.vue'

const Components = {
    Find
}

Object.keys(Components).forEach(name => {
    Vue.component(name, Components[name])
})

export default Components
