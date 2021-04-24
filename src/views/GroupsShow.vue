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
    getUserPortfolio: function (user) {
      axios.get("/api/user/" + user.id);
    },
  },
};
</script>
