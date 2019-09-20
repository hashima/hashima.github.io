const homePage = {
  template: '#home',
  props: ['score','itemsbatter','itemsDirection','selectedOnChangeBatter','selectOnChange2','selectedItem','selectedItem2','initselect','show'],
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
      title: "ScoreBook.mobi",
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
            itemsDirection: [
                    { text: '----', value: '----' },
                    { text: 'item4', value: 'item4' },
                    { text: 'item5', value: 'item5' },
                    { text: 'item6', value: 'item6' },
            ],
            selectedOnChangeBatter: this.fetch,
            selectOnChange2: this.fetch2,
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
    this.tabs[0].props.show = true;
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
      // this.shown = false;
      // this.tabs[0].props.show = false;
    },
    showSelect: function(e) {
      return this.shown;
    },
    fetch2: function(e) {
    }
  },
  computed: {
    // title() {
    //   return this.tabs[this.activeIndex].label;
    // },
  }
});
