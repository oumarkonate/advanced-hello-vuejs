<template>
    <ul>
        <li v-for="product in productLists" class="c-product-list">
            {{product.name}} : {{product.description}}. Le nombre restant en stock est
            <span class="c-product-list__number">{{product.amount}}</span>.
            <label class="c-product-list__delete" v-on:click="$emit('delete-product', product.id)">supprimer</label>
        </li>
    </ul>
</template>

<script lang="js">
    export default {
        name: 'product-list',
        props: ['productLists'],
    };
</script>

<style lang="scss" scoped>
    .c-product-list {
        padding: 5px 0;
    &__number {
         background-color: darkgoldenrod;
     }
    &__delete {
         width:100px;
         height:21px;
         border:1px solid;
     }
    }
</style>

