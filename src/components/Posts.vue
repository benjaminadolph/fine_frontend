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

// /posts wenn in production mode
const url = 'http://localhost:3000/posts/';

export default {
  name: 'Posts',
  async mounted() {
    try {
      const res = await axios.get(url);
      this.posts = res.data;
    } catch (err) {
      this.error = err.message;
    }
  },
  data() {
    return {
      posts: [],
      title: '',
      description: '',
    };
  },
  methods: {
    async createPost() {
      // Push new Post to MongoDB
      await axios.post(url, { title: this.title, description: this.description });
      // update the Data from MongoDB
      try {
        const res = await axios.get(url);
        this.posts = res.data;
      } catch (err) {
        this.error = err.message;
      }
    },
    async deletePost(id) {
      console.log(id);
      // Delete Post to MongoDB
      await axios.delete(`${url}${id}`);
      // update the Data from MongoDB
      try {
        const res = await axios.get(url);
        this.posts = res.data;
      } catch (err) {
        this.error = err.message;
      }
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
