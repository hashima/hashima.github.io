const homePage = {
  template: '#home',
  props: ['score','itemsbatter','itemsDirection','selectOnChange','selectedItem','selectedItem2','initselect','show'],
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

var store = {
  debug: true,
  selectedBatter : '----',
  selectedDirection:'----',
  state: {
    message: 'Hello!'
  },
  setSelectedBatter(newValue) {
    if (this.debug) console.log('setMessageAction triggered with', newValue)
    this.selectedBatter = newValue
  },
  setSelectedDirection(newValue) {
    if (this.debug) console.log('clearMessageAction triggered')
    this.selectedDirection = newValue
  }
}

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
              { text: '----', value: '----' },
              { text: 'item1', value: 'item1' },
              { text: 'item2', value: 'item2' },
              { text: 'item3', value: 'item3' },
            ],
            itemsDirection: [
              { text: '----', value: '----' },
              { text: 'item4', value: 'item4' },
              { text: 'item5', value: 'item5' },
              { text: 'item6', value: 'item6' },
            ],
            selectOnChange: this.fetch,
            selectedItem: this.selectedBatter,
            selectedItem2: this.selectedDirection,
            initselect: '----',
            show: this.shown
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
      selectedBatter : '----',
      selectedDirection: '----',
      shown: true,
    };
  },
  mounted: function () {
    axios.get("./score.json").then(response => (this.tabs[0].props.score = response.data));
    this.tabs[0].props.selectedItem = this.selectedBatter;
    this.tabs[0].props.selectedItem2 = this.selectedDirection;
    this.tabs[0].props.show = false;
    console.log("mounted");
  },
  methods: {
    md() {
      return this.$ons.platform.isAndroid();
    },
    fetch: function(e) {
      // alert( store.selectedBatter );
      // store.setSelectedBatter(e.target.value);
      if(e.target.value == "item3")
      {
        this.tabs[0].props.itemsDirection = [
          { text: '----', value: '----' },
          { text: 'item7', value: 'item7' },
          { text: 'item8', value: 'item8' },
          { text: 'item9', value: 'item9' },
        ];
      }
      this.shown = false;
      // this.tabs[0].props.show = false;
    },
    showSelect: function(e) {
      return this.shown;
    }
  },
  computed: {
    title() {
      return this.tabs[this.activeIndex].label;
    },
  }
});
