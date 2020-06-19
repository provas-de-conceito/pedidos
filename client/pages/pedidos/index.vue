<template>
  <v-data-table :headers="headers" :items="items" :items-per-page="10" class="elevation-1">
    <template slot="top">
      <h4>Lista de pedidos</h4>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import AuthMiddleware from '../../middleware/auth'

@Component({
  middleware: AuthMiddleware
})
export default class Pedidos extends Vue {
  headers = [
    { text: 'ID', value: 'id', sortable: false, align: 'left' },
    { text: 'Data', value: 'data', sortable: false, align: 'left' }
  ];

  items = [];

  mounted () {
    this.$store.dispatch('allPedidos').then((res) => {
      this.items = res.data.allPedidos
    })
  }
}
</script>

<style></style>
