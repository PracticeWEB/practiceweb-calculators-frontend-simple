<!--
Property Taxes calculator component.
Property Taxes covers both Stamp Duty and Land  & Buildings Transaction Tax ( LBTT).
-->
<template>
    <div class="practiceweb-calculator">
        <div class="content-container">
          <div class="practiceweb-calculator-header--width">
            <h3 class="practiceweb-calculator-header">{{ dutyName }}</h3>
          </div>
          <form class="input" @submit.prevent="submitCalculation">
            <fieldset class="input-fields">
              <p class="input-fields__title">Region:</p>
              <div class="form-group form-group--mobile flex-wrap">
                <label class="input-field--label radio-spacing"  :class="{active: input.region === 'england'}">
                  <input type="radio" v-model="input.region" value="england" class="input-field input-field--radio" :checked="checked"/>England & Northern Ireland
                </label>
                <label class="input-field--label radio-spacing"  :class="{active: input.region === 'wales'}">
                  <input type="radio" v-model="input.region" value="wales" class="input-field input-field--radio" :checked="checked"/>Wales
                </label>
                <label class="input-field--label radio-spacing"  :class="{active: input.region === 'scotland'}">
                  <input type="radio" v-model="input.region" value="scotland" class="input-field input-field--radio" :checked="checked"/>Scotland
                </label>
              </div>
            </fieldset>
            <fieldset class="input-fields">
              <p class="input-fields__title">Type of property:</p>
              <div class="form-group form-group--mobile flex-wrap">
                <label class="input-field--label radio-spacing"  :class="{active: input.type === 'residential'}">
                  <input type="radio" v-model="input.type" value="residential" class="input-field input-field--radio" :checked="checked"/>Residential
                </label>
                <label class="input-field--label radio-spacing"  :class="{active: input.type === 'nonresidential'}">
                  <input type="radio" v-model="input.type" value="nonresidential" class="input-field input-field--radio" :checked="checked"/>Non-residential
                </label>
              </div>
            </fieldset>
            <fieldset class="input-fields">
              <p class="input-fields__title">Are you a first time buyer?</p>
              <div class="form-group form-group--mobile flex-wrap">
                <label class="input-field--label radio-spacing"  :class="{active: input.firstTime === 'yes'}">
                  <input type="radio" v-model="input.firstTime" value="yes" class="input-field input-field--radio" :checked="checked"/>Yes
                </label>
                <label class="input-field--label radio-spacing"  :class="{active: input.firstTime === 'no'}">
                  <input type="radio" v-model="input.firstTime" value="no" class="input-field input-field--radio" :checked="checked"/>No
                </label>
              </div>
            </fieldset>
            <fieldset class="input-fields">
              <p class="input-fields__title">Property Value</p>
              <div class="form-group form-group--gross flex-wrap">
                <input name="propertyValue" v-validate="'required|decimal:2'" type="number" min="1" step="0.01" v-model.number="input.propertyValue" class="input-field input-field--number" placeholder="Enter your property value here"/>
              </div>
            </fieldset>
            <button type="submit" class="calculate-button" :class="classes.button">Calculate</button>
          </form>
          <br>
          <div class="output" v-if="Object.keys(output).length > 0">
            <div class="output-list">
              <div class="sub-values flex flex-wrap">
                <dt class="value-label inline">{{ dutyName }}:</dt>
                <dd class="value-items inline">{{ output.duty | currency }}</dd>
                <dt class="value-label inline property-output" v-if="output.secondHomeDuty">Second Home Duty:</dt>
                <dd class="value-items inline" v-if="output.secondHomeDuty">{{ output.secondHomeDuty | currency }}</dd>
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
        firstTime: 'no'
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