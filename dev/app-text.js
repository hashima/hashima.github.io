
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
    console.log(this.tabs[1].props.score);
  },
  methods: {
    md() {
      return this.$ons.platform.isAndroid();
    },
    fetch: function(e) {
     if(e.target.value == "item3")
      {
        this.tabs[0].props.itemsDirection = [
          { text: '----', value: '----' },
          { text: 'item7', value: 'item7' },
          { text: 'item8', value: 'item8' },
          { text: 'item9', value: 'item9' },
        ];
      }
      // this.shown = false;
      // this.tabs[0].props.show = false;
    },
    showSelect: function(e) {
      return this.shown;
    },
    fetch2: function(e) {
    },
    setOfficial: function(e) {
      this.official = e.target.value;
    }
  },
  computed: {
    // title() {
    //   return this.tabs[this.activeIndex].label;
    // },
  }
});
