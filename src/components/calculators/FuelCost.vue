<!--
Fuel Cost calculator.
-->
<template>
    <div class="practiceweb-calculator">
      <div class="content-container">
        <div class="pw-calc-header">
          <h3 class="pw-calc-header__title">Fuel Cost Calculator</h3>
        </div>
        <form @submit.prevent="submitCalculation">
          <fieldset class="form-item">
            <p class="form-item__title">Annual Mileage:</p>
            <div class="form-item__wrapper form-item__wrapper--gross flex-wrap">
              <input type="number" min="1" v-model.number="input.annualMileage" step="0.01" class="form-item__input form-item__input--number">
            </div>
          </fieldset>
          <fieldset class="form-item">
            <p class="form-item__title">Price per Litre:</p>
            <div class="form-item__wrapper form-item__wrapper--gross flex-wrap">
              <input type="number" min="1" v-model.number="input.pricePerLitre" step="0.01" class="form-item__input form-item__input--number">
            </div>
          </fieldset>
          <fieldset class="form-item">
            <p class="form-item__title">Miles per Gallon:</p>
            <div class="form-item__wrapper form-item__wrapper--gross flex-wrap">
              <input type="number" min="1" v-model.number="input.milesPerGallon" step="0.01" class="form-item__input form-item__input--number">
            </div>
          </fieldset>
            <button type="submit" class="pw-calc-button" :class="classes.button">Calculate</button>
        </form>
        <br>
        <div class="pw-calc-output" v-if="Object.keys(output).length > 0">
          <div class="pw-calc-output__wrapper flex flex-wrap">
            <dt class="pw-calc-output__item pw-calc-output__item--label inline">Fuel Cost:</dt>
            <dd class="pw-calc-output__item pw-calc-output__item--value inline">{{ output.fuelCost | currency }}</dd>
          </div>
          <div>This calculator is solely for estimative purposes and no warranty is given as to the accuracy or completeness of any information. You should not make decisions based on results from this calculator. Talk to us for expert advice.
          </div>
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
