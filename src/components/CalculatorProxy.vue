<!--
CalculatorProxy component.
This handles loading a calculator component based on the supplied properties.
-->
<template>
    <component :is="calculatorName" :serviceRoot="serviceRoot" :calculatorStyle="calculatorStyle"></component>
</template>
<script>

// Import all caclulators registered in the index.
import components from '@/components/calculators'

export default {
  name: 'CalculatorProxy',
  props: ['calculatorName', 'serviceRoot', 'calculatorStyle'],
  components: components,
  data: () => {
    return {}
  }
}
</script>
