const homePage = {
  template: '#home',
  props: ['score','itemsbatter','selectedItemBatter'],
  methods: {
    fetchBatter() {
      vm.fetchBatter();
    },
    onChangeEvent(e){
      alert(this.selecData);
    },
  }
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
      selecData = this.tabs[0].props.selectedItemBatter,
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
            ],
            selectedItemBatter: 'フライ',
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
      alert(this.tabs[0].props.selectedItemBatter);
    },
  },
  computed: {
    title() {
      return this.tabs[this.activeIndex].label;
    }
  }
});