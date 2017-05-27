<template>
  <div>
    <h2> Adicionar um Post </h2>
    <div class="field">
      <label class="label">Título</label>
      <p class="control">
        <input class="input" type="text" placeholder="Título" v-model="post.title">
      </p>
    </div>
    <div class="field">
      <label class="label">Mensagem</label>
      <p class="control">
        <textarea class="textarea" placeholder="" v-model="post.message"></textarea>
      </p>
    </div>
    <div class="field is-grouped" v-if="user">
      <p class="control">
        <button class="button is-primary" @click="addPost">Enviar</button>
      </p>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'AddPost',
    data () {
      return {
        post: {
          title: '',
          message: ''
        }
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      }
    },
    firebase: {
      posts: firebase.database().ref('posts')
    },
    methods: {
      addPost: function () {
        this.post.uid = firebase.auth().currentUser.uid

        if (this.post.title === '' || this.post.message === '') {
          return false
        }

        this.$firebaseRefs.posts.push(this.post).then(
          (r) => {
            this.post = { title: '', message: '', uid: '' }
            this.$router.push('/')
          },
          (e) => {
            console.warn(e)
          }
        )
      }
    }
  }

</script>
