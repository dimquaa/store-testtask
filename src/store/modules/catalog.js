import { getNamesRequestN, getPricesRequestN } from "@/api/api"

export default {
    state: {
        data: {},
        names: {},
        prices: {}
    },
    getters: {
        getStateData(state) {
            return state.data
        },
    },
    actions: {
        async getNamesFromFile({ commit }) {
            const namesList = await getNamesRequestN();
            commit('updateNames', namesList)
        },
        async getPricesFromFile({ commit }) {
            const priceList = await getPricesRequestN();
            commit('updatePrices', priceList)
        },
        async getProductList({ dispatch, commit, rootState }) { // получаем все данные, обрабатываем и записываем в state
            await dispatch('getNamesFromFile')
            await dispatch('getPricesFromFile')
            commit('preparingData')
            commit('updateProductPrices', rootState.course)
        },
        async reloadData({ dispatch, commit, rootState }) { // отдельная функция для обновлнеия данных через интервал. Здесь обновляются только цены.
            await dispatch('getPricesFromFile')
            commit('preparingData')
            commit('updateProductPrices', rootState.course)
        }
    },
    mutations: {
        updatePrices(state, priceList) { // подготавливаем объект с ценами
            for (let { G: groupId, C: price, P: remainder, T: productId } of priceList?.Value?.Goods) {
                if (!(groupId in state.prices)) state.prices[groupId] = {}
                state.prices[groupId][productId] = { groupId, productId, price, remainder }
            }
        },
        updateNames(state, namesList) {
            state.names = namesList
        },
        preparingData(state) {
            let productList = {}
            for (let groupId in state.names) { // читаем данные из входящего объекта и подготавливаем для удобства дальнейшего использования
                var { B: Products, G: Title } = state.names[groupId]

                var productsArray = {};

                for (var productId in Products) {
                    if (state.prices[groupId] && state.prices[groupId][productId]) {
                        productsArray[productId] = Object.assign({
                            productName: Products[productId].N,
                            groupName: Title,
                            priceRUB: 1
                        }, state.prices[groupId][productId])
                    }
                }

                productList[groupId] = {
                    title: Title,
                    products: productsArray
                };
            }
            state.data = productList
        },
        updateProductPrices(state, course) { 
            for (let groupId in state.data) {
                for (let productId in state.data[groupId].products) {
                    state.data[groupId].products[productId]['priceRUB'] = state.data[groupId].products[productId]['price'] * course;
                }
            }
        }
    }
}