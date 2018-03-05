<template>
  <div id="app">
    <img src="./assets/logo.png">
  <!--  <HelloWorld/>-->
    <!-- <Vat/> -->
<!-- USING IS TO DEMO ALT STYLE -->
    <!--<div is="PropertyTaxes"></div> -->
    <!-- TODO links -->
    <ul>
    <li>
       <a href="#" v-on:click="currentView='HelloWorld'">Hello World</a>
    </li>
    <li>
      <a href="#" v-on:click="currentView='Vat'">VAT</a>
    </li>
    <li>
      <a href="#" v-on:click="currentView='PropertyTaxes'">Property Taxes</a>
    </li>
    </ul>
    <div class="view-container" v-bind:is="currentView"></div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Vat from './components/Vat'
import PropertyTaxes from './components/PropertyTaxes'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Vat,
    PropertyTaxes
  },
  data: () => {
    return {
      currentView: 'HelloWorld'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
