<template>
  <div class="groups-show">
    <div id="group-header">
      <h1>{{ group.group_name }}</h1>
      <p>
        <em>"{{ group.group_description }}"</em>
      </p>
    </div>
    <div v-for="(member, index) in group_data" :key="member.id">
      <h3>{{ member.username }}</h3>
      <h3>Portfolio Value: ${{ user_portfolio_values[index] }}</h3>
      <p>{{ member.username }}'s Portfolio:</p>
      <div>
        <table>
          <thead>
            <th>Symbol</th>
            <th>Gain/Loss %</th>
            <th>Day Change</th>
            <th>Percent of Portfolio</th>
          </thead>
          <tbody v-for="transaction in member.transactions" :key="transaction.id">
            <td>{{ transaction.symbol }}</td>
            <td>{{ gain_loss_percent(transaction) }}%</td>
            <td>${{ transaction.current_info["change"] }} ({{ transaction.current_info["changePercent"] * 100 }}%)</td>
            <td>{{ percent_of_portfolio(transaction) }}%</td>
          </tbody>
        </table>
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
    };
  },
  created: function () {
    this.showGroup();
  },

  methods: {
    showGroup: function () {
      axios.get("/api/groups/" + this.$route.params.id).then((response) => {
        console.log(response.data);
        this.group = response.data;
        response.data.members.map((user) => this.getUserData(user.id));
      });
    },
    getUserData: function (member) {
      axios.get("/api/users/" + member).then((response) => {
        this.portfolio_market_value(response.data);
        this.group_data.push(response.data);
      });
    },
    portfolio_market_value: function (member) {
      var user_transactions_array = [];
      member.transactions.map(function (transaction) {
        user_transactions_array.push(transaction.purchase_qty * transaction.current_info["latestPrice"]);
      });
      this.user_portfolio_values.push(user_transactions_array.reduce((a, b) => a + b, 0));
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
    percent_of_portfolio: function (transaction) {
      var num = (transaction.current_info["latestPrice"] * transaction.purchase_qty) / this.user_portfolio_values[1];
      return (num * 100).toFixed(2);
      // console.log(this.user_portfolio_values[0]);
    },
  },
  computed: {},
};
</script>
