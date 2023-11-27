import axios from 'axios'
import debounce from '../helpers/debounce'
import { create } from 'zustand' // copied from  https://github.com/pmndrs/zustand

const homeStore = create((set) => ({
    coins: [],
    query: '',

    setQuery: (e) => {
        set({ query: e.target.value })
        homeStore.getState().searchCoins()
    },

    searchCoins: debounce(async () => {
        const { query } = homeStore.getState();
        const res = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`)
        console.log(res.data)
    }, 500), // It wait 500 ms to search
    fetchCoins: async () => {
        // the below is a promise so async await is used!
        const res = await axios.get('https://api.coingecko.com/api/v3/search/trending')     // link source: https://www.coingecko.com/api/documentation
        const coins = res.data.coins.map(coin => {
            return {
                name: coin.item.name,
                image: coin.item.large,
                id: coin.item.id,
                priceBtc: coin.item.price_btc
            }
        })
        set({ coins })
    }
}))

export default homeStore;