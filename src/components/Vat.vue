<template>
    <div class="calculator-container">
    <form @submit.prevent="submitCalculation">
        <label>
            Value
            <input type="number" v-model.number="input.value"/>
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

import axios from 'axios'
export default {
  name: 'Vat',
  data: function () {
    return {
      input: {
        included: 1,
        value: 0
      },
      output: {}
    }
  },
  methods: {
    submitCalculation (event) {
      // TODO can we avoid force update?
      let vm = this
      axios.post('http://kong.dev.sift.com:8000/calculator/vat', this.input).then((response) => {
        vm.output = response.data
        vm.$forceUpdate()
      })
    }
  },
  filters: {
    // TODO move these
    currency: (value) => {
      // TODO handle casting.
      var formatter = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 0
      })
      return formatter.format(value)
    }
  }
}
</script>
