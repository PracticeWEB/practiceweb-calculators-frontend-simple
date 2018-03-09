// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './App'
import CalculatorProxy from './components/CalculatorProxy'

Vue.config.productionTip = false

// Common filters.
// Currency filter for £ values.
Vue.filter('currency', (value) => {
  // Create formatter object.
  var formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0
  })
  return formatter.format(value)
})

// Get all calculators on the page by class.
let calculators = document.getElementsByClassName('practiceweb-calculator')
for (let calculator of calculators) {
  // Extract the calculator name.
  let calculatorName = calculator.dataset.calculatorname
  // Service root should be the base path to the API server.
  let serviceRoot = calculator.dataset.serviceroot
  // Create the template HTML.
  let template = '<CalculatorProxy calculatorName="' + calculatorName + '" serviceRoot="' + serviceRoot + '"/>'
  // Create the Vue element.
  /* eslint-disable no-new */
  new Vue({
    el: calculator,
    components: { CalculatorProxy },
    template: template
  })
}
