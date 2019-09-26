const defaultSelectItem = {
  "itemsBatter" : [
    { text: '----', value: '----' },
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
  "itemsDirection":[
    { text: '----', value: '----' },
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
  "itemsBatterRun":[
    { text: '----', value: '----' },
    { text: '1塁へ', value: '1塁へ' },
    { text: '2塁へ', value: '2塁へ' },
    { text: '3塁へ', value: '3塁へ' },
    { text: '本塁へ', value: '本塁へ' },
    { text: '1塁Out', value: '1塁Out' },
    { text: '2塁Out', value: '2塁Out' },
    { text: '3塁Out', value: '3塁Out' },
    { text: '本塁Out', value: '本塁Out' },
  ],
  "itemsRunner":[
    { text: '----', value: '----' },
    { text: '盗塁', value: '盗塁' },
    { text: 'WP', value: 'WP' },
    { text: 'PB', value: 'PB' },
    { text: '進塁', value: '進塁' },
  ],
  "itemsBase":[
    { text: '----', value: '----' },
    { text: '2塁へ', value: '2塁へ' },
    { text: '3塁へ', value: '3塁へ' },
    { text: '本塁へ', value: '本塁へ' },
  ]
}

const gamePage = Vue.component('game-page', {
  template: '#game',
  data:  ()=> {
      return {
          counter: 0,
          officialValue: false,
          gameName: "",
          opponentName: "",
          fieldName: "",
          selectTopBottom:"top"
        }
  },
  methods: {
    officialChange: function(){
      this.$emit('officialValue')
    },
    onChangeTopBottom: function(){
      this.$emit('selectTopBottom')
    }
  },
})

const offensePage = Vue.component('offense-page', {
  template: '#offense',
  data:  ()=> {
    return {
          score: [],
          itemsBatter: defaultSelectItem.itemsBatter,
          itemsDirection:defaultSelectItem.itemsDirection,
          itemsBatterRun: defaultSelectItem.itemsBatterRun,
          itemsRunner:defaultSelectItem.itemsRunner,
          itemsBase: defaultSelectItem.itemsBase,
          selectedBatterResult: '----',
          selectedBatterDirection: '----',
          selectedBatterRun: '----',
          showSelectedBatterDirection: true,
          showSelectedBatterRun: true,
          selected1stRunner: '----',
          selected2ndRunner: '----',
          selected3rdRunner: '----',
          selected1stBase: '----',
          selected2ndBase: '----',
          selected3rdBase: '----',
          showSelected1stRunner: true,
          showSelected2ndRunner: true,
          showSelected3rdRunner: true
    }
  },
  mounted: function () {
    axios.get("./score.json").then(response => (this.score = response.data));
  },
  methods: {
    selectedOnChangeBatterResult: function(){
      this.itemsBatterRun = defaultSelectItem.itemsBatterRun
      this.itemsDirection = defaultSelectItem.itemsDirection
      this.showSelectedBatterDirection = false
      this.$emit('showSelectedBatterDirection')
      this.$emit('selectedBatterResult')
    },
    selectedOnChangeBatterDirection: function(){
      if(this.selectedBatterResult === "ゴロ")
      {
        this.selectedBatterRun = "1塁Out"
        this.$emit('selectedBatterRun')
      }
      else if(this.selectedBatterResult === "フライ")
      {
        this.selectedBatterRun = "1塁Out"
        this.$emit('selectedBatterRun')
      }
      else if(this.selectedBatterResult === "ヒット")
      {
        this.itemsBatterRun = [
          { text: '1塁へ', value: '1塁へ' },
          { text: '2塁へ', value: '2塁へ' },
          { text: '3塁へ', value: '3塁へ' },
          { text: '本塁へ', value: '本塁へ' },
          { text: '2塁Out', value: '2塁Out' },
          { text: '3塁Out', value: '3塁Out' },
          { text: '本塁Out', value: '本塁Out' },
        ]
        this.selectedBatterRun = "1塁へ"
        this.$emit('selectedBatterRun')
      }
      this.showSelectedBatterRun = false
      this.$emit('showSelectedBatterRun')
      this.$emit('selectedBatterDirection')
    },
    selectedOnChangeBatterRun: function(){
      this.showSelectedBatterRun = false
      this.$emit('showSelectedBatterRun')
      this.$emit('selectedBatterRun')
    },
    selectedOnChangeRunner: function(base){
      console.log(base)
      if(base == '1st')
      {
        this.showSelected1stRunner = false
        this.$emit('showSelected1stRunner')
        this.$emit('selected1stRunner')
      }
      else if(base == '2nd')
      {
        this.showSelected2ndRunner = false
        this.$emit('showSelected2ndRunner')
        this.$emit('selected2ndRunner')
      }
      else if(base == '3rd')
      {
        this.showSelected3rdRunner = false
        this.$emit('showSelected3rdRunner')
        this.$emit('selected3rdRunner')
      }
    },
    getRunnerInfo: function(base){
      // return "test"
      if(this.score != null)
      {
      if(base == '1st' && this.score.runner1st != null){
        return this.score.runner1st.name;
      }else if(base == '2nd' && this.score.runner2nd != null){
        return this.score.runner2nd.name;
      }else if(base == '3rd' && this.score.runner3rd != null){
        return this.score.runner3rd.name;
      }
    }
      return null;
    }
  },
})

const topPage = Vue.component('top-page', {
  template: '#top',
  data:  ()=> {
      return {
          toporder: [],
          itemsPosition:[
            { text: '----', value: '----' },
            { text: 'P', value: 'P' },
            { text: 'C', value: 'C' },
            { text: '1B', value: '1B' },
            { text: '2B', value: '2B' },
            { text: '3B', value: '3B' },
            { text: 'SS', value: 'SS' },
            { text: 'LF', value: 'LF' },
            { text: 'CF', value: 'CF' },
            { text: 'RF', value: 'RF' },
          ],      
          itemsRunner:defaultSelectItem.itemsRunner,
          selectedPosition: '----',
          selectedPosition0: '----',
          selectedPosition1: '----',
          selectedPosition2: '----',
          selectedPosition3: '----',
          selectedPosition4: '----',
          selectedPosition5: '----',
          selectedPosition6: '----',
          selectedPosition7: '----',
          selectedPosition8: '----',
          selectedPosition9: '----',
        }
  },
  mounted: function () {
    axios.get("./toporder.json").then(response => (this.toporder = response.data));
  },
 methods: {
    officialChange: function(){
      this.$emit('officialValue')
    },
    onChangeTopBottom: function(){
      this.$emit('selectTopBottom')
    }
  },
})

const bottomPage = Vue.component('bottom-page', {
  template: '#bottom',
  data:  ()=> {
      return {
          order: [],
          itemsRunner:defaultSelectItem.itemsRunner,
          selected3rdRunner: '----',
        }
  },
  mounted: function () {
    axios.get("./toporder.json").then(response => (this.order = response.data));
  },
 methods: {
    officialChange: function(){
      this.$emit('officialValue')
    },
    onChangeTopBottom: function(){
      this.$emit('selectTopBottom')
    }
  },
})


// ELEMENT.locale(ELEMENT.lang.ja);

var vm = new Vue({
  el: '#app',
  template: '#main',
  data() {
    return {
      activeIndex: 2,
      title: "ScoreBook.mobi 開発版",
      tabs: [
        {
          // icon: this.md() ? null : 'ion-ios-bell',
          label: '試',
          page: gamePage,
          key: "gamePage",
        },
        {
          // icon: this.md() ? null : 'ion-home',
          label: '攻',
          page: offensePage,
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
    };
  },
  mounted: function () {
    // axios.get("./score.json").then(response => (this.tabs[1].props.score = response.data));
    // axios.get("./toporder.json").then(response => (this.tabs[2].props.toporder = response.data));
    // this.tabs[0].props.official = false;
    // // this.tabs[1].props.selectedBatterResult = false;
    // this.tabs[1].props.selectedBatterDirection = this.selectedDirection;
    // this.tabs[1].props.show = true;
    // console.log(this.tabs[1].props.score);
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
