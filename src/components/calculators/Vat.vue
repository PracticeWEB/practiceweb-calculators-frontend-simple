<!--
Vat calculator component.
-->
<template>
    <div class="calculator-container practiceweb-calculator">
    <form @submit.prevent="submitCalculation">
        <label>
            Value
            <input type="number" step="0.01" v-model.number="input.value"/>
        </label>
        <label>
            VAT included?
            Yes <input type="radio" v-model="input.included" value="1"/>
            No <input type="radio" v-model="input.included" value="0"/>
        </label>
        <button type="submit">Calculate</button>
    </form>
    <div v-if="Object.keys(output).length > 0">
        <ul>
            <li><span>Net: {{ output.net | currency }} </span></li>
            <li><span>VAT: {{ output.vat | currency }} </span></li>
            <li><span>Gross: {{ output.gross | currency }} </span></li>
        </ul>
    </div>
    </div>
</template>

<script>

import CalculatorAPIMixin from '../../mixins/CalculatorAPI'
export default {
  name: 'Vat',
  mixins: [CalculatorAPIMixin],
  created: function () {
    this.servicePath = '/calculator/vat'
  },
  data: function () {
    return {
      input: {
        included: 1,
        value: 0
      },
      output: {}
    }
  }
}
</script>
