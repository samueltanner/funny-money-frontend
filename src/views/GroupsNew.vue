<template>
  <div class="groups-new">
    <h1>Create a Group:</h1>
    <!-- <form> -->
      <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
            <li v-for="error in errors" :key="error.id">{{error}}</li>
            </ul>
          </p>
    <div id="group-new-input">
      <div>
        <label id="modal-text-box-label" for="group-name">Group Name:</label>
        <input v-model="group_name" type="text" name="group-name" id="group-name" />
      </div>
      <div>
        <label id="modal-text-box-label" for="group-description">Group Description:</label>
        <input v-model="group_description" type="text" name="group-description" id="group-description" />
      </div>
      <!-- <div>
        <label id="modal-text-box-label" for="group-private" class="switch">Private?:</label>
        <input v-model="group_private" type="checkbox" class="slider round" name="group-private" id="group-private" />
      </div> -->
      <button href="#" id="modal-button" type="submit" class="btn btn-success btn-icon-split" v-on:click="addGroup()">
        <span class="icon text-white-50">
          <i class="fas fa-plus-circle"></i>
        </span>
        <span class="text">Create Group</span>
      </button>
    </div>
    <!-- </form> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      group_name: "",
      group_description: "",
      group_private: "",
      errors: [],
    };
  },
  methods: {
    addGroup: function () {
      var params = {
        name: this.group_name,
        description: this.group_description,
        private: this.group_private,
      };
      axios
        .post("api/groups", params)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/groups/" + response.data.id);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(error.response);
        });
    },
  },
};
</script>
