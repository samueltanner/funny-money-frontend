<template>
  <div id="app">
    <div id="nav">
      <span>
        <router-link to="/">Home</router-link>
        |
      </span>
      <span>
        <router-link to="/about">About</router-link>
        |
      </span>
      <span v-if="!isLoggedIn()">
        <router-link to="/signup">Signup</router-link>
        |
      </span>
      <span v-if="!isLoggedIn()">
        <router-link to="/login">Login</router-link>
        |
      </span>
      <span v-if="isLoggedIn()">
        <router-link to="/logout">Logout</router-link>
        |
      </span>
    </div>
    <router-view />
  </div>
</template>

<style>
h1 {
}
</style>

<script>
export default {
  methods: {
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
    getUserId: function () {
      return localStorage.getItem("user_id");
    },
  },
};
</script>
