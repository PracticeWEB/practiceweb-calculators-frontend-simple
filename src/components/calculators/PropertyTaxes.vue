<!--
Property Taxes calculator component.
Property Taxes covers both Stamp Duty and Land  & Buildings Transaction Tax ( LBTT).
-->
<template>
    <div class="practiceweb-calculator">
        <span>{{ dutyName }}</span>
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
            <fieldset v-if="input.type == 'residential'">
                <legend>Are you a first time buyer?</legend>
                <label>Yes <input type="radio" v-model="input.firstTime" value="yes" /></label>
                <label>No <input type="radio" v-model="input.firstTime" value="no" /></label>
            </fieldset>
            <label>
                Property Value
                <input type="number" v-model.number="input.propertyValue"/>
            </label>
            <fieldset class="form-item">
              <p class="form-item__title">Property Value</p>
              <div class="form-item__wrapper form-item__wrapper--mobile flex-wrap">
                <input name="propertyValue" v-validate="'required|decimal:2'" type="number" min="1" step="0.01" v-model.number="input.propertyValue" class="form-item__input form-item__input--number" placeholder="Enter your property value here"/>
              </div>
            </fieldset>
            <fieldset class="form-item">
              <p class="form-item__title">Tax year:</p>
              <div class="form-item__wrapper form-item__wrapper--year-selector flex-wrap">
                <label class="form-item__label flex-grow" :class="{active: input.date === '2018'}">
                  <input type="radio" v-model="input.date" value="2018" class="form-item__input form-item__input--radio form-item__input--radio--hidden"/>2018 Tax Year Calculation
                </label>
                <label class="form-item__label flex-grow border-left" :class="{active: input.date === '2019'}">
                  <input type="radio" v-model="input.date" value="2019" class="form-item__input form-item__input--radio form-item__input--radio--hidden"/>2019 Tax Year Calculation
                </label>
              </div>
            </fieldset>
            <button type="submit" class="pw-calc-button" :class="classes.button">Calculate</button>
            <button type="submit">Calculate</button>
        </form>
        <div v-if="Object.keys(output).length > 0">
          <ul>
            <li><span> {{ dutyName }} : {{ output.duty | currency }}</span></li>
            <li v-if="output.secondHomeDuty"><span>Second Home Duty: {{ output.secondHomeDuty | currency }}</span></li>
          </ul>
          <br>
          <div class="pw-calc-output" v-if="Object.keys(output).length > 0">
            <div class="pw-calc-output__wrapper flex flex-wrap">
              <dt class="pw-calc-output__item pw-calc-output__item--label inline">{{ dutyName }}:</dt>
              <dd class="pw-calc-output__item pw-calc-output__item--value inline">{{ output.duty | currency }}</dd>
              <dt class="pw-calc-output__item pw-calc-output__item--label inline property-output" v-if="output.secondHomeDuty">Second Home Duty:</dt>
              <dd class="pw-calc-output__item pw-calc-output__item--value inline" v-if="output.secondHomeDuty">{{ output.secondHomeDuty | currency }}</dd>
            </div>
          </div>
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
        propertyValue: '300000',
        firstTime: 'no',
        date: '2019'
      },
      output: {}
    }
  },
  computed: {
    dutyName: function () {
      let dutyName = 'Stamp Duty'
      switch (this.input.region) {
        case 'wales' :
          dutyName = 'Land Transaction Tax'
          break
        case 'scotland' :
          dutyName = 'Land and Buildings Transaction Tax'
      }
      return dutyName
    }
  }
}
</script>
