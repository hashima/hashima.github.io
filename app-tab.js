const homePage = {
  template: '#home',
  props: ['score','itemsbatter',"selectedItemBatter"]
};

const newsPage = {
  template: '#news'
};

const settingsPage = {
  template: '#settings'
};

var vm = new Vue({
  el: '#app',
  template: '#main',
  data() {
    return {
      activeIndex: 0,
      tabs: [
        {
          icon: this.md() ? null : 'ion-home',
          label: 'Home',
          page: homePage,
          props: {
            score: [],
            itemsbatter: [
              { text: '結果', value: '結果' },
              { text: 'ゴロ', value: 'ゴロ' },
              { text: 'フライ', value: 'フライ' },
              { text: '三振', value: '三振' },
              { text: 'ヒット', value: 'ヒット' },
              { text: '犠打', value: '犠打' },
              { text: '犠飛', value: '犠飛' },
              { text: '四球', value: '四球' },
              { text: '死球', value: '死球' },
              { text: '2塁打', value: '2塁打' },
              { text: '3塁打', value: '3塁打' },
              { text: '本塁打', value: '本塁打' },
              { text: 'エラー', value: 'エラー' },
            ],
            selectedItemBatter: '結果',

          },
          key: "homePage"
        },
        {
          icon: this.md() ? null : 'ion-ios-bell',
          label: 'News',
          page: newsPage,
          key: "newsPage"
        },
        {
          icon: this.md() ? null : 'ion-ios-settings',
          label: 'Settings',
          page: settingsPage,
          key: "settingsPage"
        }
      ]
    };
  },
  mounted: function () {
    axios.get("./score.json").then(response => (this.tabs[0].props.score = response.data))
  },
  methods: {
    md() {
      return this.$ons.platform.isAndroid();
    },
    fetchBatter: function() {
      alert(this.selectedItemBatter);
    },
  },
  computed: {
    title() {
      return this.tabs[this.activeIndex].label;
    }
  }
});