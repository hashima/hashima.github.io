const homePage = {
  template: '#home',
  props: ['score','itemsbatter','selectedItemBatter'],
  methods: {
    fetchBatter(event) {
      vm.fetchBatter();
    },
    // onChangeEvent(e){
    //   alert(this.tabs[0].props.score);
    // },
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
      tabs: [
        {
          icon: this.md() ? null : 'ion-home',
          label: 'Home',
          page: homePage,
          props: {
            score: [],
            itemsbatter: [
              { text: '結果', value: '結果' },
              { text: 'item1', value: 'item1' },
              { text: 'item2', value: 'item2' },
              { text: 'item3', value: 'item3' },
            ],
            selectedItemBatter: 'item2',
          },
          // methods: {
          //   fetchBatter: function() {
          //     alert(this.tabs[0].props.selectedItemBatter);
          //   },
          // },
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
    // fetchBatter: function() {
    //   alert(this.tabs[0].props.selectedItemBatter);
    // },
  },
  computed: {
    title() {
      return this.tabs[this.activeIndex].label;
    }
  }
});