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
      <!-- Dashboard -->
      <div id="dashboard" class="row">
        <!-- MARKET VALUE  -->
        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-primary shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-we≈ight-bold text-primary text-uppercase mb-1">Market Value</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">${{ portfolio_market_value }}</div>
                </div>
                <!-- <div class="col-auto">
                  <i class="fas fa-folder fa-2x text-gray-300"></i>
                </div> -->
              </div>
            </div>
          </div>
        </div>

        <!-- Day ∆ -->
        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-success shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Day Change</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                    ${{ portfolio_day_change }} ({{ portfolio_day_change_percent }}%)
                  </div>
                </div>
                <!-- <div class="col-auto">
                  <i class="fas fa-sun-o fa-2x text-gray-300"></i>
                </div> -->
              </div>
            </div>
          </div>
        </div>
        <!-- Cost Basis -->
        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-info shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Cost Basis</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">${{ portfolio_cost_basis }}</div>
                </div>
                <!-- <div class="col-auto">
                  <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                </div> -->
              </div>
            </div>
          </div>
        </div>
        <!-- Gain/Loss -->
        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-warning shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">Gain/Loss</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                    ${{ portfolio_gain_loss }} ({{ portfolio_gain_loss_percent }}%)
                  </div>
                </div>
                <!-- <div class="col-auto">
                  <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <table>
        <tr>
          <th>Market Value</th>
          <th>Day Change</th>
          <th>Cost Basis</th>
          <th>Gain/Loss</th>
          <th>Previous Day Value</th>
        </tr>
        <tr>
          <td>${{ portfolio_market_value }}</td>
          <td>${{ portfolio_day_change }} ({{ portfolio_day_change_percent }}%)</td>
          <td>${{ portfolio_cost_basis }}</td>
          <td>${{ portfolio_gain_loss }} ({{ portfolio_gain_loss_percent }}%)</td>
          <td>{{ previous_day_market_value }}</td>
        </tr>
      </table> -->
      <br />
      <div>
        <a v-on:click="transactionNewRouter()" class="btn btn-success btn-icon-split">
          <span class="icon text-white-50">
            <i class="fas fa-plus-circle"></i>
          </span>
          <span class="text">Add Transaction</span>
        </a>
        <!-- <button v-on:click="transactionNewRouter()">Add Transaction</button> -->
      </div>
      <hr />
      <!-- Transaction Table -->
      <div>
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Portfolio Holdings</h6>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th>Current Price</th>
                    <th>Day Change</th>
                    <th>Market Value</th>
                    <th>Cost Basis</th>
                    <th>Gain/Loss</th>
                    <th>Purchase Price/Quantity</th>
                    <th>Purchase Quantity</th>
                    <th>Percent of Portfolio</th>
                    <th>Edit/Remove</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>Symbol</th>
                    <th>Current Price</th>
                    <th>Day Change</th>
                    <th>Market Value</th>
                    <th>Cost Basis</th>
                    <th>Gain/Loss</th>
                    <th>Purchase Price</th>
                    <th>Purchase Quantity</th>
                    <th>Percent of Portfolio</th>
                    <th>Edit/Remove</th>
                  </tr>
                </tfoot>
                <tbody v-for="(transaction, index) in portfolio" v-bind:key="transaction.id">
                  <tr>
                    <td>{{ transaction.symbol }} - {{ transaction.current_info["companyName"] }}</td>
                    <td>${{ transaction.current_info["latestPrice"] }}</td>
                    <td>${{ transaction.current_info["change"] }} ({{ day_change_percent[index] }}%)</td>
                    <td>${{ market_value[index] }}</td>
                    <td>${{ transaction.cost_basis }}</td>
                    <td>${{ gain_loss[index] }} ({{ gain_loss_percent[index] }}%)</td>
                    <td>${{ transaction.purchase_price }}</td>
                    <td>{{ transaction.purchase_qty }}</td>
                    <td>{{ portfolio_percent[index] }}%</td>
                    <td>
                      <!-- <button type="button" v-on:click="showTransactionInfo(transaction)">
                        Transaction Info/Update
                      </button> -->
                      <a v-on:click="showTransactionInfo(transaction)" class="btn btn-warning btn-circle">
                        <i class="fas fa-info-circle"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- <div v-for="(transaction, index) in portfolio" v-bind:key="transaction.id">
        <h3>{{ transaction.symbol }} - {{ transaction.current_info["companyName"] }}</h3>
        <p>Quantity: {{ transaction.purchase_qty }}</p>
        <p>Current Price: ${{ transaction.current_info["latestPrice"] }}</p>
        <p>Day $ Change: {{ transaction.current_info["change"] }}</p>
        <p>Day % Change: {{ day_change_percent[index] }}</p>
        <p>Market Value: ${{ market_value[index] }}</p>
        <p>Cost Basis: ${{ transaction.cost_basis }}</p>
       <p>
          Gain/Loss: ${{ transaction.purchase_qty * transaction.current_info["latestPrice"] - transaction.cost_basis }}
        </p>
        <p>Gain/Loss: ${{ gain_loss[index] }}</p>
        <p>Gain/Loss %: {{ gain_loss_percent[index] }}</p>
        <p>Purchase Price: {{ transaction.purchase_price }}</p>
        <p>Percent of Portfolio: {{ portfolio_percent[index] }}%</p>

        <button type="button" v-on:click="showTransactionInfo(transaction)">Transaction Info/Update</button>

        <hr />
      </div> -->
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
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">Update Transaction Info</h6>
        </div>
        <div class="card-body">
          <form method="dialog">
            <div>
              <h3>{{ current_transaction.symbol }}</h3>
            </div>
            <hr />
            <div>
              <label id="modal-text-box-label" for="purchase-price-input"><h4>Purchase Price:</h4></label>
              <input id="purchase-price-input" type="text" v-model="update_purchase_price" />
            </div>
            <div>
              <label for="purchase-quantity-inptut" id="modal-text-box-label"><h4>Purchase Quantity:</h4></label>
              <input id="purchase-quantity-inptut" type="text" v-model="update_purchase_qty" />
            </div>
            <br />
            <button
              href="#"
              id="modal-button"
              type="submit"
              class="btn btn-success btn-icon-split"
              v-on:click="updateTransaction(current_transaction)"
            >
              <span class="icon text-white-50">
                <i class="fas fa-check"></i>
              </span>
              <span class="text">Update Transaction</span>
            </button>
            <!-- <button
              class="btn btn-success btn-icon-split"
              type="submit"
              v-on:click="updateTransaction(current_transaction)"
            >
              Update Transaction
            </button> -->
            <button
              id="modal-button"
              href="#"
              class="btn btn-danger btn-icon-split"
              v-on:click="destroyTransaction(current_transaction)"
            >
              <span class="icon text-white-50">
                <i class="fas fa-trash"></i>
              </span>
              <span class="text">Delete Transaction</span>
            </button>
            <!-- <button type="submit" v-on:click="destroyTransaction(current_transaction)">Delete Transaction</button> -->
            <button id="modal-button" href="#" class="btn btn-secondary btn-icon-split">
              <span class="icon text-white-50">
                <i class="fas fa-times"></i>
              </span>
              <span class="text">Close</span>
            </button>
            <!-- <button>Close</button> -->
          </form>
        </div>
      </div>
    </dialog>
    <!-- <dialog id="update-transaction-info">
      <form method="dialog">
        <h1>Transaction Info:</h1>
        <span>
          <h3>{{ current_transaction.symbol }}</h3>
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
        <button type="submit" v-on:click="destroyTransaction(current_transaction)">Delete Transaction</button>
        <button>Close</button>
        <span></span>
      </form>
    </dialog> -->

    <!-- GROUP AREA -->
    <hr />
    <h1>Groups:</h1>
    <div id="group-flexbox">
      <div v-for="group in user_info.groups" :key="group.id" id="group-flexbox-item" class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">{{ group.name }}</h6>
        </div>
        <div class="card-body">
          {{ group.description }}
        </div>
      </div>

      <!-- <div id="group-flexbox-item" class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">Basic Card Example</h6>
        </div>
        <div class="card-body">
          The styling for this basic card example is created by using default Bootstrap utility classes. By using
          utility classes, the style of the card component can be easily modified with no need for any custom CSS!
        </div>
      </div> -->
    </div>
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
    this.showUserInfo();
    this.indexPortfolio();
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
        return num.toFixed(3);
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
      // .toLocaleString("en-US", {
      //   style: "currency",
      //   currency: "USD",
      // });
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
      axios.get("/api/users/" + localStorage.getItem("user_id")).then((response) => {
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
