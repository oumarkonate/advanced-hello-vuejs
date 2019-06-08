import Vue from 'vue';
import newProduct from './new-product';
import productList from './product-list';

const product = new Vue({
    el: '#app',
    components: {newProduct, productList},
    template:
        `<div class="c-stock">
            <div v-if="product_amount" v-bind:title="product_title_not_empty" class="c-stock__product">
                Le nombre total de produits est: {{product_amount}}
            </div>

            <div v-else v-bind:title="product_title_empty" class="c-stock__product">
                Aucun produit en stock
            </div>

            <!-- Include product-list component -->
            <product-list 
                v-on:delete-product="deleteProduct" 
                v-bind:productLists="products">
            </product-list>

            <!-- Include new-product component -->
            <new-product 
                v-on:update-product-list="updateProductList">
            </new-product>

        </div>`,
    data: {
        products: [],
        product_amount: 0,
        product_title_not_empty: 'Il s\'agit du nombre de produits en stock',
        product_title_empty: 'Aucun produit n\'est disponible',
    },
    mounted: function () {
        fetch('/products/list/all/', {
            method: "GET"
        }).then(function(response) {
            response.json().then(function (response) {
                // Update products list on DOM
                product.products = response;
                product.product_amount = response.length;
            })
        }). catch(function (error) {
            console.log("Error mounted", error);
        })
    },
    methods: {
        updateProductList(event) {
            fetch('/products/new/', {
                method: "POST",
                body: event
            }).then(function(response) {
                response.json().then(function (response) {
                    // Update products list on DOM
                    product.products = response;
                    product.product_amount = response.length;
                })
            }). catch(function (error) {
                console.log("Error updateProductList", error);
            })
        },
        deleteProduct(event) {
            fetch(`/products/list/delete/${event}`, {
                method: "GET",
            }).then(function(response) {
                response.json().then(function (response) {
                    // Update products list on DOM
                    product.products = response;
                    product.product_amount = response.length;
                })
            }). catch(function (error) {
                console.log("Error deleteProduct", error);
            })
        }
    }
});
