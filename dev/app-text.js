
var vm = new Vue({
  el: '#app',
  template: '#main',
  data() {
    return {
      title: "ScoreBook.mobi 開発版",
      textData: null,
      state: 'initial',
    };
  },
  mounted: function () {
    axios.get("./text.json").then(response => (this.textData = response.data));
    // console.log(this.tabs[1].props.score);
  },
  methods: {
    loadItem(done) {
      setTimeout(() => {
        axios.get("./text.json").then(response => (this.textData = response.data));
        done();
      }, 400);
      this.$forceUpdate();
    },
      md() {
      return this.$ons.platform.isAndroid();
    },
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
  }
});
