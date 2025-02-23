export default {
    state: {
        cart: [],
    },
    getters: {
        cart(state) {
            return state.cart;
        }
    },
    mutations: {
        addProductsInCart(state, value) {
            const itemIndex = state.cart.findIndex(product => product.groupId === value.groupId && product.productId === value.productId)
            if (itemIndex === -1) {
                state.cart.push({
                    productName: value.productName,
                    quantity: 1,
                    GroupName: value.groupName,
                    groupId: value.groupId,
                    productId: value.productId
                })
            } else {
                state.cart[itemIndex]['quantity']++
            }
        },
        removeFromCart(state, { groupId, productId }) {
            const itemIndex = state.cart.findIndex(product => product.groupId === groupId && product.productId === productId)
            if (itemIndex !== -1) {
                state.cart.splice(itemIndex, 1)
            }
        },
    },
}
