<template>
  <div class="test">
    <button id="show-modal" @click="showModal = true">show modal</button>
    <modal v-if="showModal" @close="showModal = false">
      <p>here is the modal content</p>
      <div slot="header">
        <button class="modal-default-button" @click="showModal = false">Close</button>
      </div>
    </modal>
  </div>
</template>

<script>
import axios from "axios";
import "vue-search-select/dist/VueSearchSelect.css";

export default {
  data() {
    return {
      searchItem: "",
      itemList: {},
      apiLoaded: false,
      showModal: false,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // getList() {
    //   axios.get(this.apiUrl).then((response) => {
    //     this.itemList = response.data;
    //     this.apiLoaded = true;
    //   });
    // },
    searchSymbol: function (symbol) {
      axios
        .get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=2YF1ZH8GDS8DFHA2`)
        .then((response) => {
          console.log(response.data);
          this.itemList = response.data;
          this.apiLoaded = true;
        });
    },
  },
};
</script>
