<!--
Property Taxes calculator component.
Property Taxes covers both Stamp Duty and Land  & Buildings Transaction Tax ( LBTT).
-->
<template>
    <div class="practiceweb-calculator">
        <form @submit.prevent="submitCalculation">
            <fieldset>
                <legend>Region:</legend>
                <label>England & Northern Ireland<input type="radio" v-model="input.region" value="england"/></label>
                <label>Wales <input type="radio" v-model="input.region" value="wales"/></label>
                <label>Scotland <input type="radio" v-model="input.region" value="scotland"/></label>
            </fieldset>
            <fieldset>
                <legend>Type of property</legend>
                <label>Residential<input type="radio" v-model="input.type" value="residential"></label>
                <label>Non-residential<input type="radio" v-model="input.type" value="nonresidential"></label>
            </fieldset>
            <label>
                Property Value
                <input type="number" v-model.number="input.propertyValue"/>
            </label>
            <button type="submit">Calculate</button>
        </form>
        <div v-if="Object.keys(output).length > 0">
            <ul>
                <li><span> Duty: {{ output.duty | currency }}</span></li>
                <li v-if="output.secondHomeDuty"><span>Second Home Duty: {{ output.secondHomeDuty | currency }}</span></li>
            </ul>
        </div>
    </div>
</template>

<script>

import CalculatorAPIMixin from '../../mixins/CalculatorAPI'
export default {
  name: 'PropertyTaxes',
  mixins: [CalculatorAPIMixin],
  created: function () {
    this.servicePath = '/calculator/propertytaxes'
  },
  data: function () {
    return {
      input: {
        region: 'england',
        type: 'residential',
        propertyValue: '300000'
      },
      output: {}
    }
  }
}
</script>
