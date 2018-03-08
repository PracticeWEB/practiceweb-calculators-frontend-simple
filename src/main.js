// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './App'
import CalculatorProxy from './components/CalculatorProxy'

Vue.config.productionTip = false

// Common filters.
Vue.filter('currency', (value) => {
  var formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0
  })
  return formatter.format(value)
})

// Build a base template from data attributes.
let calculators = document.getElementsByClassName('practiceweb-calculator')
for (let calculator of calculators) {
  // TODO add an id if one isn't set.
  console.log(calculator)
  let calculatorName = calculator.dataset.calculatorname
  let serviceRoot = calculator.dataset.serviceroot
  // let template = domTemplate.toString()
  let template = '<CalculatorProxy calculatorName="' + calculatorName + '" serviceRoot="' + serviceRoot + '"/>'
  console.log(template)
  /* eslint-disable no-new */
  new Vue({
    el: calculator,
    components: { CalculatorProxy },
    template: template
  })
  // TODO the above log shows that the collection has been modified. We need to either preserve the coll or
}
