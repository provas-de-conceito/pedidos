<template>
  <div id="app">
    <div class="app-container">
      <form @submit.prevent="greet">
        <InputText v-model="texto" type="text" />
        <Button type="submit" label="Submit" />
        <h3>{{ mensagem }}</h3>
      </form>
    </div>
    <Toast />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data: () => {
    return {
      mensagem: '',
      texto: ''
    };
  },
  methods: {
    greet() {
      this.$toast.add({ severity: 'info', summary: 'Hello ' + this.texto });
      this.mensagem = 'Hello ' + this.texto;
    }
  }
});
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
