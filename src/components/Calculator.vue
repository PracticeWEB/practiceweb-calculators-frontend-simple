<template>
    <component :is="calculatorName"></component>
</template>
<script>
export default {
  name: 'Calculator',
  data: () => { return {} }
}
// TODO mixins?
// TODO dispatch to service
</script>
