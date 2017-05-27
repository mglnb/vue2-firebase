<template>
  <div>
    <div v-for="post in posts">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">{{post.title}}</p>
              <p class="subtitle is-6">by user (todo)</p>
            </div>
          </div>

          <div class="content">
            {{post.message}}
            <br>
            <small>date</small>
          </div>
        </div>
        <footer class="card-footer" v-if="post.uid===user.uid">
          <a class="card-footer-item" @click="editPost">Editar</a>
          <a class="card-footer-item" @click="deletePost">Remover</a>
        </footer>
      </div>
      <br/>
    </div>


  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'home',
    data() {
      return {
        post: {
          title: ''
        }
      }
    },
    computed: {
      user() {
        return this.$store.getters.user
      }
    },
    firebase: {
      posts: firebase.database().ref('posts')
    },
    methods: {
      addPost: function () {
        this.post.uid = firebase.auth().currentUser.uid
        this.$firebaseRefs.posts.push(this.post).then(
          (r) => {
            this.post = { title: '', uid: '' }
          },
          (e) => {
            console.warn(e)
          }
        )
      },
      deletePost() {
        console.log('delete')
      },
      editPost() {
        console.log('edit')
      }

    }
  }

</script>


<style scoped>

</style>
