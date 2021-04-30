<template>
  <div class="groups">
    <div id="your-groups-window">
      <h1>Your Groups:</h1>
      <a v-on:click="groupNewRouter()" id="create-group-button" class="btn btn-success btn-icon-split">
        <span class="icon text-white-50">
          <i class="fas fa-plus-circle"></i>
        </span>
        <span class="text">Create a Group</span>
      </a>

      <div id="group-flexbox">
        <div v-for="group in user_info.groups" :key="group.id" id="group-flexbox-item" class="card shadow mb-4">
          <router-link v-bind:to="`groups/${group.id}`">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">{{ group.name }}</h6>
            </div>
            <div class="card-body">
              {{ group.description }}
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <hr />

    <div id="all-groups-window">
      <h1>All Groups:</h1>
      <!-- <div>
        <label id="group-title-search" class="group-search" for="search">Search Groups:</label>
        <input
          class="group-search"
          type="text"
          name="group-search"
          id="search"
          v-model="groupFilter"
          list="group-names"
        />
      </div>
      <datalist id="group-names">
        <option v-for="group in groups" :key="group.id">{{ group.name }}</option>
      </datalist> -->

      <div id="group-flexbox">
        <div v-for="group in groups" :key="group.id" id="group-flexbox-item" class="card shadow mb-4">
          <router-link v-bind:to="`groups/${group.id}`">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">{{ group.group_name }}</h6>
            </div>
            <div class="card-body">
              {{ group.group_description }}
            </div>
          </router-link>
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
      user_info: [],
      groups: [],
      groupFilter: "",
    };
  },
  created: function () {
    this.showUserInfo();
    this.indexGroups();
  },
  methods: {
    showUserInfo: function () {
      axios.get("/api/users/" + localStorage.getItem("user_id")).then((response) => {
        console.log(response.data);
        this.user_info = response.data;
      });
    },
    indexGroups() {
      axios.get("/api/groups").then((response) => {
        console.log(response.data);
        this.groups = response.data;
      });
    },
    groupNewRouter: function () {
      this.$router.push("/groups/new");
    },
    // showGroup: function (group) {
    //   console.log(group);
    // },
  },
};
</script>
