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
    { text: 'ボーク', value: 'ボーク' },
  ],
  "itemsBase":[
    { text: '----', value: '----' },
    { text: '2塁へ', value: '2塁へ' },
    { text: '3塁へ', value: '3塁へ' },
    { text: '本塁へ', value: '本塁へ' },
    { text: '2塁Out', value: '2塁Out' },
    { text: '3塁Out', value: '3塁Out' },
    { text: '本塁Out', value: '本塁Out' },
  ],
  "itemsBase2":[
    { text: '----', value: '----' },
    { text: '3塁へ', value: '3塁へ' },
    { text: '本塁へ', value: '本塁へ' },
    { text: '3塁Out', value: '3塁Out' },
    { text: '本塁Out', value: '本塁Out' },
  ],
  "itemsBase3":[
    { text: '----', value: '----' },
    { text: '本塁へ', value: '本塁へ' },
    { text: '本塁Out', value: '本塁Out' },
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
          itemsBase2: defaultSelectItem.itemsBase2,
          itemsBase3: defaultSelectItem.itemsBase3,
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
          showSelected1stRunner: false,
          showSelected2ndRunner: false,
          showSelected3rdRunner: false,
          showSelected1stRunnerBase: true,
          showSelected2ndRunnerBase: true,
          showSelected3rdRunnerBase: true
    }
  },
  mounted: function () {
    axios.get("./score.json").then(response => (this.score = response.data));
  },
  methods: {
    selectedOnChangeBatterResult: function(){
      if(this.selectedBatterResult === "----")
      {
        this.selectedBatterRun = "----"
        this.showSelectedBatterRun = true
        this.showSelectedBatterDirection = true
        this.$emit('selectedBatterRun')
        this.resetRunner();
      }
      else if(this.selectedBatterResult === "ゴロ")
      {
        this.selectedBatterRun = "1塁Out"
        this.showSelectedBatterRun = true
        this.$emit('selectedBatterRun')
        this.showSelectedBatterDirection = false
        this.resetRunner();
        this.advanceForce();
      }
      else if(this.selectedBatterResult === "フライ")
      {
        this.selectedBatterRun = "1塁Out"
        this.showSelectedBatterRun = true
        this.$emit('selectedBatterRun')
        this.showSelectedBatterDirection = false
        this.resetRunner();
      }
      else if(this.selectedBatterResult === "三振")
      {
        this.selectedBatterRun = "----"
        this.selectedBatterDirection = "----"
        this.showSelectedBatterDirection = true
        this.showSelectedBatterRun = true
        this.resetRunner();
      }
      else if(this.selectedBatterResult === "犠打")
      {
        this.selectedBatterRun = "1塁Out"
        this.showSelectedBatterRun = true
        this.$emit('selectedBatterRun')
        this.showSelectedBatterDirection = false
        this.advance(1);
      }
      else if(this.selectedBatterResult === "犠飛")
      {
        this.selectedBatterRun = "1塁Out"
        this.showSelectedBatterRun = true
        this.showSelectedBatterDirection = false
        this.$emit('selectedBatterRun')
        this.advance(1);
      }
      else if(this.selectedBatterResult === "四球")
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
        this.selectedOnChangeBatterRun()
        this.showSelectedBatterRun = false
        this.showSelected1stRunner = true;
        this.showSelected2ndRunner = true;
        this.showSelected3rdRunner = true;
      }
      else if(this.selectedBatterResult === "死球")
      {
        this.selectedBatterRun = "1塁へ"
        this.$emit('selectedBatterRun')
        this.selectedOnChangeBatterRun()
        this.showSelectedBatterRun = true
        this.showSelected1stRunner = true;
        this.showSelected2ndRunner = true;
        this.showSelected3rdRunner = true;
        this.showSelected1stRunnerBase = true;
        this.showSelected2ndRunnerBase = true;
        this.showSelected3rdRunnerBase = true;
      }
      else if(this.selectedBatterResult === "ヒット")
      {
        this.selectedBatterRun = "1塁へ"
        this.$emit('selectedBatterRun')
        this.showSelectedBatterDirection = false
        this.$emit('showSelectedBatterDirection')
        this.selectedOnChangeBatterRun()
        this.showSelected1stRunner = true;
        this.showSelected2ndRunner = true;
        this.showSelected3rdRunner = true;
        this.showSelected1stRunnerBase = false;
        this.showSelected2ndRunnerBase = false;
        this.showSelected3rdRunnerBase = false;
      }
      else if(this.selectedBatterResult === "2塁打")
      {
        this.selectedBatterRun = "2塁へ"
        this.$emit('selectedBatterRun')
        this.showSelectedBatterDirection = false
        this.$emit('showSelectedBatterDirection')
        this.selectedOnChangeBatterRun()
        this.showSelected1stRunner = true;
        this.showSelected2ndRunner = true;
        this.showSelected3rdRunner = true;
        this.showSelected1stRunnerBase = false;
        this.showSelected2ndRunnerBase = false;
        this.showSelected3rdRunnerBase = false;
      }
      else if(this.selectedBatterResult === "3塁打")
      {
        this.selectedBatterRun = "3塁へ"
        this.$emit('selectedBatterRun')
        this.showSelectedBatterDirection = false
        this.$emit('showSelectedBatterDirection')
        this.selectedOnChangeBatterRun()
        this.showSelected1stRunner = true;
        this.showSelected2ndRunner = true;
        this.showSelected3rdRunner = true;
        this.showSelected1stRunnerBase = false;
        this.showSelected2ndRunnerBase = false;
        this.showSelected3rdRunnerBase = false;
      }
      else if(this.selectedBatterResult === "本塁打")
      {
        this.selectedBatterRun = "本塁へ"
        this.$emit('selectedBatterRun')
        this.showSelectedBatterDirection = false
        this.$emit('showSelectedBatterDirection')
        this.selectedOnChangeBatterRun()
        this.showSelected1stRunner = true;
        this.showSelected2ndRunner = true;
        this.showSelected3rdRunner = true;
        this.showSelected1stRunnerBase = false;
        this.showSelected2ndRunnerBase = false;
        this.showSelected3rdRunnerBase = false;
      }
      else if(this.selectedBatterResult === "エラー")
      {
        this.selectedBatterRun = "1塁へ"
        this.$emit('selectedBatterRun')
        this.showSelectedBatterDirection = false
        this.$emit('showSelectedBatterDirection')
        this.selectedOnChangeBatterRun()
        this.showSelected1stRunner = true;
        this.showSelected2ndRunner = true;
        this.showSelected3rdRunner = true;
        this.showSelected1stRunnerBase = false;
        this.showSelected2ndRunnerBase = false;
        this.showSelected3rdRunnerBase = false;
      }
     else
      {
        this.itemsBatterRun = defaultSelectItem.itemsBatterRun
        this.itemsDirection = defaultSelectItem.itemsDirection
        this.showSelectedBatterDirection = false
        this.$emit('showSelectedBatterDirection')
        this.$emit('selectedBatterResult')
      }
    },
    selectedOnChangeBatterDirection: function(){
      if(this.selectedBatterResult === "ヒット")
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
        this.selectedOnChangeBatterRun()
        this.showSelectedBatterRun = false
      }
      else if(this.selectedBatterResult === "2塁打")
      {
        this.itemsBatterRun = [
          { text: '2塁へ', value: '2塁へ' },
          { text: '3塁へ', value: '3塁へ' },
          { text: '本塁へ', value: '本塁へ' },
          { text: '3塁Out', value: '3塁Out' },
          { text: '本塁Out', value: '本塁Out' },
        ]
        this.selectedBatterRun = "2塁へ"
        this.$emit('selectedBatterRun')
        this.selectedOnChangeBatterRun()
        this.showSelectedBatterRun = false
      }
      else if(this.selectedBatterResult === "3塁打")
      {
        this.itemsBatterRun = [
          { text: '3塁へ', value: '3塁へ' },
          { text: '本塁へ', value: '本塁へ' },
          { text: '本塁Out', value: '本塁Out' },
        ]
        this.selectedBatterRun = "3塁へ"
        this.$emit('selectedBatterRun')
        this.selectedOnChangeBatterRun()
        this.showSelectedBatterRun = false
      }
      this.$emit('showSelectedBatterRun')
      this.$emit('selectedBatterDirection')
    },
    selectedOnChangeBatterRun: function(){
      this.showSelectedBatterRun = false
      this.$emit('showSelectedBatterRun')
      this.$emit('selectedBatterRun')
      if(this.selectedBatterRun == "1塁へ"){
        this.advance(1);
      } else if(this.selectedBatterRun == "2塁へ"){
        this.advance(2);
      } else if(this.selectedBatterRun == "3塁へ"){
        this.advance(3);
      } else if(this.selectedBatterRun == "本塁へ"){
        this.advance(4);
      }
    },
    selectedOnChangeRunner: function(base){
      if(base == '1st')
      {
        this.showSelected1stRunnerBase = false
        this.$emit('showSelected1stRunnerBase')
        this.$emit('selected1stRunner')
        this.selected1stBase = "2塁へ"
        if(this.score.runner2nd != null){
          this.selected2ndRunner = his.selected1stRunner
          this.selected2ndBase = "3塁へ"
          this.showSelected2ndRunnerBase = false
          if(this.score.runner3rd != null){
            this.selected3rdRunner = his.selected1stRunner
            this.selected3rdBase = "本塁へ"
            this.showSelected3rdRunnerBase = false
          }
        }
      }
      else if(base == '2nd')
      {
        this.showSelected2ndRunnerBase = false
        this.$emit('showSelected2ndRunnerBase')
        this.$emit('selected2ndRunner')
        this.selected2ndBase = "2塁へ"
        if(this.score.runner3rd != null){
          this.selected3rdRunner = his.selected2ndRunner
          this.selected3rdBase = "本塁へ"
          this.showSelected3rdRunnerBase = false
        }
      }
      else if(base == '3rd')
      {
        this.showSelected3rdRunnerBase = false
        this.$emit('showSelected3rdRunnerBase')
        this.$emit('selected3rdRunner')
        this.selected3rdBase = "本塁へ"
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
    },
    advance: function(count){
      if(count == 1)
      {
        if(this.score.runner1st != null)
        {
          this.selected1stRunner = "進塁";
          this.selected1stBase = "2塁へ";
        }
        this.selected2ndRunner = "進塁";
        this.selected2ndBase = "3塁へ";
        this.selected3rdRunner = "進塁";
        this.selected3rdBase = "本塁へ";
      }
      else if(count == 2)
      {
        if(this.score.runner1st != null)
        {
          this.selected1stRunner = "進塁";
          this.selected1stBase = "3塁へ";
         }
         this.selected2ndRunner = "進塁";
         this.selected2ndBase = "本塁へ";
         this.selected3rdRunner = "進塁";
         this.selected3rdBase = "本塁へ";
      }
      else if(count == 3 || count == 4)
      {
        if(this.score.runner1st != null)
        {
          this.selected1stRunner = "進塁";
          this.selected1stBase = "本塁へ";
        }
        this.selected2ndRunner = "進塁";
        this.selected2ndBase = "本塁へ";
        this.selected3rdRunner = "進塁";
        this.selected3rdBase = "本塁へ";
      }
      this.showSelected1stRunnerBase = false;
      this.showSelected2ndRunnerBase = false;
      this.showSelected3rdRunnerBase = false;
     
    },
    advanceForce: function(){
      if(this.score.runner1st != null && this.score.runner2nd != null && this.score.runner3rd != null)
      {
        this.advance(1);
      }
      else if(this.score.runner1st != null && this.score.runner2nd != null && this.score.runner3rd == null){
        this.advance(1);
      }
      else if(this.score.runner1st != null && this.score.runner2nd == null && this.score.runner3rd != null){
        this.selected1stRunner = "進塁";
        this.selected1stBase = "2塁へ";
      }
      else if(this.score.runner1st != null && this.score.runner2nd == null && this.score.runner3rd == null){
          this.selected1stRunner = "進塁";
          this.selected1stBase = "2塁へ";
      }
    },
    resetRunner: function(){
      this.selected1stRunner = "----";
      this.$emit('selected1stRunner')
      this.selected1stBase = "----";
      this.$emit('selected1stBase')
      this.selected2ndRunner = "----";
      this.$emit('selected2ndRunner')
      this.selected2ndBase = "----";
      this.$emit('selected2ndBase')
      this.selected3rdRunner = "----";
      this.$emit('selected3rdRunner')
      this.selected3rdBase = "----";
      this.$emit('selected3rdBase')
      this.showSelected1stRunner= false;
      this.showSelected2ndRunner = false;
      this.showSelected3rdRunner = false;
      this.showSelected1stRunnerBase = true;
      this.showSelected2ndRunnerBase = true;
      this.showSelected3rdRunnerBase = true;

    }
  },
})

