<template>
  <div class="groups-show">
    <div id="group-header">
      <h1>{{ group.group_name }}</h1>
      <p>
        <em>"{{ group.group_description }}"</em>
      </p>
      <h2>Average Day Change: {{ group_day_change }}%</h2>
      <h2>Average All Time: {{ group_all_time_change.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}%</h2>
      <div v-if="!isHidden">
        <div v-if="inGroup()">
          <a
            v-on:click="
              joinGroup();
              isHidden = true;
            "
            id="join-group-button"
            class="btn btn-success btn-icon-split"
          >
            <span class="icon text-white-50">
              <i class="fas fa-plus-circle"></i>
            </span>
            <span class="text">Join Group</span>
          </a>
        </div>
      </div>
    </div>
    <hr />
    <div class="user-in-group-portfolio" v-for="(member, index) in group_data" :key="member.id" defer>
      <h2>
        {{ member.username }} | Day Change:
        {{ user_portfolio_values[index].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}% | All Time:
        {{ all_time_percents[index].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}%
      </h2>
      <!-- <h3>Day Change: {{ user_portfolio_values[index] }}%</h3> -->
      <!-- <h3>Portfolio Value: ${{ user_portfolio_values[index] }}</h3> -->
      <div>
        <!-- <table>
          <thead>
            <th>Symbol</th>
            <th>Gain/Loss %</th>
            <th>Day Change</th>
            <th>% of Portfolio</th>
          </thead>
          <tbody v-for="(transaction, index) in member.transactions" :key="transaction.id">
            <td>{{ transaction.symbol }}</td>
            <td>{{ gain_loss_percent(transaction) }}%</td>
            <td>${{ transaction.current_info["change"] }} ({{ day_percent_change(transaction) }}%)</td>
            <td>{{ percent_of_portfolio(member)[index] }}%</td>
          </tbody>
        </table>
        <br /> -->

        <div>
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h5 class="m-0 font-weight-bold text-primary">{{ member.username }}'s Holdings</h5>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                  <thead>
                    <tr>
                      <th>Symbol</th>
                      <th>Gain/Loss %</th>
                      <th>Day Change</th>
                      <th>% of Portfolio</th>
                    </tr>
                  </thead>
                  <tbody v-for="(transaction, index) in member.transactions" :key="transaction.id">
                    <td>{{ transaction.symbol }}</td>
                    <td>
                      {{
                        gain_loss_percent(transaction)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }}%
                    </td>
                    <td>
                      ${{ transaction.current_info["change"] }} ({{
                        day_percent_change(transaction)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }}%)
                    </td>
                    <td>{{ percent_of_portfolio(member)[index] }}%</td>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      group: {},
      group_data: [],
      user_transactions: {},
      user_portfolio_values: [],
      all_time_percents: [],
      members_ids: [],
      isHidden: false,
    };
  },
  created: function () {
    this.showGroup();
  },
  mounted: function () {},

  methods: {
    showGroup: function () {
      axios.get("/api/groups/" + this.$route.params.id).then((response) => {
        // console.log(response.data);
        this.group = response.data;
        response.data.members.map((user) => {
          // console.log(user.id);
          this.getUserData(user.id);
          this.members_ids.push(user.id);
          // console.log(this.members_ids);
        });
        console.log(this.members_ids);
      });
    },
    getUserData: function (member) {
      axios.get("/api/users/" + member).then((response) => {
        this.group_data.push(response.data);
        this.portfolio_day_change(response.data);
        this.portfolio_all_time_percent(response.data);
        // this.percent_of_portfolio(response.data);
      });
    },
    percent_of_portfolio: function (member) {
      this.user_percent_of_portfolio = [];
      var portfolio_value = 0;
      var transaction_market_values = [];
      var percent_values = [];
      member.transactions.map(function (transaction) {
        var current_value = transaction.purchase_qty * transaction.current_info["latestPrice"];
        transaction_market_values.push(current_value);
      });
      for (let i = 0; i < transaction_market_values.length; i++) {
        portfolio_value += transaction_market_values[i];
      }
      member.transactions.map(function (transaction) {
        var transaction_percent =
          ((transaction.purchase_qty * transaction.current_info["latestPrice"]) / portfolio_value) * 100;

        percent_values.push(transaction_percent.toFixed(1));
      });
      // console.log(percent_values);
      return percent_values;
    },
    portfolio_day_change: function (member) {
      var today_value_array = [];
      var yesterday_value_array = [];
      member.transactions.map(function (transaction) {
        today_value_array.push(transaction.purchase_qty * transaction.current_info["latestPrice"]);
      });
      member.transactions.map(function (transaction) {
        yesterday_value_array.push(transaction.purchase_qty * transaction.current_info["previousClose"]);
      });
      var today = today_value_array.reduce((a, b) => a + b, 0);
      var yesterday = yesterday_value_array.reduce((a, b) => a + b, 0);
      var percent_change = ((today - yesterday) / yesterday) * 100;
      percent_change.toFixed(2);

      if (percent_change > 0) {
        percent_change = "+" + percent_change.toFixed(2);
      } else {
        percent_change = percent_change.toFixed(2);
      }
      this.user_portfolio_values.push(percent_change);
      member["day_change"] = percent_change;
      // console.log(member);
      // this.user_portfolio_values.push();
    },
    portfolio_all_time_percent: function (member) {
      // sum of each transactions current value
      // sum of each transactions cost basis
      // (new - old) / old
      var today_value_array = [];
      var purchase_price_array = [];
      member.transactions.map(function (transaction) {
        today_value_array.push(transaction.purchase_qty * transaction.current_info["latestPrice"]);
      });
      member.transactions.map(function (transaction) {
        purchase_price_array.push(transaction.purchase_qty * transaction.purchase_price);
      });
      var today_total_value = today_value_array.reduce((a, b) => a + b, 0);
      var purchase_price_value = purchase_price_array.reduce((a, b) => a + b, 0);
      // console.log(purchase_price_array);
      var percent_change = ((today_total_value - purchase_price_value) / purchase_price_value) * 100;

      if (percent_change > 0) {
        percent_change = "+" + percent_change.toFixed(2);
      } else {
        percent_change = percent_change.toFixed(2);
      }
      this.all_time_percents.push(percent_change);
    },
    gain_loss_percent: function (transaction) {
      var num =
        ((transaction.current_info["latestPrice"] - transaction.purchase_price) / transaction.purchase_price) * 100;
      return num.toFixed(2);
    },
    market_value: function (transaction) {
      var num = transaction.purchase_qty * transaction.current_info["latestPrice"];
      return num.toFixed(2);
    },
    day_percent_change(transaction) {
      var num = transaction.current_info["changePercent"] * 100;
      return num.toFixed(3);
    },
    joinGroup: function () {
      var params = {
        id: this.group.id,
      };
      console.log("You are joining the group");
      axios.post("/api/groups/" + this.group.id + "/join", params).then((response) => {
        console.log(response.data);
        this.getUserData(localStorage.getItem("user_id"));
        this.members_ids.push(parseInt(localStorage.getItem("user_id")));
        console.log(this.members_ids);
        this.inGroup();
      });
    },
    inGroup: function () {
      var current_user_id = localStorage.getItem("user_id");
      current_user_id = parseInt(current_user_id);

      var members_ids = [];
      this.group.members.map(function (member) {
        members_ids.push(member.id);
      });
      // console.log(members_ids);

      this.members_ids = members_ids;

      if (members_ids.includes(current_user_id)) {
        return false;
      } else {
        return true;
      }
    },
  },
  computed: {
    group_day_change: function () {
      var number_of_users = this.user_portfolio_values.length;
      var total_value = [];
      this.user_portfolio_values.map(function (num) {
        total_value.push(parseFloat(num));
      });
      total_value = total_value.reduce((a, b) => a + b, 0) / number_of_users;
      if (total_value > 0) {
        total_value = "+" + total_value.toFixed(2);
      } else {
        total_value = total_value.toFixed(2);
      }
      return total_value;
    },
    group_all_time_change: function () {
      var number_of_users = this.user_portfolio_values.length;
      var total_value = [];
      this.all_time_percents.map(function (num) {
        total_value.push(parseFloat(num));
      });
      total_value = total_value.reduce((a, b) => a + b, 0) / number_of_users;
      if (total_value > 0) {
        total_value = "+" + total_value.toFixed(2);
      } else {
        total_value = total_value.toFixed(2);
      }
      return total_value;
    },
    group_data_sorted: function () {
      var result = this.group_data;
      return result.sort(function (a, b) {
        return a.day_change - b.day_change;
      });
      // return result;
    },
  },
};
</script>
