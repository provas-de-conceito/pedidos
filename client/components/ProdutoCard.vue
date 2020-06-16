<template>
  <Card style="width: 25em">
    <template slot="header">
      <img
        height="200px"
        width="400px"
        alt="user header"
        src="https://picsum.photos/id/666/400/200.jpg"
      />
    </template>
    <template slot="content">{{ nome }}</template>
    <template slot="footer">
      {{ preco }}
      <Button
        icon="pi pi-shopping-cart"
        class="p-button-success p-button-rounded"
      />
    </template>
  </Card>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class ProdutoCard extends Vue {
  id?: number | null;
  preco = 'Preço Produto';
  nome = 'Nome Produto';
}
</script>

<style scoped></style>
