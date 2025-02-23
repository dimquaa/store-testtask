<template>
    <div style="padding: 20px;">
        <a-list item-layout="horizontal" :data-source="cart">
            <a-list-item slot="renderItem" slot-scope="{productName, GroupName, productId, groupId }, productIndex">
                <a-list-item-meta>
                    <span slot="title">{{ productName }}</span>
                </a-list-item-meta>
                <a-tag slot="actions" color="orange">
                    {{ GroupName }}
                </a-tag>
                <a-input-number slot="actions" style="width: 60px;" v-model="cart[productIndex].quantity" />
                <a-tag slot="actions" style="width: 70px;text-align: center;" :color="courseColor">₽ {{
                    getStateData[groupId].products[productId]['priceRUB'] }}</a-tag>
                <a-button slot="actions" type="danger" icon="delete" @click="removeFromCart({ productId, groupId })" />
            </a-list-item>
        </a-list>
        <a-statistic title="Общая стоимость:" v-model="totalSumm" style="margin-top: 50px" />
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters(['cart', 'getStateData', 'courseColor']),
        totalSumm() {
            return this.cart.reduce((acc, val) => acc + this.getStateData[val.groupId].products[val.productId]['priceRUB'] * val.quantity, 0)
        }
    },
    methods: {
        ...mapMutations(['removeFromCart']),
    },
}
</script>
