<template>
  <div class="groups">
    <h1>Your Groups:</h1>
    <div v-for="group in user_info.groups" :key="group.id">
      <ul>
        <li>
          <h3>
            {{ group.name }}
          </h3>

          <router-link v-bind:to="`groups/${group.id}`">
            <!-- <button v-on:click="showGroup(group)">View Group</button> -->
            <button>View Group</button>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      user_info: [],
    };
  },
  created: function () {
    this.showUserInfo();
  },
  methods: {
    showUserInfo: function () {
      axios.get("/api/users/" + this.$route.params.id).then((response) => {
        console.log(response.data);
        this.user_info = response.data;
      });
    },
    // showGroup: function (group) {
    //   console.log(group);
    // },
  },
};
</script>
