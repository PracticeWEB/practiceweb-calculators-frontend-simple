<!--
Vat calculator component.
-->
<template>
  <div class="calculator-container practiceweb-calculator">
    <div class="content-container">
      <form class="input" @submit.prevent="submitCalculation">
        <div class="practiceweb-calculator-header--width">
          <h3 class="practiceweb-calculator-header">VAT Calculator</h3>
        </div>
        <fieldset class="input-fields">
          <p class="input-fields__title">Value *</p>
          <div class="form-group form-group--gross flex-wrap">
            <span class="input-field--specialCharacter input-field--specialCharacter--pound">&#163;</span>
            <input class="input-field input-field--number border-left" type="number" step="0.01" v-model.number="input.value" placeholder="Enter your value here"/>
          </div>
        </fieldset>
        <fieldset class="input-fields">
          <p class="input-fields__title">VAT included? *</p>
          <div class="form-group form-group--mobile flex-wrap">
            <label class="input-field--label radio-spacing" :class="{active: input.included === '1'}">
              <input type="radio" v-model="input.included" value="1" :checked="checked"/>Yes
            </label>
            <label class="input-field--label radio-spacing" :class="{active: input.included === '0'}">
              <input type="radio" v-model="input.included" value="0" :checked="checked"/>No
            </label>
          </div>
        </fieldset>
        <button type="submit" class="calculate-button" :class="classes.button">Calculate</button>
      </form>
      <br>
      <div class="output" v-if="Object.keys(output).length > 0">
        <div class="output-list">
          <div class="sub-values flex flex-wrap">
            <dt class="value-items value-label">Net:</dt>
            <dd class="value-items value-number">{{ output.net | currency }}</dd>
            <dt class="value-items value-label">VAT:</dt>
            <dd class="value-items value-number">{{ output.vat | currency }}</dd>
            <dt class="value-items value-label">Gross:</dt>
            <dd class="value-items value-number">{{ output.gross | currency }}</dd>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CalculatorAPIMixin from '../../mixins/CalculatorAPI'
  import CalculatorStyle from '../../mixins/CalculatorStyle'
  export default {
    name: 'Vat',
    mixins: [CalculatorAPIMixin, CalculatorStyle],
    created: function () {
      this.servicePath = '/calculator/vat'
      this.tabNames = {
        net: 'Net Pay',
        vat: 'VAT',
        gross: 'Gross'
      }
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

<style lang="scss">
  @import "../../scss/globals.scss";
</style>