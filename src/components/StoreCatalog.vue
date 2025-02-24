<template>
    <div class="main-block">
        <a-collapse style="margin: 10px;">
            <a-collapse-panel v-for="({ products, title }, key) in getStateData" :key="key" :header="title" :disabled="!Object.keys(products).length">
                <a-list item-layout="horizontal" :data-source="Object.values(products)">
                    <a-list-item slot="renderItem" slot-scope="product">
                        <a-list-item-meta>
                            <span slot="title">{{ product.productName }} ({{ product.remainder }})</span>
                        </a-list-item-meta>
                        <a-tag slot="actions" class="price-tag" :color="courseColor">₽ {{ product.priceRUB }}</a-tag>
                        <a-button slot="actions" @click="addProductsInCart(product)" type="primary" icon="shopping-cart">
                            Купить
                        </a-button>
                    </a-list-item>
                </a-list>
            </a-collapse-panel>
        </a-collapse>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    computed: {
        ...mapGetters(['getStateData', 'courseColor'])
    },
    methods: {
        ...mapMutations(['addProductsInCart']),
    }
}
</script>