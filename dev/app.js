const gamePage = {
  template: '#game',
  props: ['official',
          'officialLabel',
          'gameName',
          'opponentName',
          'fieldName',
          'gamedate',
   ],
    };

const offensePage = {
  template: '#offense',
  props: ['score',
          'itemsBatter',
          'itemsDirection',
          'itemsBatterRun',
          'itemsRunner',
          'itemsBase',
          'itemsBatterRun',
          'selectedBatterResult',
          'selectedBatterDirection',
          'selectedBatterRun',
          'selectedOnChangeBatterResult',
          'selectedOnChangeBatterDirection',
          'selectedOnChangeBatterRun',
          'showSelectedBatterDirection',
          'showSelectedBatterRun',
          'selected1stRunner',
          'selected2ndRunner',
          'selected3rdRunner',
          'selected1stBase',
          'selected2ndBase',
          'selected3rdBase',
        ],
 };

const topPage = {
  template: '#top',
  props: ['toporder',
        ],
};

const bottomPage = {
  template: '#bottom'
};

// ELEMENT.locale(ELEMENT.lang.ja);

var vm = new Vue({
  el: '#app',
  template: '#main',
  data() {
    return {
      activeIndex: 1,
      title: "ScoreBook.mobi 開発版",
      tabs: [
        {
          // icon: this.md() ? null : 'ion-ios-bell',
          label: '試',
          page: gamePage,
          key: "gamePage",
          props: {
            official: false,
            officialLabel: "公式戦",

          },
        },
        {
          // icon: this.md() ? null : 'ion-home',
          label: '攻',
          page: offensePage,
          props: {
            score: [],
            itemsBatter: [
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
              { text: '方向', value: '方向' },
              { text: 'P', value: 'P' },
              { text: 'C', value: 'C' },
              { text: '1B', value: '1B' },
              { text: '2B', value: '2B' },
              { text: '3B', value: '3B' },
              { text: 'SS', value: 'SS' },
              { text: 'LF', value: 'LF' },
              { text: 'CF', value: 'CF' },
              { text: 'RF', value: 'RF' },
              { text: 'LF-CF', value: 'LF-CF' },
              { text: 'CF-RF', value: 'CF-RF' },
            ],
            itemsBatterRun: [
              { text: '--', value: '--' },
              { text: '1塁へ', value: '1塁へ' },
              { text: '2塁へ', value: '2塁へ' },
              { text: '3塁へ', value: '3塁へ' },
              { text: '本塁へ', value: '本塁へ' },
            ],
            selectedOnChangeBatterResult: this.fetch,
            selectedOnChangeBatterDirection: this.fetch,
            selectedOnChangeBatterRun: this.fetch,
            selectedBatterResult: this.selectedBatterResult,
            selectedBatterDirection: this.selectedDirection,
            selectedBatterRun: this.selectedDirection,
            showSelectedBatterDirection: this.shown,
            showSelectedBatterRun: this.shown,
            itemsRunner: [
              { text: '結果', value: '結果' },
              { text: '盗塁', value: '盗塁' },
              { text: 'WP', value: 'WP' },
              { text: 'PB', value: 'PB' },
              { text: '進塁', value: '進塁' },
            ],
            itemsBase: [
              { text: '--', value: '--' },
              { text: '2塁へ', value: '2塁へ' },
              { text: '3塁へ', value: '3塁へ' },
              { text: '本塁へ', value: '本塁へ' },
            ],
          },
          key: "offensePage"
        },
        {
          // icon: this.md() ? null : 'ion-ios-bell',
          label: '先',
          page: topPage,
          key: "topPage",
          props: {
            toporder: [],
          }
        },
        {
          // icon: this.md() ? null : 'ion-ios-settings',
          label: '後',
          page: bottomPage,
          key: "bottomPage"
        }
      ],
      selectedBatterResult : '----',
      selectedDirection: '----',
      shown: true,
    };
  },
  mounted: function () {
    axios.get("./score.json").then(response => (this.tabs[1].props.score = response.data));
    axios.get("./toporder.json").then(response => (this.tabs[2].props.toporder = response.data));
    this.tabs[1].props.selectedBatterResult = this.selectedBatterResult;
    this.tabs[1].props.selectedBatterDirection = this.selectedDirection;
    this.tabs[1].props.show = true;
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
    }
  },
  computed: {
    // title() {
    //   return this.tabs[this.activeIndex].label;
    // },
  }
});
