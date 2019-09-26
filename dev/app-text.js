
var vm = new Vue({
  el: '#app',
  template: '#main',
  data() {
    return {
      activeIndex: 1,
      title: "ScoreBook.mobi 開発版",
      textData: [],
    };
  },
  mounted: function () {
    axios.get("./text.json").then(response => (this.textData = response.data));
    // console.log(this.tabs[1].props.score);
  },
  methods: {
    loadItem(done) {
      setTimeout(() => {
        axios.get("./text.json").then(response => (this.textData = response.data));
        done();
      }, 400);
      this.$forceUpdate();
    },
      md() {
      return this.$ons.platform.isAndroid();
    },
  },
  computed: {
    // title() {
    //   return this.tabs[this.activeIndex].label;
    // },
  }
});
