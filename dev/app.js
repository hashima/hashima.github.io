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
    { text: '2塁Out', value: '2塁Out' },
    { text: '3塁Out', value: '3塁Out' },
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
        this.selectedOnChangeBatterRun()
      }
      this.showSelectedBatterRun = false
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
      this.showSelected1stRunner = false;
      this.showSelected2ndRunner = false;
      this.showSelected3rdRunner = false;
     
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
          selectedPosition: ['----','----','----','----','----','----','----','----','----','----'],
          selectedName: ['----','----','----','----','----','----','----','----','----','----'],
          selectedNumber: ['----','----','----','----','----','----','----','----','----','----']
        }
  },
  mounted: function () {
    axios.get("./toporder.json").then(response => (this.toporder = response.data));
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
    axios.get("./toporder.json").then(response => (this.bottomorder = response.data));
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
