<template>
  <div>
    <div class="card-body">
      <div class="card-title">
        <h3>Chat Group</h3>
        <hr />
      </div>
      <div class="card-body">
        <div class="messages">
          {{ messages }}
        </div>
      </div>
    </div>
    <div class="card-footer">
      <form @submit.prevent="sendMessage">
        <div class="gorm-group">
          <label for="user">{{ user.username }} :</label>
        </div>
        <div class="gorm-group pb-3">
          <label for="message">Message:</label>
          <input type="text" v-model="user.message" class="form-control" />
        </div>
        <button type="submit" class="btn btn-success">Envoyer</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      user: {
        socketId: this.$route.params.id,
        username: "",
        message: "",
      },
    };
  },

  methods: {
    sendMessage(e) {
      e.preventDefault();
      this.$store.getters.getSocket.emit(
        "SEND_MESSAGE",
        this.user.socketId,
        this.user.message
      );
    },
    userConnected() {
      this.user.username = JSON.parse(
        localStorage.getItem("test_socket")
      )[0].username;
      console.log("yet", this.user.username);
    },
  },

  mounted() {
    this.userConnected();
    this.$store.getters.getSocket.on("SEND_MESSAGE", (socketId, data) => {
      console.log("ici", socketId);
      this.messages.push(data);
    });
  },
};
</script>

<style>
</style>