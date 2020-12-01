<!--
Property Taxes calculator component.
Property Taxes covers both Stamp Duty and Land  & Buildings Transaction Tax ( LBTT).
-->
<template>
    <div class="practiceweb-calculator">
        <div class="content-container">
          <div class="pw-calc-header">
            <h3 class="pw-calc-header__title">{{ dutyName }}</h3>
          </div>
          <form class="input" @submit.prevent="submitCalculation">
            <fieldset class="form-item">
              <p class="form-item__title">Region:</p>
              <div class="form-item__wrapper form-item__wrapper--mobile flex-wrap">
                <label class="form-item__label form-item__label--radio-spacing"  :class="{active: input.region === 'england'}">
                  <input type="radio" v-model="input.region" value="england" class="form-item__input form-item__input--radio form-item__input--radio"/>England & Northern Ireland
                </label>
                <label class="form-item__label form-item__label--radio-spacing"  :class="{active: input.region === 'wales'}">
                  <input type="radio" v-model="input.region" value="wales" class="form-item__input form-item__input--radio"/>Wales
                </label>
                <label class="form-item__label form-item__label--radio-spacing"  :class="{active: input.region === 'scotland'}">
                  <input type="radio" v-model="input.region" value="scotland" class="form-item__input form-item__input--radio"/>Scotland
                </label>
              </div>
            </fieldset>
            <fieldset class="form-item">
              <p class="form-item__title">Type of property:</p>
              <div class="form-item__wrapper form-item__wrapper--mobile flex-wrap">
                <label class="form-item__label form-item__label--radio-spacing"  :class="{active: input.type === 'residential'}">
                  <input type="radio" v-model="input.type" value="residential" class="form-item__input form-item__input--radio"/>Residential
                </label>
                <label class="form-item__label form-item__label--radio-spacing"  :class="{active: input.type === 'nonresidential'}">
                  <input type="radio" v-model="input.type" value="nonresidential" class="form-item__input form-item__input--radio"/>Non-residential
                </label>
              </div>
            </fieldset>
            <fieldset class="form-item">
              <p class="form-item__title">Are you a first time buyer?</p>
              <div class="form-item__wrapper form-item__wrapper--mobile flex-wrap">
                <label class="form-item__label form-item__label form-item__label--radio-spacing"  :class="{active: input.firstTime === 'yes'}">
                  <input type="radio" v-model="input.firstTime" value="yes" class="form-item__input form-item__input--radio"/>Yes
                </label>
                <label class="form-item__label form-item__label--radio-spacing"  :class="{active: input.firstTime === 'no'}">
                  <input type="radio" v-model="input.firstTime" value="no" class="form-item__input form-item__input--radio"/>No
                </label>
              </div>
            </fieldset>
            <fieldset class="form-item">
              <p class="form-item__title">Property Value</p>
              <div class="form-item__wrapper form-item__wrapper--mobile flex-wrap">
                <input name="propertyValue" v-validate="'required|decimal:2'" type="number" min="1" step="0.01" v-model.number="input.propertyValue" class="form-item__input form-item__input--number" placeholder="Enter your property value here"/>
              </div>
            </fieldset>
            <fieldset class="form-item">
              <p class="form-item__title">Tax year:</p>
              <div class="form-item__wrapper form-item__wrapper--year-selector flex-wrap">
                <label class="form-item__label flex-grow" :class="{active: input.date === '2020'}">
                  <input type="radio" v-model="input.date" value="2020" class="form-item__input form-item__input--radio form-item__input--radio--hidden"/>2020/21 Tax Year Calculation
                </label>
                <label class="form-item__label flex-grow" :class="{active: input.date === '2019'}">
                  <input type="radio" v-model="input.date" value="2019" class="form-item__input form-item__input--radio form-item__input--radio--hidden"/>2019/20 Tax Year Calculation
                </label>
                <label class="form-item__label flex-grow border-left" :class="{active: input.date === '2018'}">
                  <input type="radio" v-model="input.date" value="2018" class="form-item__input form-item__input--radio form-item__input--radio--hidden"/>2018/19 Tax Year Calculation
                </label>
              </div>
            </fieldset>
            <button type="submit" class="pw-calc-button" :class="classes.button">Calculate</button>
        </form>
          <br>
          <div class="pw-calc-output" v-if="Object.keys(output).length > 0">
            <div class="pw-calc-output__wrapper flex flex-wrap">
              <dt class="pw-calc-output__item pw-calc-output__item--label inline">{{ dutyName }}:</dt>
              <dd class="pw-calc-output__item pw-calc-output__item--value inline">{{ output.duty | currency }}</dd>
              <dt class="pw-calc-output__item pw-calc-output__item--label inline property-output" v-if="output.secondHomeDuty">Second Home Duty:</dt>
              <dd class="pw-calc-output__item pw-calc-output__item--value inline" v-if="output.secondHomeDuty">{{ output.secondHomeDuty | currency }}</dd>
            </div>
            <div class="pw-calc-disclaimer">
              <p>From July 2020, a stamp duty land tax holiday reduces the rate to 0% for the purchase of all residential properties worth up £500,000 in England and Northern Ireland. In Wales and Scotland, the 0% rate applies on the purchase of all residential properties worth up to £250,000. These breaks apply until 31 March 2021, subject to future change.</p>
              <p>This calculator is solely for estimative purposes and no warranty is given as to the accuracy or completeness of any information. You should not make decisions based on results from this calculator. Talk to us for expert advice.</p>
            </div>
          </div>
        </div>
      </div>
</template>

<script>

import CalculatorAPIMixin from '../../mixins/CalculatorAPI'
import CalculatorStyle from '../../mixins/CalculatorStyle'

export default {
  name: 'PropertyTaxes',
  mixins: [CalculatorAPIMixin, CalculatorStyle],
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
        date: '2020'
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

<style lang="scss">
  @import "../../scss/globals.scss";
</style>
