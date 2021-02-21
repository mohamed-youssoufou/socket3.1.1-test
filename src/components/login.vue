<template>
  <div>
    <form @submit.prevent="sendMessage">
      <div class="row">
        <div class="col-md-12">
          <label for="">Login</label>
          <input type="text" v-model="user.username" name="" id="" />
        </div>
        <div class="col-md-12">
          <label for="">Password</label>
          <input type="password" v-model="user.password" id="" />
        </div>
        <div class="col-md-12">
          <input type="submit" value="connection" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters("getSocket"),
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();
      let user = localStorage.getItem("test_socket")
        ? localStorage.getItem("test_socket")
        : "";
      if (user.length == 0) {
        console.log("if");
        let user = [];
        user.push(this.user);
        localStorage.setItem("test_socket", JSON.stringify(user));
      } else {
        user = JSON.parse(user);
        user.push(this.user);
        localStorage.setItem("test_socket", JSON.stringify(user));
      }
      this.$store.getters.getSocket.emit("init", this.user);
      this.$router.push('/home');
    },
    // logSocket(data) {},
  },
};
</script>

<style>
</style>