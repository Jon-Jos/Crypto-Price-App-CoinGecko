import axios from 'axios'
import { create } from 'zustand' // copied from  https://github.com/pmndrs/zustand

const showStore = create((set) => ({
    fetchData: () => {
        console.log("hey");
    },
}));

export default homeStore;