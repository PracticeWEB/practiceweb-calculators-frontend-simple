<template>
    <div class="practiceweb-calculator">
        <form @submit.prevent="submitCalculation">
            <label>Annual Mileage: <input type="number" min="1" v-model.number="input.annualMileage"></label>
            <label>Price per Litre: <input type="number" min="1" v-model.number="input.pricePerLitre"></label>
            <label>Miles per Gallon: <input type="number" min="1" v-model.number="input.milesPerGallon"></label>
            <button type="submit">Calculate</button>
        </form>
        <div v-if="Object.keys(output).length > 0">
            <span>Fuel Cost: {{ output.fuelCost | currency }} </span>
        </div>
    </div>
</template>

<script>
import CalculatorAPIMixin from '../../mixins/CalculatorAPI'
export default {
  name: 'FuelCost',
  mixins: [CalculatorAPIMixin],
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
  },
}
</script>
