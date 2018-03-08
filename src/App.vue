<template>
  <div id="app">
    <ul>
      <li><a href="#" @click="calculatorName='PropertyTaxes'">Property</a></li>
      <li><a href="#" @click="calculatorName='Vat'">VAT</a></li>
    </ul>
    <calculator-proxy v-if="calculatorName" :calculator-name="calculatorName"></calculator-proxy>
  </div>
</template>

<script>
import CalculatorProxy from './components/CalculatorProxy'

export default {
  name: 'App',
  components: {
    CalculatorProxy
  },
  props: ['calculatorName']
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
