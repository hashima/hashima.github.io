const homePage = {
  template: '#home',
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
            //title: 'Scorebook mobi',
            activeIndex: 0,
            tabs: [
              {
                icon: this.md() ? null : 'ion-home',
                label: 'Home',
                page: homePage,
                props: {
                  myProp: 'This is a page prop!'
                },
                key: "homePage"
              },
              {
                icon: this.md() ? null : 'ion-ios-bell',
                label: 'News',
                page: newsPage,
                badge: 7,
                key: "newsPage"
              },
              {
                icon: this.md() ? null : 'ion-ios-settings',
                label: 'Settings',
                page: settingsPage,
                key: "settingsPage"
              }
            ],
            score:null,
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
            selectedItemBatter: '結果',
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
            selectedItemDirection: '方向',
            itemsRunner: [
                    { text: '結果', value: '結果' },
                    { text: '盗塁', value: '盗塁' },
                    { text: 'WP', value: 'WP' },
                    { text: 'PB', value: 'PB' },
                    { text: '進塁', value: '進塁' },
            ],
            selectedItemRunner: '結果',
            itemsBase: [
                    { text: '--', value: '--' },
                    { text: '2塁へ', value: '2塁へ' },
                    { text: '3塁へ', value: '3塁へ' },
                    { text: '本塁へ', value: '本塁へ' },
            ],
            selectedItemBase: '--',
            itemsBatterrun: [
                    { text: '--', value: '--' },
                    { text: '2塁へ', value: '2塁へ' },
                    { text: '3塁へ', value: '3塁へ' },
                    { text: '本塁へ', value: '本塁へ' },
            ],
            selectedItemBatterrun: '--',
          };
        },
        mounted: function () {
          axios.get("./score.json").then(response => (this.score = response.data))
        },
        methods: {
          fetchBatter: function() {
            alert(this.selectedItemBatter);
          },
          md() {
            return this.$ons.platform.isAndroid();
          },
        },
        computed: {
          title() {
            return this.tabs[this.activeIndex].label;
          }
        }
      });
