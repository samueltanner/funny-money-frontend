<template>
  <div class="transaction-new">
    <h1>Add Transaction</h1>
    <input type="text" placeholder="search stock symbol" v-model="searchItem" />
    <button type="submit" v-on:click="searchSymbol(searchItem)">Search</button>
    <div v-for="item in itemList.bestMatches" :key="item.id">
      <p>
        {{ item["1. symbol"] }} | {{ item["2. name"] }}
        <button v-on:click="addInfoToTransactionModal(item)">Select</button>
      </p>
    </div>

    <dialog id="add-transaction-info-modal">
      <form method="dialog" @submit="checkForm">
     
        <h1>Transaction Info</h1>
        <h3>{{ current_item["1. symbol"] }} | {{ current_item["2. name"] }}</h3>
        <div>
          <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
            <li v-for="error in errors" :key="error.id">{{error}}</li>
            </ul>
          </p>
          <!-- <ul>
            <li class="text-danger" v-for="error in errors" v-bind:key="error">
              {{ error }}
            </li>
          </ul> -->
          <span>
            <label for="purchase-price-input">Purchase Price:</label>
            <input id="purchase-price-input" type="text" v-model="purchase_price" />
          </span>
          <span>
            <label for="purchase-quantity-input">Purchase Quantity:</label>
            <input id="purchase-quantity-input" type="text" v-model="purchase_qty" />
          </span>

          <br />
          <input type="submit" value="Add Transaction" />
          <!-- <button type="button" v-on:click="addTransaction()">Add Transaction</button> -->
          <button>Close</button>
        </div>
      </form>
    </dialog>
  </div>
</template>

<script>
import axios from "axios";
import "vue-search-select/dist/VueSearchSelect.css";
export default {
  data() {
    return {
      current_item: {},
      searchItem: "",
      itemList: {},
      apiLoaded: false,
      purchase_price: null,
      purchase_qty: null,
      errors: [],
    };
  },
  mounted() {
    // this.getList();
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
          // if (response.data.bestMatches.length === 0) {
          //   console.log("No Matches");
          //   this.itemList = { bestMatches: [{ "1. symbol": "No Match" }] };
          // } else {
          console.log(response.data);
          this.itemList = response.data;
          this.apiLoaded = true;
          // }
        });
    },
    addInfoToTransactionModal: function (item) {
      this.current_item = item;
      document.querySelector("#add-transaction-info-modal").showModal();
    },
    addTransaction: function () {
      var params = {
        symbol: this.current_item["1. symbol"],
        purchase_price: this.purchase_price,
        purchase_qty: this.purchase_qty,
        status_open: true,
      };
      axios
        .post("api/transactions", params)
        .then((response) => {
          // this.portfolio.push(response.data);
          console.log(response.data);
          this.$router.push("/");
        })
        // .then(() => this.$router.push("/"))
        // .catch((error) => {
        //   this.errors = error.response.data.errors;
        //   console.log(error.response);
        // });
    },
    checkForm: function (e) {
      if (this.purchase_price && this.purchase_qty) {
        this.addTransaction();
      }
      this.errors = [];

      if (!this.purchase_price) {
        this.errors.push("Purchase price required")
      }
     
     if (!this.purchase_qty) {
        this.errors.push("Purchase quantity required")
      }

      e.preventDefault();
    }
  },
};
</script>
