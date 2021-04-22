<template>
  <div class="test">
    <input type="text" placeholder="search stock symbol" v-model="searchItem" />
    <button type="submit" v-on:click="searchSymbol(searchItem)">Search</button>
    <div v-for="item in itemList.bestMatches" :key="item.id">
      <p>{{ item["1. symbol"] }} | {{ item["2. name"] }} | {{ item["3. type"] }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "vue-search-select/dist/VueSearchSelect.css";

export default {
  data() {
    return {
      searchItem: "",
      itemList: {},
      apiLoaded: false,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // getList() {
    //   axios.get(this.apiUrl).then((response) => {
    //     this.itemList = response.data;
    //     this.apiLoaded = true;
    //   });
    // },
    searchSymbol: function (symbol) {
      axios
        .get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=2YF1ZH8GDS8DFHA2`)
        .then((response) => {
          console.log(response.data);
          this.itemList = response.data;
          this.apiLoaded = true;
        });
    },
  },
};
</script>
