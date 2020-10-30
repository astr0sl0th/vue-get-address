<template>
  <div class="getaddress">
    <div class="demoComponent">
      <h3>Find Demo</h3>
      <Find
        apiKey=""
        @address-data="addressData"
        :sort="true"
      />
    </div>
  </div>
</template>

<script>
import Find from './components/Find/Find';

export default {
  name: 'App',
  components: { Find },
  methods: {
    addressData(e) {
      console.log(e);
    },
  },
};
</script>

<style>
* {
  /* Soft reset */
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
}

.getaddress {
  height: 100vh;
  display: grid;
  justify-content: center;
  align-content: center;
}
.demoComponent {
  margin-bottom: 30px;
}
.demoComponent > h3 {
  margin-bottom: 15px;
}
</style>
