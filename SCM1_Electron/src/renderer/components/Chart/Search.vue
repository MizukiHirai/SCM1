<template>
<transition name="fade">
    <div class="search-layer">
        <img src="../../assets/images/search_icon.png" class="icon">
        <div class="topChar">検索</div>
        <button type="button" class="back" @click="hideSearch">✖</button>
        <div>
            <input type="text" v-model="searchtxt" class="searchword" v-focus inputmode="kana">
            <img src="../../assets/images/search_button.png" class="button">			
        </div>
        <div class="announceChar">{{ this.filterEmp(searchtxt).searchMessage }}</div>
    <button type="button" :id="emp.EMP_NO" class="rslt" v-for="emp in this.filterEmp(searchtxt).filteredEmp" :key="emp.EMP_NO" @click="getpath">{{ emp.EMP_NO }} {{ emp.EMP_NM }}</button>
    </div>
</transition>
</template>

<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex'

export default {
  data: function () {
    return {
      searchtxt: null
    }
  },
  computed: {
    ...mapState('getUserPath', {
      userPath: state => state.userPath
    }),
    ...mapGetters({
      filterEmp: 'search/filterEmp'
    })
  },
  methods: {
    ...mapActions({
      getuserpath: 'getUserPath/getuserpath'
    }),
    ...mapMutations({
      hideSearch: 'search/hideSearch'
    }),
    getpath: function (event) {
      this.getuserpath({
        EmpNo: event.target.id,
        Token: this.$store.state.auth.token
      })
      this.hideSearch()
    }
  },
  // 検索ボックスにフォーカスを当てる
  directives: {
    focus: {
      // ディレクティブ定義
      inserted: function (el) {
        el.focus()
        document.createEvent()
      }
    }
  }
}
</script>

<style scoped>
.floatL {
  float: left;
}
input:focus{
 outline:none;
}
button:focus{
 outline:none;
}
.icon{
  margin-left: 3px; 
  margin-top: 3px;
  width: 50px;
  height: 50px;
  float: left;
}
.button{
  position: absolute;
  margin-left: -320px;
  margin-top: 4px;
  width: 30px;
  height: 30px;
}
.back{
  width: 30px;
  height: 30px;
  float: left;
  margin-left: 250px; 
  margin-top: 10px;
  background: none;
  color: #ffffff;
  font-size: 20px;
  font-family: 'Century Gothic';
  border-style: none;
  cursor: pointer;
}
.topChar{
  margin-left: 5px; 
  margin-top: 15px;
  color: #ffffff;
  font-size: 20px;
  float: left;
}
.announceChar{
  margin-left: 30px; 
  margin-top: 15px;
  color: #ffffff;
  font-size: 18px;
  height: 30px;
}
.searchword{
  position: relative;
  margin-left: 30px;
  width: 330px;
  height: 35px;
  text-indent: 2.3em;
  font-family: 'Century Gothic';
  font-size: 20px;
  background-color: #ffffff;
  color: #5d5d5d;
  border-radius: 20px;
  border-style: none;
  ime-mode: active;
}
.rslt{
  margin-left: 40px; 
  margin-top: 5px;
  margin-bottom: 6px;
  color: #ffffff;
  font-size: 15px;
  font-family: 'Century Gothic';
  display: block;
  border-style: none;
  background: none;
  cursor: pointer;
}
</style>
