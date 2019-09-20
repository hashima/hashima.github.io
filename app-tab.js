const homePage = {
  template: '#home',
  props: ['score','itemsbatter','selectChange'],
    // onChangeEvent(e){
    //   alert(this.tabs[0].props.score);
    // },
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
              { text: 'item1', value: 'item1' },
              { text: 'item2', value: 'item2' },
              { text: 'item3', value: 'item3' },
            ],
            selectChange: this.fetch,
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
    fetch: function(e) {
      alert( e.target.value);
    },
  },
  computed: {
    title() {
      return this.tabs[this.activeIndex].label;
    }
  }
});
