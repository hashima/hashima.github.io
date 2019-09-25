// 子コンポーネント
Vue.component('button-counter', {
  template: `
  <button v-on:click="increChild">{{ counter }}
  </button>
  `,
  data:  ()=> {
      return {
          counter: 0
      }
  },
  methods: {
      increChild: function () {
          this.counter += 1
          this.$emit('increment')
      }
  },
})

// 親コンポーネント
new Vue({
  el: '#main',
  data: {
      total: 0
  },
  methods: {
      increParent: function () {
          this.total += 1
      }
  }
})