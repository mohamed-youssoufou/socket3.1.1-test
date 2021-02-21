<template>
  <div class="card mt-3">
    <div class="">
      all user
      <ul>
        <li v-for="user in users" :key="user.socketId">
          <router-link :to="{ name: 'chat', params: { id: user.socketId } }">{{
            user
          }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      user: "",
      message: "",
      messages: [],
    };
  },
  watch: {},
  methods: {
    sendMessage(e) {
      e.preventDefault();
      this.$store.getters.getSocket.emit("SEND_MESSAGE", {
        user: this.user,
        message: this.message,
      });
      this.message = "";
    },
  },
  mounted() {
    //this.users = JSON.parse(localStorage.getItem('test_socket'));
    this.$store.getters.getSocket.on("home", (data) => {
      console.log("lol");
      this.users = data;
    });
  },
};
</script>

<style>
</style>