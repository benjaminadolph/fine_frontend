<template>
  <div>
    <h1>Items</h1>
    <div class="create-post">
      <label for="create-post">Create a Post</label>
      <input type="text" v-model="title" placeholder="Title">
      <input type="text" v-model="description" placeholder="Description">
      <button @click="createPost">Post</button>
    </div>
    <ul>
      <li
        @dblclick="deletePost(post._id)"
        v-for="post in posts"
        :key="post._id"
        v-text="post.title">
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Posts',
  data() {
    return {
      posts: [],
      title: '',
      description: '',
    };
  },
  computed: {
    ...mapGetters(['getUserProfile', 'getUserPosts']),
  },
  mounted() {
    this.$store.dispatch('GET_ALL_POSTS')
      .then(() => {
        this.posts = this.getUserPosts;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    getAllPosts() {
      this.$store.dispatch('GET_ALL_POSTS')
        .then(() => {
          this.posts = this.getUserPosts;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createPost() {
      this.$store.dispatch('CREATE_POST', {
        title: this.title,
        description: this.description,
      })
        .then(() => {
          this.posts = this.getUserPosts;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deletePost(id) {
      console.log(id);
      this.$store.dispatch('DELETE_POST', {
        post_id: id,
      })
        .then(() => {
          this.getAllPosts();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
