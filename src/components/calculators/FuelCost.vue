<!--
Fuel Cost calculator.
-->
<template>
    <div class="practiceweb-calculator">
      <div class="content-container">
        <div class="practiceweb-calculator-header--width">
          <h3 class="practiceweb-calculator-header">Fuel Cost Calculator</h3>
        </div>
        <form @submit.prevent="submitCalculation">
          <fieldset class="input-fields">
            <p class="input-fields__title">Annual Mileage:</p>
            <div class="form-group form-group--gross flex-wrap">
              <input type="number" min="1" v-model.number="input.annualMileage" step="0.01" class="input-field input-field--number">
            </div>
          </fieldset>
          <fieldset class="input-fields">
            <p class="input-fields__title">Price per Litre:</p>
            <div class="form-group form-group--gross flex-wrap">
              <input type="number" min="1" v-model.number="input.pricePerLitre" class="input-field input-field--number">
            </div>
          </fieldset>
          <fieldset class="input-fields">
            <p class="input-fields__title">Miles per Gallon:</p>
            <div class="form-group form-group--gross flex-wrap">
              <input type="number" min="1" v-model.number="input.milesPerGallon" step="0.01" class="input-field input-field--number">
            </div>
          </fieldset>
          <!---->
            <!--<label>Annual Mileage: <input type="number" min="1" v-model.number="input.annualMileage" step="0.01"></label>-->
            <!--<label>Price per Litre: <input type="number" min="1" v-model.number="input.pricePerLitre"></label>-->
            <!--<label>Miles per Gallon: <input type="number" min="1" v-model.number="input.milesPerGallon" step="0.01"></label>-->
            <button type="submit" class="calculate-button" :class="classes.button">Calculate</button>
        </form>
        <br>
        <div class="output" v-if="Object.keys(output).length > 0">
          <div class="output-list">
            <div class="sub-values flex flex-wrap">
              <dt class="value-label inline">Fuel Cost:</dt>
              <dd class="value-items inline">{{ output.fuelCost | currency }}</dd>
            </div>
          </div>
        <!--<div v-if="Object.keys(output).length > 0">-->
            <!--<span>Fuel Cost: {{ output.fuelCost | currency }} </span>-->
        </div>
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

<style lang="scss">
  @import "../../scss/globals.scss";
</style>