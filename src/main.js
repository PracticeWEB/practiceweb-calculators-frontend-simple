// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

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
document.querySelectorAll('.practiceweb-calculator').forEach((calculator) => {
  let calculatorName = calculator.dataset.calculatorname
  // Service root should be the base path to the API server.
  let serviceRoot = calculator.dataset.serviceroot
  // Extract the style.
  let calculatorStyle = calculator.dataset.calculatorstyle

  // See if the requested calculatorComponent has been loaded yet.
  if (!Vue.options.components[calculatorName]) {
    // This notation returns a promise so we can lazy load the component.
    Vue.component(calculatorName, () => import(`@/components/calculators/${calculatorName}`))
  }

  // Create a template that we dynamically load a component from.
  let template = '<component :is="calculatorName" :serviceRoot="serviceRoot" :calculatorStyle="calculatorStyle"/>'
  /* eslint-disable no-new */
  new Vue({
    el: calculator,
    template: template,
    data: {
      calculatorName: calculatorName,
      serviceRoot: serviceRoot,
      calculatorStyle: calculatorStyle
    }
  })
})
