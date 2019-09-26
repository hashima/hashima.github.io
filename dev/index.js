var vm = new Vue({
  el: '#app',
  template: '#main',
  data() {
    return {
      title: "ScoreBook.mobi 開発版",
    };
  },
  methods: {
    md() {
      return this.$ons.platform.isAndroid();
    },
    gotosite: function(url) {
      window.location.href = url;
    }
  }
});
