<template>
  <div class="home">
    <h1>Portfolio:</h1>
    <div>
      <button v-on:click="openTransactionWindow()">Add Transaction</button>
    </div>
    <div v-for="transaction in portfolio" v-bind:key="transaction.id">
      <h3>{{ transaction.symbol }}:</h3>
      <p>{{ transaction.purchase_qty }} shares @ ${{ transaction.purchase_price }}</p>
      <button type="button" v-on:click="showTransactionInfo(transaction)">Transaction Info/Update</button>
      <hr />
    </div>
    <!-- THIS IS THE CREATE TRANSACTION DIALOG WINDOW -->

    <dialog id="add-transaction-info">
      <form method="dialog">
        <h1>Transaction Info</h1>
        <span>
          <label for="ticker-input">Symbol/Ticker:</label>
          <input id="ticker-input" type="text" v-model="symbol" />
        </span>
        <span>
          <label for="purchase-price-input">Purchase Price:</label>
          <input id="purchase-price-input" type="text" v-model="purchase_price" />
        </span>
        <span>
          <label for="purchase-quantity-inptut">Purchase Quantity:</label>
          <input id="purchase-quantity-inptut" type="text" v-model="purchase_qty" />
        </span>
        <br />
        <button type="submit" v-on:click="addTransaction()">Add Transaction</button>
        <button type="reset">Reset</button>
        <button>Close</button>
      </form>
    </dialog>

    <!-- THIS IS THE UPDATE/DELETE TRANSACTION DIALOG WINDOW -->

    <dialog id="update-transaction-info">
      <form method="dialog">
        <h1>Transaction Info</h1>
        <span>
          <label for="ticker-input">Symbol/Ticker:</label>
          <input id="ticker-input" type="text" v-model="current_transaction.symbol" />
        </span>
        <span>
          <label for="purchase-price-input">Purchase Price:</label>
          <input id="purchase-price-input" type="text" v-model="current_transaction.purchase_price" />
        </span>
        <span>
          <label for="purchase-quantity-inptut">Purchase Quantity:</label>
          <input id="purchase-quantity-inptut" type="text" v-model="current_transaction.purchase_qty" />
        </span>
        <br />
        <button type="submit" data-dismiss="modal" v-on:click="updateTransaction(current_transaction)">
          Update Transaction
        </button>
        <!-- <button type="reset">Reset</button> -->
        <button type="button" v-on:click="destroyTransaction(current_transaction)">Delete Transaction</button>
        <button>Close</button>
        <span>
          <!-- <label for="ticker-input">Symbol/Ticker:</label>
          <input id="ticker-input" type="text" v-model="transaction.symbol" /> -->
        </span>
      </form>
    </dialog>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      portfolio: [],
      symbol: "",
      purchase_price: "",
      purchase_qty: "",
      // update_symbol: "",
      // update_purchase_price: "",
      // update_purchase_qty: "",
      current_transaction: {},
    };
  },
  created: function () {
    this.indexPortfolio();
  },
  methods: {
    indexPortfolio: function () {
      axios.get("/api/transactions").then((response) => {
        console.log(response.data);
        this.portfolio = response.data;
      });
    },
    openTransactionWindow: function () {
      document.querySelector("#add-transaction-info").showModal();
    },
    addTransaction: function () {
      var params = {
        symbol: this.symbol,
        purchase_price: this.purchase_price,
        purchase_qty: this.purchase_qty,
      };
      axios.post("api/transactions", params).then((response) => {
        this.$router.push("/");
        console.log(response.data);
      });
    },
    showTransactionInfo: function (transaction) {
      console.log(transaction);
      this.current_transaction = transaction;
      document.querySelector("#update-transaction-info").showModal();
    },
    updateTransaction: function (transaction) {
      console.log("Updating Transaction");
      var params = {
        symbol: transaction.symbol,
        purchase_price: transaction.purchase_price,
        purchase_qty: transaction.purchase_qty,
      };
      axios
        .patch("/api/transactions/" + transaction.id, params)
        .then((response) => {
          console.log("Transaction Updated", response.data);
        })
        .catch((error) => console.log(error.response));
    },
    destroyTransaction: function (transaction) {
      axios.delete("/api/transactions/" + transaction.id).then((response) => {
        console.log("Transaction Deleted", response.data);
        // var index = this.transactions.indexOf(transaction);
        // this.transactions.splice(index, 1);
      });
    },
    // showAddTransactionWindow: function () {},
  },
};
</script>
