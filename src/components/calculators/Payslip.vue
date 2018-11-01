<!--
Payslip calculator.
-->
<template>
  <div class="practiceweb-calculator">
    <div class="practiceweb-calculator-header--width">
      <h3 class="practiceweb-calculator-header">Payslip Calculator</h3>
    </div>
    <form class="input input--width" @submit.prevent="submitCalculation">
      <fieldset class="input-fields">
        <p class="input-fields__title">Gross Pay *</p>
        <div class="form-group form-group--gross flex-wrap">
          <span class="input-field--specialCharacter input-field--specialCharacter--pound">&#163;</span>
          <input name="grossPay" v-validate="'required|decimal:2'" type="number" min="1" step="0.01" v-model.number="input.grossPay" class="input-field input-field--number border-left" placeholder="Enter your gross pay here"/>
          <label class="input-field--label flex-grow border-left" :class="{active: input.period === 'Annual'}">
            <input type="radio" v-model="input.period" value="Annual" class="input-field input-field--radio input-field--radio--hidden" :checked="checked"/>Annual
          </label>
          <label class="input-field--label flex-grow border-left" :class="{active: input.period === 'Monthly'}">
            <input type="radio" v-model="input.period" value="Monthly" class="input-field input-field--radio input-field--radio--hidden" :checked="checked"/>Monthly
          </label>
          <label class="input-field--label flex-grow border-left" :class="{active: input.period === 'Weekly'}">
            <input type="radio" v-model="input.period" value="Weekly" class="input-field input-field--radio input-field--radio--hidden" :checked="checked"/>Weekly
          </label>
        </div>
      </fieldset>
      <fieldset class="input-fields">
        <p class="input-fields__title">Where do you pay income Tax? *</p>
        <div class="form-group form-group--mobile flex-wrap">
          <label class="input-field--label radio-spacing"  :class="{active: input.region === 'england'}">
            <input type="radio" v-model="input.region" value="england" class="input-field input-field--radio" :checked="checked"/>England, Wales, Northern Ireland
          </label>
          <label class="input-field--label radio-spacing"  :class="{active: input.region === 'scotland'}">
            <input type="radio" v-model="input.region" value="scotland" class="input-field input-field--radio" :checked="checked"/>Scotland
          </label>
        </div>
      </fieldset>
      <fieldset class="input-fields">
        <p class="input-fields__title">Percentage of salary paid into pension</p>
        <div class="form-group">
          <div class="flex flex-grow">
            <input type="number" min="0" v-model.number="input.pensionPercentage" class="input-field input-field--number">
            <span class="input-field--specialCharacter input-field--specialCharacter--percent inline border-left">&#37;</span>
          </div>
        </div>
      </fieldset>
      <fieldset class="input-fields">
        <p class="input-fields__title">Pension scheme</p>
        <div class="form-group form-group--twos">
          <label class="input-field--label radio-spacing"  :class="{active: input.pensionType === 'auto'}">
            <input type="radio" v-model="input.pensionType" value="auto" class="input-field input-field--radio" :checked="checked"/>Auto-enrolment
          </label>
          <label class="input-field--label radio-spacing"  :class="{active: input.pensionType === 'employer'}">
            <input type="radio" v-model="input.pensionType" value="employer" class="input-field input-field--radio" :checked="checked"/>Employer
          </label>
          <label class="input-field--label radio-spacing"  :class="{active: input.pensionType === 'sacrifice'}">
            <input type="radio" v-model="input.pensionType" value="sacrifice" class="input-field input-field--radio" :checked="checked"/>Salary sacrifice
          </label>
          <label class="input-field--label radio-spacing"  :class="{active: input.pensionType === 'personal'}">
            <input type="radio" v-model="input.pensionType" value="personal" class="input-field input-field--radio" :checked="checked"/>Personal
          </label>
        </div>
        <div v-if="input.pensionType === 'sacrifice'">
          <p>Has the sacrifice been applied above?<input type="checkbox" v-model="input.salarySacrificeApplied"></p>
        </div>
      </fieldset>
      <fieldset class="input-fields">
        <p class="input-fields__title">Student Loan?</p>
        <div class="form-group form-group--loan-twos form-group--mobile">
          <fieldset class="input-fields">
            <label class="input-field--label radio-spacing"  :class="{active: input.hasStudentLoan === true}">
              <input type="checkbox" v-model="input.hasStudentLoan" class="input-field input-field--radio" :checked="checked"/>Are you repaying a student loan?
            </label>
          </fieldset>
          <fieldset class="input-fields" v-if="input.hasStudentLoan">
            <label class="input-field--label radio-spacing"  :class="{active: input.studentLoan2012 === 'before'}">
              <input type="radio" v-model="input.studentLoan2012" value="before" class="input-field input-field--radio" :checked="checked"/>Before 1st Sept 2012
            </label>
            <label class="input-field--label radio-spacing"  :class="{active: input.studentLoan2012 === 'after'}">
              <input type="radio" v-model="input.studentLoan2012" value="after" class="input-field input-field--radio" :checked="checked"/>After 1st Sept 2012
            </label>
          </fieldset>
          <fieldset class="input-fields" v-if="input.studentLoan2012 === 'after'">
            <p class="input-fields__title">Where did you live when you applied for the loan?</p>
            <label class="input-field--label radio-spacing"  :class="{active: input.studentLoanLocation === 'england'}">
              <input type="radio" v-model="input.studentLoanLocation" value="england" class="input-field input-field--radio" :checked="checked"/>England or Wales
            </label>
            <label class="input-field--label radio-spacing"  :class="{active: input.studentLoanLocation === 'scotland'}">
              <input type="radio" v-model="input.studentLoanLocation" value="scotland" class="input-field input-field--radio" :checked="checked"/>Scotland or Northern Ireland
            </label>
            <p>You will be covered under {{ studentLoanPlan }}</p>
          </fieldset>
        </div>
        <!--</fieldset>-->
      </fieldset>
      <!--</fieldset>-->
      <button type="submit" class="calculate-button" :class="classes.button" @click="setResult">Calculate</button>
    </form>
    <div class="output output--width" v-if="Object.keys(output).length > 0">
      <template v-if="payslipResult">
        <p class="output-description">Results based on <strong>{{ resultPeriod }}</strong> Gross pay of <span>{{ resultGrossPay | currency }}</span></p>
      </template>
      <tabs>
        <tab :key="'annual'" :name="tabNames.annual">
          <dl>
            <div class="main-value">
              <dt class="value-items value-title">Net Pay:</dt>
              <dd class="value-items value-number">{{ output.annual.netPay | currency }} </dd>
            </div>
            <p class="values-header">Breakdown</p>
            <div class="sub-values">
              <dt class="value-items value-label">PAYE Deduction:</dt><dd class="value-items value-number">{{ output.annual.payeDeduction | currency }}</dd>
              <dt class="value-items value-label">NI Deduction:</dt><dd class="value-items value-number">{{ output.annual.niDeduction | currency }} </dd>
              <dt class="value-items value-label">Student Loan Deduction:</dt><dd class="value-items value-number">{{ output.annual.studentLoanDeduction | currency }} </dd>
              <dt class="value-items value-label">Employers NI:</dt><dd class="value-items value-number">{{ output.annual.employerContribution | currency }} </dd>
              <dt class="value-items value-label">Employers Cost:</dt><dd class="value-items value-number">{{ output.annual.employerCost | currency }} </dd>
              <dt class="value-items value-label">Pension contributions:</dt><dd class="value-items value-number">{{ output.annual.pensionContribution | currency }}</dd>
            </div>
          </dl>
        </tab>
        <tab :key="'month'" :name="tabNames.month">
          <dl>
            <div class="main-value">
              <dt class="value-items value-title">Net Pay:</dt><dd class="value-items value-number">{{ output.month.netPay | currency }} </dd>
            </div>
            <p class="values-header">Breakdown</p>
            <div class="sub-values">
              <dt class="value-items value-label">PAYE Deduction:</dt><dd class="value-items value-number">{{ output.month.payeDeduction | currency }}</dd>
              <dt class="value-items value-label">NI Deduction:</dt><dd class="value-items value-number">{{ output.month.niDeduction | currency }} </dd>
              <dt class="value-items value-label">Student Loan Deduction:</dt><dd class="value-items value-number">{{ output.month.studentLoanDeduction | currency }} </dd>
              <dt class="value-items value-label">Employers NI:</dt><dd class="value-items value-number">{{ output.month.employerContribution | currency }} </dd>
              <dt class="value-items value-label">Employers Cost:</dt><dd class="value-items value-number">{{ output.month.employerCost | currency }} </dd>
              <dt class="value-items value-label">Pension contributions:</dt><dd class="value-items value-number">{{ output.month.pensionContribution | currency }}</dd>
            </div>
          </dl>
        </tab>
        <tab :key="'week'" :name="tabNames.week">
          <dl>
            <div class="main-value">
              <dt class="value-items value-title">Net Pay:</dt><dd class="value-items value-number">{{ output.week.netPay | currency }} </dd>
            </div>
            <p class="values-header">Breakdown</p>
            <div class="sub-values">
              <dt class="value-items value-label">PAYE Deduction:</dt><dd class="value-items value-number">{{ output.week.payeDeduction | currency }}</dd>
              <dt class="value-items value-label">NI Deduction:</dt><dd class="value-items value-number">{{ output.week.niDeduction | currency }} </dd>
              <dt class="value-items value-label">Student Loan Deduction:</dt><dd class="value-items value-number">{{ output.week.studentLoanDeduction | currency }} </dd>
              <dt class="value-items value-label">Employers NI:</dt><dd class="value-items value-number">{{ output.week.employerContribution | currency }} </dd>
              <dt class="value-items value-label">Employers Cost:</dt><dd class="value-items value-number">{{ output.week.employerCost | currency }} </dd>
              <dt class="value-items value-label">Pension contributions:</dt><dd class="value-items value-number">{{ output.week.pensionContribution | currency }}</dd>
            </div>
          </dl>
        </tab>
      </tabs>
    </div>
  </div>
