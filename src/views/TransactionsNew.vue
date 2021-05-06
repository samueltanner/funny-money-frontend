<template>
  <div class="transaction-new">
    <h1>Add Transaction</h1>

    <div id="transaction-search-unit">
      <input id="symbol-search-input" type="text" placeholder="search stock symbol" v-model="searchItem" />
      <button id="symbol-search-button" type="submit" v-on:click="searchSymbol(searchItem)">
        <i id="transaction-search-icon" class="fas fa-search fa-sm"></i>
      </button>
      <div v-if="search_errors.length">
        <ul>
          <li v-for="error in search_errors" :key="error.id">{{ error }}</li>
        </ul>
      </div>
    </div>
    <div id="transaction-flexbox">
      <div v-for="item in itemList.bestMatches" :key="item.id" id="transaction-flexbox-item">
        <div class="card shadow mb-4" id="transaction-card">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">{{ item["2. name"] }}</h6>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                <thead>
                  <th>Symbol</th>
                  <th>Type</th>
                  <th>Region</th>
                </thead>
                <tbody>
                  <td>{{ item["1. symbol"] }}</td>
                  <td>{{ item["3. type"] }}</td>
                  <td>{{ item["4. region"] }}</td>
                </tbody>
              </table>
            </div>
            <button
              href="#"
              id="modal-button"
              type="button"
              class="btn btn-success btn-icon-split"
              v-on:click="addInfoToTransactionModal(item)"
            >
              <span class="icon text-white-50">
                <i class="fas fa-check"></i>
              </span>
              <span class="text">Select</span>
            </button>
            <!-- <p>
              <button v-on:click="addInfoToTransactionModal(item)">Select</button>
            </p> -->
          </div>
        </div>
      </div>
    </div>

    <dialog id="add-transaction-info-modal">
      <form method="dialog">
        <h1>Transaction Info</h1>
        <h3>{{ current_item["1. symbol"] }} | {{ current_item["2. name"] }}</h3>
        <hr />
        <div>
          <div v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
              <li v-for="error in errors" :key="error.id">{{ error }}</li>
            </ul>
          </div>
          <!-- <ul>
            <li class="text-danger" v-for="error in errors" v-bind:key="error">
              {{ error }}
            </li>
          </ul> -->
          <div>
            <label for="purchase-price-input" id="modal-text-box-label"><h5>Purchase Price:</h5></label>
            <input id="purchase-price-input" type="text" v-model="purchase_price" />
          </div>
          <div>
            <label for="purchase-quantity-input" id="modal-text-box-label"><h5>Purchase Quantity:</h5></label>
            <input id="purchase-quantity-input" type="text" v-model="purchase_qty" />
          </div>

          <br />
          <!-- <input type="submit" value="Add Transaction" /> -->
          <!-- <button type="button" v-on:click="addTransaction()">Add Transaction</button> -->
          <!-- <button type="submit" v-on:click="checkForm">Submit</button> -->
          <button
            href="#"
            id="modal-button"
            type="submit"
            class="btn btn-success btn-icon-split"
            v-on:click="checkForm"
          >
            <span class="icon text-white-50">
              <i class="fas fa-check"></i>
            </span>
            <span class="text">Add to Portfolio</span>
          </button>
          <button id="modal-button" href="#" class="btn btn-secondary btn-icon-split">
            <span class="icon text-white-50">
              <i class="fas fa-times"></i>
            </span>
            <span class="text">Close</span>
          </button>
          <!-- <button>Close</button> -->
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
      search_errors: [],
      showModal: false,
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
      this.search_errors = [];
      axios
        .get(
          `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${process.env.VUE_APP_ALPHA_API_KEY}`
        )
        .then((response) => {
          console.log(response.data);
          this.itemList = response.data;
          this.apiLoaded = true;

          if (response.data.bestMatches.length === 0) {
            console.log("No Matches");
            this.search_errors = ["No symbol matches"];
          }
        });
    },
    addInfoToTransactionModal: function (item) {
      this.showModal = true;
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
      axios.post("api/transactions", params).then((response) => {
        // this.portfolio.push(response.data);
        console.log(response.data);
        this.$router.push("/");
      });
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
        this.errors.push("Purchase price required");
      }

      if (!this.purchase_qty) {
        this.errors.push("Purchase quantity required");
      }

      e.preventDefault();
    },
  },
};
</script>
