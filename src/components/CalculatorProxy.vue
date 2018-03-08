<template>
    <component :is="calculatorName" :serviceRoot="serviceRoot"></component>
</template>
<script>

import components from '@/components/calculators'

export default {
  name: 'CalculatorProxy',
  props: ['calculatorName', 'serviceRoot'],
  components: components,
  data: () => {
    return {}
  }
}
</script>