</template>

<script>
  import CalculatorAPIMixin from '../../mixins/CalculatorAPI'
  import CalculatorStyle from '../../mixins/CalculatorStyle'
  export default {
    name: 'Payslip',
    mixins: [CalculatorAPIMixin, CalculatorStyle],
    created: function () {
      this.servicePath = '/calculator/payslip'
      this.tabNames = {
        annual: 'Annually',
        month: 'Monthly',
        week: 'Weekly'
      }
    },
    computed: {
      studentLoanPlan: function () {
        let loanPlan = 'none'
        if (this.input.hasStudentLoan) {
          loanPlan = 'plan1'
          if (this.input.studentLoan2012 === 'after' && this.input.studentLoanLocation === 'england') {
            loanPlan = 'plan2'
          }
        }
        return loanPlan
      }
    },
    watch: {
      studentLoanPlan: function () {
        // Because computed properties can't nest, the watch is used to copy the computed plan value into the input structure.
        this.input.studentLoanPlan = this.studentLoanPlan
      }
    },
    data: () => {
      return {
        input: {
          period: 'Annual',
          pensionPercentage: 0,
          pensionType: 'auto',
          studentLoanLocation: 'england',
          region: 'england',
          studentLoan2012: 'before'
        },
        output: {},
        payslipResult: false,
        resultPeriod: '',
        resultGrossPay: null,
        checked: ''
      }
    },
    methods: {
      setResult () {
        this.resultPeriod = this.input.period
        this.resultGrossPay = this.input.grossPay
        this.payslipResult = true
      }
    }
  }
</script>

<style lang="scss">
  @import "../../scss/globals.scss";
</style>