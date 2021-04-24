<template>
  <div class="home">
    <div v-if="!isLoggedIn()">
      <h1>Welcome To Funny Money</h1>
      <button v-on:click="loginUserRouter()">Login</button>
      <button v-on:click="signupUserRouter()">Signup</button>
      <!-- Login Window -->
      <!-- <dialog id="login-dialog-window">
        <form v-on:submit.prevent="submitLogin()">
          <h1>Login</h1>
          <ul>
            <li class="text-danger" v-for="error in errors" v-bind:key="error">
              {{ error }}
            </li>
          </ul>
          <div class="form-group">
            <label>Email:</label>
            <input type="email" class="form-control" v-model="email" />
          </div>
          <div class="form-group">
            <label>Password:</label>
            <input type="password" class="form-control" v-model="password" />
          </div>
          <input type="submit" class="btn btn-primary" value="Submit" />
        </form>
      </dialog> -->
      <!-- Signup Window -->
      <!-- <dialog id="signup-dialog-window">
        <form v-on:submit.prevent="submitSignup()">
          <h1>Signup</h1>
          <ul>
            <li class="text-danger" v-for="error in errors" v-bind:key="error">
              {{ error }}
            </li>
          </ul>
          <div class="form-group">
            <label>Name:</label>
            <input type="text" class="form-control" v-model="name" />
          </div>
          <div class="form-group">
            <label>Email:</label>
            <input type="email" class="form-control" v-model="email" />
          </div>
          <div class="form-group">
            <label>Password:</label>
            <input type="password" class="form-control" v-model="password" />
          </div>
          <div class="form-group">
            <label>Password confirmation:</label>
            <input type="password" class="form-control" v-model="passwordConfirmation" />
          </div>
          <input type="submit" class="btn btn-primary" value="Submit" />
        </form>
      </dialog> -->
    </div>
    <!-- THIS IS THE PORTFOLIO WINDOW -->
    <div v-if="isLoggedIn()">
      <h1>{{ user_info.username }}'s Portfolio:</h1>
      <table>
        <tr>
          <th>Market Value</th>
          <th>Day Change</th>
          <th>Cost Basis</th>
          <th>Gain/Loss</th>
          <!-- <th>Previous Day Value</th> -->
        </tr>
        <tr>
          <td>${{ portfolio_market_value }}</td>
          <td>${{ portfolio_day_change }} ({{ portfolio_day_change_percent }}%)</td>
          <td>${{ portfolio_cost_basis }}</td>
          <td>${{ portfolio_gain_loss }} ({{ portfolio_gain_loss_percent }}%)</td>
          <!-- <td>{{ previous_day_market_value }}</td> -->
        </tr>
      </table>
      <br />
      <div>
        <button v-on:click="transactionNewRouter()">Add Transaction</button>
      </div>
      <hr />
      <div v-for="(transaction, index) in portfolio" v-bind:key="transaction.id">
        <h3>{{ transaction.symbol }} - {{ transaction.current_info["companyName"] }}</h3>
        <p>Quantity: {{ transaction.purchase_qty }}</p>
        <p>Current Price: ${{ transaction.current_info["latestPrice"] }}</p>
        <p>Day $ Change: {{ transaction.current_info["change"] }}</p>
        <p>Day % Change: {{ day_change_percent[index] }}</p>
        <p>Market Value: ${{ market_value[index] }}</p>
        <p>Cost Basis: ${{ transaction.cost_basis }}</p>
        <!-- <p>
          Gain/Loss: ${{ transaction.purchase_qty * transaction.current_info["latestPrice"] - transaction.cost_basis }}
        </p> -->
        <p>Gain/Loss: ${{ gain_loss[index] }}</p>
        <p>Gain/Loss %: {{ gain_loss_percent[index] }}</p>
        <p>Purchase Price: {{ transaction.purchase_price }}</p>
        <p>Percent of Portfolio: {{ portfolio_percent[index] }}%</p>

        <button type="button" v-on:click="showTransactionInfo(transaction)">Transaction Info/Update</button>

        <hr />
      </div>
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
        <h1>Transaction Info:</h1>
        <span>
          <h3>{{ current_transaction.symbol }}</h3>
          <!-- <label for="ticker-input">Symbol/Ticker:</label>
          <input id="ticker-input" type="text" v-model="update_symbol" /> -->
        </span>
        <span>
          <label for="purchase-price-input">Purchase Price:</label>
          <input id="purchase-price-input" type="text" v-model="update_purchase_price" />
        </span>
        <span>
          <label for="purchase-quantity-inptut">Purchase Quantity:</label>
          <input id="purchase-quantity-inptut" type="text" v-model="update_purchase_qty" />
        </span>
        <br />
        <button type="submit" v-on:click="updateTransaction(current_transaction)">Update Transaction</button>
        <!-- <button type="reset">Reset</button> -->
        <button type="submit" v-on:click="destroyTransaction(current_transaction)">Delete Transaction</button>
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
      user_info: [],
      current_transaction: {},
      portfolio: [],
      symbol: "",
      purchase_price: "",
      purchase_qty: "",
      // current_price: "",
      update_symbol: "",
      update_purchase_price: "",
      update_purchase_qty: "",
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: [],
      // market_value: "",
    };
  },
  created: function () {
    this.indexPortfolio();
    this.showUserInfo();
  },
  computed: {
    gain_loss: function () {
      return this.portfolio.map(function (transaction) {
        var num = transaction.purchase_qty * transaction.current_info["latestPrice"] - transaction.cost_basis;
        return num.toFixed(2);
      });
    },
    gain_loss_percent: function () {
      return this.portfolio.map(function (transaction) {
        var num =
          ((transaction.current_info["latestPrice"] - transaction.purchase_price) / transaction.purchase_price) * 100;
        return num.toFixed(2);
      });
    },
    market_value: function () {
      return this.portfolio.map(function (transaction) {
        var num = transaction.purchase_qty * transaction.current_info["latestPrice"];
        return num.toFixed(2);
      });
    },
    day_change_percent: function () {
      return this.portfolio.map(function (transaction) {
        var num = transaction.current_info["changePercent"];
        return num;
      });
    },
    portfolio_day_change: function () {
      var arr = Array.from(
        this.portfolio.map(function (transaction) {
          return transaction.current_info["change"];
        })
      );
      return arr.reduce((a, b) => a + b, 0).toFixed(2);
    },
    portfolio_market_value: function () {
      var strings = this.market_value;
      var value = strings
        .map(Number)
        .reduce((a, b) => a + b, 0)
        .toFixed(2);
      return value;
    },
    portfolio_percent: function () {
      var array = this.market_value.map(Number);
      var percent_array = [];
      for (var i = 0, length = array.length; i < length; i++) {
        var computed = (array[i] / this.portfolio_market_value) * 100;
        percent_array.push(computed.toFixed(2));
      }
      return percent_array;
    },
    // previous_day_portfolio_market_value: function () {
    //   return this.portfolio.map(function (transaction) {
    //     var arr = transaction.purchase_qty * transaction.current_info["previousClose"];
    //     return arr;

    //     // var value = arr.map(Number).reduce((a, b) => a + b, 0);
    //     // return value;
    //   });
    // },
    // previous_day_market_value: function () {
    //   return this.portfolio.map(function (transaction) {
    //     var strings = transaction.purchase_qty * transaction.current_info["previousClose"];
    //     // .reduce((a, b) => a + b, 0);
    //     return strings;
    //   });
    // },
    previous_day_market_value: function () {
      var arr = Array.from(
        this.portfolio.map(function (transaction) {
          return transaction.current_info["previousClose"] * transaction.purchase_qty;
        })
      );
      return arr.reduce((a, b) => a + b, 0).toFixed(2);
    },
    portfolio_day_change_percent: function () {
      var num = (this.portfolio_market_value - this.previous_day_market_value) / this.previous_day_market_value;
      num = num * 100;
      return num.toFixed(3);
    },
    portfolio_cost_basis: function () {
      var arr = Array.from(
        this.portfolio.map(function (transaction) {
          return transaction.cost_basis;
        })
      );
      return arr
        .map(Number)
        .reduce((a, b) => a + b, 0)
        .toFixed(2);
    },
    portfolio_gain_loss: function () {
      var num = this.portfolio_market_value - this.portfolio_cost_basis;
      return num.toFixed(2);
    },
    portfolio_gain_loss_percent: function () {
      var num = ((this.portfolio_market_value - this.portfolio_cost_basis) / this.portfolio_cost_basis) * 100;
      return num.toFixed(3);
    },
  },
  methods: {
    indexPortfolio: function () {
      axios.get("/api/transactions").then((response) => {
        console.log(response.data);
        this.portfolio = response.data;
      });
    },
    showUserInfo: function () {
      axios.get("/api/users/" + this.$route.params.id).then((response) => {
        console.log(response.data);
        this.user_info = response.data;
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
        this.portfolio.push(response.data);
        console.log(response.data);
      });
    },
    showTransactionInfo: function (transaction) {
      console.log(transaction);
      this.current_transaction = transaction;
      this.update_symbol = this.current_transaction.symbol;
      this.update_purchase_price = this.current_transaction.purchase_price;
      this.update_purchase_qty = this.current_transaction.purchase_qty;
      document.querySelector("#update-transaction-info").showModal();
    },
    updateTransaction: function (transaction) {
      console.log("Updating Transaction");
      var params = {
        symbol: this.update_symbol,
        purchase_price: this.update_purchase_price,
        purchase_qty: this.update_purchase_qty,
      };
      axios
        .patch("/api/transactions/" + transaction.id, params)
        .then((response) => {
          this.portfolio.splice(this.portfolio.indexOf(transaction), 1);
          this.portfolio.unshift(response.data);
          console.log(response.data);
        })
        .catch((error) => console.log(error.response));
    },
    destroyTransaction: function (transaction) {
      axios.delete("/api/transactions/" + transaction.id).then((response) => {
        console.log("Transaction Deleted", response.data);
        // var index = this.transactions.indexOf(transaction);
        this.portfolio.splice(this.portfolio.indexOf(transaction), 1);
      });
    },
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
    loginUserWindow: function () {
      document.querySelector("#login-dialog-window").showModal();
    },
    signupUserWindow: function () {
      document.querySelector("#signup-dialog-window").showModal();
    },
    submitLogin: function () {
      var params = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/api/sessions", params)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          // this.$router.push("/");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
    submitSignup: function () {
      var params = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
      };
      axios
        .post("/api/users", params)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    loginUserRouter: function () {
      this.$router.push("/login");
    },
    signupUserRouter: function () {
      this.$router.push("/signup");
    },
    transactionNewRouter: function () {
      this.$router.push("/transactions/new");
    },
  },
};
</script>
