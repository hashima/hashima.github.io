
var vm = new Vue({
  el: '#app',
  template: '#main',
  data() {
    return {
      activeIndex: 1,
      title: "ScoreBook.mobi 開発版",
      selectedBatterResult : '----',
      selectedDirection: '----',
      textData: [],
    };
  },
  mounted: function () {
    axios.get("./text.json").then(response => (this.textData = response.data));
    // console.log(this.tabs[1].props.score);
  },
  methods: {
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
