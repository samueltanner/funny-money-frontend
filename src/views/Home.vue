<template>
  <div class="home">
    <div v-if="!isLoggedIn()">
      <div id="login-page">
        <!-- <div class="login-row"> -->
        <div class="login-column">
          <h1>Funny Money</h1>

          <p><em>Sharable investment strategies for the modern investor</em></p>
          <h5>• • •</h5>
          <ul class="no-bullets" id="value-props">
            <li class="value-prop">
              <i class="fas fa-folder value-prop-icon"></i>
              <br />
              Track your porfolio with real-time market data
            </li>
            <li class="value-prop">
              <i class="fa fa-users value-prop-icon" aria-hidden="true"></i>
              <br />
              Create and join investment groups with friends
            </li>
            <li class="value-prop">
              <i class="fa fa-percent value-prop-icon" aria-hidden="true"></i>
              <br />
              Share performance without disclosing wealth
            </li>
          </ul>
        </div>
        <div class="container login-buttons">
          <!-- Outer Row -->
          <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-12 col-md-9">
              <div class="card o-hidden border-0 shadow-lg my-5">
                <div class="card-body p-0">
                  <!-- Nested Row within Card Body -->
                  <div class="p-5">
                    <div class="text-center"></div>
                    <router-link to="/login" class="btn btn-primary btn-user btn-block">Login</router-link>
                    <router-link to="/signup" class="btn btn-success btn-user btn-block">Signup</router-link>
                    <!-- <a href="/" type="submit" class="btn btn-primary btn-user btn-block">Login</a> -->
                    <!-- <div class="text-center">
                      <a class="small" href="forgot-password.html">Forgot Password?</a>
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- </div> -->
        </div>
      </div>
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
                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                    ${{ portfolio_market_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                  </div>
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
                    ${{ portfolio_day_change.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} ({{
                      portfolio_day_change_percent
                    }}%)
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
                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                    ${{ portfolio_cost_basis.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                  </div>
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
                    ${{ portfolio_gain_loss.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} ({{
                      portfolio_gain_loss_percent
                    }}%)
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

      <hr />
      <!-- Transaction Table -->
      <div>
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <div class="portfolio-card-header">
              <div class="portfolio-card-column" id="portfolio-card-title">
                <h5 class="m-0 font-weight-bold text-primary">Portfolio Holdings</h5>
              </div>
              <div class="portfolio-card-column">
                <div id="add-transaction-button">
                  <a v-on:click="transactionNewRouter()" class="btn btn-success btn-icon-split">
                    <span class="icon text-white-50">
                      <i class="fas fa-plus-circle"></i>
                    </span>
                    <span class="text">Add Transaction</span>
                  </a>
                </div>
              </div>
            </div>
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
                    <th>Purchase Price</th>
                    <th>Purchase Quantity</th>
                    <th>Percent of Portfolio</th>
                    <th>Edit/Remove</th>
                  </tr>
                </thead>
                <!-- <tfoot>
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
                </tfoot> -->
                <tbody v-for="(transaction, index) in filteredPortfolio" v-bind:key="transaction.id">
                  <tr>
                    <td>{{ transaction.symbol }} - {{ transaction.current_info["companyName"] }}</td>
                    <td>
                      ${{ transaction.current_info["latestPrice"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                    </td>
                    <td>
                      ${{ transaction.current_info["change"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} ({{
                        day_change_percent[index]
                      }}%)
                    </td>
                    <td>${{ market_value[index].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</td>
                    <td>${{ transaction.cost_basis.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</td>
                    <td>
                      ${{ gain_loss[index].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} ({{
                        gain_loss_percent[index]
                      }}%)
                    </td>
                    <td>${{ transaction.purchase_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</td>
                    <td>{{ transaction.purchase_qty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</td>
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
          <label for="purchase-quantity-input">Purchase Quantity:</label>
          <input id="purchase-quantity-input" type="text" v-model="purchase_qty" />
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
              <label id="modal-text-box-label" for="purchase-price-input"><h5>Purchase Price:</h5></label>
              <input class="text-input" id="purchase-price-input" type="text" v-model="update_purchase_price" />
            </div>
            <div>
              <label for="purchase-quantity-input" id="modal-text-box-label"><h5>Purchase Quantity:</h5></label>
              <input class="text-input" id="purchase-quantity-input" type="text" v-model="update_purchase_qty" />
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
          <label for="purchase-quantity-input">Purchase Quantity:</label>
          <input id="purchase-quantity-input" type="text" v-model="update_purchase_qty" />
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
    <div v-if="isLoggedIn()" id="group-area">
      <div id="user-group-header">
        <h1>Groups:</h1>
        <div id="create-group-button">
          <a href="/#/groups/new" class="btn btn-success btn-icon-split">
            <span class="icon text-white-50">
              <i class="fas fa-plus-circle"></i>
            </span>
            <span class="text">Create Group</span>
          </a>
          <!-- <button v-on:click="transactionNewRouter()">Add Transaction</button> -->
        </div>
        <div id="create-group-button">
          <a href="/#/groups" class="btn btn-primary btn-icon-split">
            <span class="icon text-white-50">
              <i class="fas fa-search"></i>
            </span>
            <span class="text">Find Group</span>
          </a>
          <!-- <button v-on:click="transactionNewRouter()">Add Transaction</button> -->
        </div>
      </div>
      <div id="group-flexbox">
        <div v-if="noGroups()">
          <div class="card shadow mb-4" id="no-group-card">
            <div class="card-header py-3">
              <h5 class="m-0 font-weight-bold text-primary">Funny Money Groups!</h5>
            </div>
            <div class="card-body">
              <p>
                This app was built so users can safely and easily share their investment strategies. Get started by
                adding a transaction and then join a group or create a new one with the buttons above!
              </p>
            </div>
          </div>
        </div>
        <div v-for="group in user_info.groups" :key="group.id" id="group-flexbox-item" class="card shadow mb-4">
          <router-link v-bind:to="`groups/${group.id}`">
            <div class="card-header py-3">
              <h5 class="m-0 font-weight-bold text-primary">{{ group.name }}</h5>
            </div>
            <div class="card-body">
              <p>
                {{ group.description }}
              </p>
            </div>
          </router-link>
        </div>
      </div>
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
        var num = transaction.current_info["changePercent"] * 100;
        return num.toFixed(2);
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
      num = num || 0;
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
      num = num || 0;
      return num.toFixed(3);
    },
    filteredPortfolio: function () {
      let result = this.portfolio;
      // console.log(this.portfolio[0]);
      return result.sort(function (a, b) {
        return b.current_info.changePercent - a.current_info.changePercent;
      });
    },
  },
  methods: {
    indexPortfolio: function () {
      axios.get("/api/transactions").then((response) => {
        // console.log(response.data);
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
      if (confirm("Are you sure you want to delete this transaction?")) {
        axios.delete("/api/transactions/" + transaction.id).then((response) => {
          console.log("Transaction Deleted", response.data);
          // var index = this.transactions.indexOf(transaction);
          this.portfolio.splice(this.portfolio.indexOf(transaction), 1);
        });
      }
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
    noGroups: function () {
      if (this.user_info.groups.length === 0) {
        return true;
      }
    },
    noTransactions: function () {
      if (this.user_info.transactions.length === 0) {
        return true;
      }
    },
  },
};
</script>