const topPage = Vue.component('top-page', {
  template: '#top',
  data:  ()=> {
      return {
        toporder: [],
        reserve: [],
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
          selectedPosition: ['----','----','----','----','----','----','----','----','----','----'],
          selectedName: ['----','----','----','----','----','----','----','----','----','----'],
          selectedNumber: ['----','----','----','----','----','----','----','----','----','----']
        }
  },
  mounted: function () {
    axios.get("./toporder.json").then(response => (this.toporder = response.data.order, this.reserve = response.data.reserve));
  },
})

const bottomPage = Vue.component('bottom-page', {
  template: '#bottom',
  data:  ()=> {
    return {
      bottomorder: [],
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
        selectedPosition: ['----','----','----','----','----','----','----','----','----','----'],
        selectedName: ['----','----','----','----','----','----','----','----','----','----'],
        selectedNumber: ['----','----','----','----','----','----','----','----','----','----']
      }
  },
  mounted: function () {
    axios.get("./toporder.json").then(response => (this.bottomorder = response.data.order));
  },
})

const textPage = Vue.component('text-page', {
  template: '#text',
  data:  ()=> {
      return {
          textData: null,
          // top: [],
          state: 'initial',
        }
  },
  mounted: function () {
    axios.get("./text.json").then(response => (this.textData = response.data));
  },
  computed: {
    inning: function(){
      if(this.textData != null){
        return this.textData.scoreboard.inning;
      }else{
        return [null,null,null,null,null,null,null,];
      }
    },
    topname: function(){
      if(this.textData != null){
        return this.textData.scoreboard.topname;
      }else{
        return "&nbsp;";
      }
    },
    top: function(){
      if(this.textData != null){
        return this.textData.scoreboard.top;
      }else{
        return [null,null,null,null,null,null,null,];
      }
    },
    bottomname: function(){
      if(this.textData != null){
        return this.textData.scoreboard.bottomname;
      }else{
        return "&nbsp;";
      }
    },
    bottom: function(){
      if(this.textData != null){
        return this.textData.scoreboard.bottom;
      }else{
        return [null,null,null,null,null,null,null,];
      }
    },
    texts: function(){
      if(this.textData != null && this.textData.texts != null){
        return this.textData.texts;
      }else{
        return [];
      }
    }
  },
  methods: {
    loadItem(done) {
      setTimeout(() => {
        axios.get("./text.json").then(response => (this.textData = response.data));
        done();
      }, 400);
      // this.top = this.textData.scoreboard.top;
      this.$forceUpdate();
    },
    officialChange: function(){
      this.$emit('officialValue')
    },
    onChangeTopBottom: function(){
      this.$emit('selectTopBottom')
    }
  },
})

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
        },
        {
          // icon: this.md() ? null : 'ion-ios-settings',
          label: '後',
          page: bottomPage,
          key: "bottomPage"
        },
        {
          // icon: this.md() ? null : 'ion-ios-settings',
          label: '速',
          page: textPage,
          key: "textPage"
        }
      ],
    };
  },
  mounted: function () {
  },
  methods: {
    md() {
      return this.$ons.platform.isAndroid();
    },
    gotosite: function(url) {
      window.location.href = url;
    },
  },
  computed: {
  }
});
