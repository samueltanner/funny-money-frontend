<template>
  <div class="groups-show">
    <div id="group-header">
      <h1>{{ group.group_name }}</h1>
      <p>
        <em>"{{ group.group_description }}"</em>
      </p>
    </div>
    <div id="group-members">
      <h1>Group Members:</h1>
      <div v-for="member in group.members" :key="member.id">
        <p>{{ member.username }}</p>

        <!-- <h2>{{ getUserPortfolio(member) }}</h2>  -->
        <!-- <div v-for="transactions in user_transactions" :key="transactions.id">
          <p>{{ transactions }}</p>
        </div> -->
        <div v-for="transaction in member.transactions" :key="transaction.id">
          {{ transaction.symbol }} @ {{ transaction.purchase_price }}
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
      user_transactions: {},
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
      });
    },
    // getUserPortfolio: function (user) {
    //   axios.get("/api/users/" + user.id).then((response) => {
    //     console.log(response.data);
    //     this.user_transactions = response.data;
    //   });
    // },
  },
};
</script>
