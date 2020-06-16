<template>
  <client-only>
    <div>
      <br />
      <DataTable :value="produtos">
        <template slot="header">
          <div>Lista de produtos</div>
        </template>
        <Column
          v-for="col of columns"
          :key="col.field"
          :field="col.field"
          :header="col.header"
        ></Column>
      </DataTable>
    </div>
  </client-only>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { Produto } from '@/types';
import { produtosModule } from '@/store/produtos/consts';

@Component
export default class ProdutoCard extends Vue {
  @produtosModule.State('produtos')
  produtos!: Array<Produto>;

  columns = [
    { field: 'id', header: 'ID' },
    { field: 'nome', header: 'Nome' },
    { field: 'preco', header: 'Preço' }
  ];
}
</script>

<style></style>
