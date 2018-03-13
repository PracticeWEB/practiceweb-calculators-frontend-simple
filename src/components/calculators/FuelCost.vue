<!--
Fuel Cost calculator.
-->
<template>
    <div class="practiceweb-calculator">
        <form @submit.prevent="submitCalculation">
            <label>Annual Mileage: <input type="number" min="1" v-model.number="input.annualMileage"></label>
            <label>Price per Litre: <input type="number" min="1" v-model.number="input.pricePerLitre"></label>
            <label>Miles per Gallon: <input type="number" min="1" v-model.number="input.milesPerGallon"></label>
            <button type="submit" :class="classes.button">Calculate</button>
        </form>
        <div v-if="Object.keys(output).length > 0">
            <span>Fuel Cost: {{ output.fuelCost | currency }} </span>
        </div>
    </div>
</template>

<script>
import CalculatorAPIMixin from '../../mixins/CalculatorAPI'
import CalculatorStyle from '../../mixins/CalculatorStyle'
export default {
  name: 'FuelCost',
  mixins: [CalculatorAPIMixin, CalculatorStyle],
  created: function () {
    this.servicePath = '/calculator/fuelcost'
  },
  data: () => {
    return {
      input: {
        annualMileage: 1,
        pricePerLitre: 1,
        milesPerGallon: 1
      },
      output: {}
    }
  }
}
</script>
