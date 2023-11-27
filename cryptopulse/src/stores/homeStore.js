import axios from 'axios'
import debounce from '../helpers/debounce'
import { create } from 'zustand' // copied from  https://github.com/pmndrs/zustand

const homeStore = create((set) => ({
    coins: [],
    trending: [],
    query: '',

    setQuery: (e) => {
        set({ query: e.target.value })
        homeStore.getState().searchCoins()
    },

    searchCoins: debounce(async () => {
        const { query, trending } = homeStore.getState();

        if (query.length > 2) {
            const res = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`);

            const coins = res.data.coins.map((coin) => {
                return {
                    name: coin.name,
                    image: coin.large,
                    id: coin.id,
                };
            });
            set({ coins });
        } else {
            set({ coins: trending });
        }
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
        set({ coins, trending: coins })
    }
}))

export default homeStore;