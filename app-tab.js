const homePage = {
  template: '#home',
  props: ['score','itemsbatter','selectOnChange','selectedItem','selectedItem2','show'],
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
            itemsDirection: [
              { text: 'item4', value: 'item4' },
              { text: 'item5', value: 'item5' },
              { text: 'item6', value: 'item6' },
            ],
            selectOnChange: this.fetch,
            selectedItem: this.selectedBatter,
            selectedItem2: this.selectedBatter,
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
      ],
      selectedBatter : 'item2',
      selectedDirection: 'item4',
      show: true
    };
  },
  mounted: function () {
    axios.get("./score.json").then(response => (this.tabs[0].props.score = response.data));
    this.tabs[0].props.selectedItem = 'item2';
    this.tabs[0].props.selectedItem2 = 'item4';
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
