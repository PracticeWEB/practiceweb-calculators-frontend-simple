<!--
Payslip calculator.
-->
<template>
  <div class="practiceweb-calculator">
    <div class="pw-calc-header">
      <h3 class="pw-calc-header__title">Payslip Calculator</h3>
    </div>
    <form class="input input--width" @submit.prevent="submitCalculation">
      <fieldset class="form-item">
        <p class="form-item__title">Gross Pay *</p>
        <div class="form-item__wrapper form-item__wrapper--gross flex-wrap">
          <span class="form-item__character form-item__character--pound">&#163;</span>
          <input name="grossPay" v-validate="'required|decimal:2'" type="number" min="1" step="0.01" v-model.number="input.grossPay" class="form-item__input form-item__input--number border-left" placeholder="Enter gross pay"/>
          <label class="form-item__label flex-grow border-left" :class="{active: input.period === 'annual'}">
            <input type="radio" v-model="input.period" value="annual" class="form-item__input form-item__input--radio form-item__input--radio--hidden"/>Annual
          </label>
          <label class="form-item__label flex-grow border-left" :class="{active: input.period === 'month'}">
            <input type="radio" v-model="input.period" value="month" class="form-item__input form-item__input--radio form-item__input--radio--hidden"/>Monthly
          </label>
          <label class="form-item__label flex-grow border-left" :class="{active: input.period === 'week'}">
            <input type="radio" v-model="input.period" value="week" class="form-item__input form-item__input--radio form-item__input--radio--hidden"/>Weekly
          </label>
        </div>
      </fieldset>
      <fieldset class="form-item">
        <p class="form-item__title">Where do you pay income Tax? *</p>
        <div class="form-item__wrapper form-item__wrapper--mobile flex-wrap">
          <label class="form-item__label form-item__label--radio-spacing"  :class="{active: input.region === 'england'}">
            <input type="radio" v-model="input.region" value="england" class="form-item__input form-item__input--radio"/>England, Wales, Northern Ireland
          </label>
          <label class="form-item__label form-item__label--radio-spacing"  :class="{active: input.region === 'scotland'}">
            <input type="radio" v-model="input.region" value="scotland" class="form-item__input form-item__input--radio"/>Scotland
          </label>
        </div>
      </fieldset>
      <fieldset class="form-item">
        <p class="form-item__title">Percentage of salary paid into pension</p>
        <div class="form-item__wrapper">
          <div class="flex">
            <input type="number" min="0" v-model.number="input.pensionPercentage" class="form-item__input form-item__input--number">
            <span class="form-item__character form-item__character--percent inline border-left">&#37;</span>
          </div>
        </div>
      </fieldset>
      <fieldset class="form-item">
        <p class="form-item__title">Pension scheme</p>
        <div class="form-item__wrapper form-item__wrapper--two">
          <label class="form-item__label form-item__label--radio-spacing"  :class="{active: input.pensionType === 'auto'}">
            <input type="radio" v-model="input.pensionType" value="auto" class="form-item__input form-item__input--radio"/>Auto-enrolment
          </label>
          <label class="form-item__label form-item__label--radio-spacing"  :class="{active: input.pensionType === 'employer'}">
            <input type="radio" v-model="input.pensionType" value="employer" class="form-item__input form-item__input--radio"/>Employer
          </label>
          <label class="form-item__label form-item__label--radio-spacing"  :class="{active: input.pensionType === 'sacrifice'}">
            <input type="radio" v-model="input.pensionType" value="sacrifice" class="form-item__input form-item__input--radio"/>Salary sacrifice
          </label>
          <label class="form-item__label form-item__label--radio-spacing"  :class="{active: input.pensionType === 'personal'}">
            <input type="radio" v-model="input.pensionType" value="personal" class="form-item__input form-item__input--radio"/>Personal
          </label>
        </div>
        <div v-if="input.pensionType === 'sacrifice'">
          <p>Has the sacrifice been applied above?<input type="checkbox" v-model="input.salarySacrificeApplied"></p>
        </div>
      </fieldset>
      <fieldset class="form-item">
        <p class="form-item__title">Student Loan?</p>
        <div class="form-item__wrapper form-item__wrapper--loan--two form-item__wrapper--mobile">
          <fieldset class="form-item">
            <label class="form-item__label form-item__label--radio-spacing"  :class="{active: input.hasStudentLoan === true}">
              <input type="checkbox" v-model="input.hasStudentLoan" class="form-item__input form-item__input--radio"/>Are you repaying a student loan?
            </label>
          </fieldset>
          <fieldset class="form-item" v-if="input.hasStudentLoan">
            <label class="form-item__label form-item__label--radio-spacing"  :class="{active: input.studentLoan2012 === 'before'}">
              <input type="radio" v-model="input.studentLoan2012" value="before" class="form-item__input form-item__input--radio"/>Before 1st Sept 2012
            </label>
            <label class="form-item__label form-item__label--radio-spacing"  :class="{active: input.studentLoan2012 === 'after'}">
              <input type="radio" v-model="input.studentLoan2012" value="after" class="form-item__input form-item__input--radio"/>After 1st Sept 2012
            </label>
          </fieldset>
          <fieldset class="form-item" v-if="input.studentLoan2012 === 'after'">
            <p class="form-item__title">Where did you live when you applied for the loan?</p>
            <label class="form-item__label form-item__label--radio-spacing"  :class="{active: input.studentLoanLocation === 'england'}">
              <input type="radio" v-model="input.studentLoanLocation" value="england" class="form-item__input form-item__input--radio"/>England or Wales
            </label>
            <label class="form-item__label form-item__label--radio-spacing"  :class="{active: input.studentLoanLocation === 'scotland'}">
              <input type="radio" v-model="input.studentLoanLocation" value="scotland" class="form-item__input form-item__input--radio"/>Scotland or Northern Ireland
            </label>
            <p>You will be covered under {{ studentLoanPlan }}</p>
          </fieldset>
        </div>
      </fieldset>
      <fieldset class="form-item">
        <p class="form-item__title">Tax year:</p>
        <div class="form-item__wrapper form-item__wrapper--year-selector  flex-wrap">
          <label class="form-item__label flex-grow" :class="{active: input.date === '2022-07'}">
            <input type="radio" v-model="input.date" value="2022-07" class="form-item__input form-item__input--radio form-item__input--radio--hidden"/>2022/23 Tax Year Calculation (from July)
          </label>
          <label class="form-item__label flex-grow" :class="{active: input.date === '2022-04'}">
            <input type="radio" v-model="input.date" value="2022-04" class="form-item__input form-item__input--radio form-item__input--radio--hidden"/>2022/23 Tax Year Calculation (April to July)
          </label>
          <label class="form-item__label flex-grow" :class="{active: input.date === '2021'}">
            <input type="radio" v-model="input.date" value="2021" class="form-item__input form-item__input--radio form-item__input--radio--hidden"/>2021/22 Tax Year Calculation
          </label>
        </div>
      </fieldset>
      <button type="submit" class="pw-calc-button" :class="classes.button" @click="setResult">Calculate</button>
    </form>
    <div class="pw-calc-output pw-calc-output__width pw-calc-output--tabs" v-if="Object.keys(output).length > 0">
      <template v-if="payslipResult">
        <p class="pw-calc-output__description">Results based on <strong>{{ resultPeriod }}</strong> Gross pay of <span>{{ resultGrossPay | currency }}</span></p>
      </template>
      <tabs @clicked="tabClicked">
        <tab :key="'annual'" :name="tabNames.annual">
          <dl>
            <div class="pw-calc-output__main">
              <dt class="pw-calc-output__item pw-calc-output__item-title">Net Pay:</dt>
              <dd class="pw-calc-output__item pw-calc-output__item--value">{{ output.annual.netPay | currency }} </dd>
            </div>
            <p class="pw-calc-output__values-header">Breakdown</p>
            <div class="pw-calc-output__wrapper">
              <dt class="pw-calc-output__item pw-calc-output__item--label">PAYE Deduction:</dt><dd class="pw-calc-output__item pw-calc-output__item--value">{{ output.annual.payeDeduction | currency }}</dd>
              <dt class="pw-calc-output__item pw-calc-output__item--label">NI Deduction:</dt><dd class="pw-calc-output__item pw-calc-output__item--value">{{ output.annual.niDeduction | currency }} </dd>
              <dt class="pw-calc-output__item pw-calc-output__item--label">Student Loan Deduction:</dt><dd class="pw-calc-output__item pw-calc-output__item--value">{{ output.annual.studentLoanDeduction | currency }} </dd>
              <dt class="pw-calc-output__item pw-calc-output__item--label">Employers NI:</dt><dd class="pw-calc-output__item pw-calc-output__item--value">{{ output.annual.employerContribution | currency }} </dd>
              <dt class="pw-calc-output__item pw-calc-output__item--label">Employers Cost:</dt><dd class="pw-calc-output__item pw-calc-output__item--value">{{ output.annual.employerCost | currency }} </dd>
              <dt class="pw-calc-output__item pw-calc-output__item--label">Pension contributions:</dt><dd class="pw-calc-output__item pw-calc-output__item--value">{{ output.annual.pensionContribution | currency }}</dd>
            </div>
          </dl>
        </tab>
        <tab :key="'month'" :name="tabNames.month">
          <dl>
            <div class="pw-calc-output__main">
              <dt class="pw-calc-output__item pw-calc-output__item-title">Net Pay:</dt>
              <dd class="pw-calc-output__item pw-calc-output__item--value">{{ output.month.netPay | currency }} </dd>
            </div>
            <p class="pw-calc-output__values-header">Breakdown</p>
            <div class="pw-calc-output__wrapper">
              <dt class="pw-calc-output__item pw-calc-output__item--label">PAYE Deduction:</dt><dd class="pw-calc-output__item pw-calc-output__item--value">{{ output.month.payeDeduction | currency }}</dd>
              <dt class="pw-calc-output__item pw-calc-output__item--label">NI Deduction:</dt><dd class="pw-calc-output__item pw-calc-output__item--value">{{ output.month.niDeduction | currency }} </dd>
              <dt class="pw-calc-output__item pw-calc-output__item--label">Student Loan Deduction:</dt><dd class="pw-calc-output__item pw-calc-output__item--value">{{ output.month.studentLoanDeduction | currency }} </dd>
              <dt class="pw-calc-output__item pw-calc-output__item--label">Employers NI:</dt><dd class="pw-calc-output__item pw-calc-output__item--value">{{ output.month.employerContribution | currency }} </dd>
              <dt class="pw-calc-output__item pw-calc-output__item--label">Employers Cost:</dt><dd class="pw-calc-output__item pw-calc-output__item--value">{{ output.month.employerCost | currency }} </dd>
              <dt class="pw-calc-output__item pw-calc-output__item--label">Pension contributions:</dt><dd class="pw-calc-output__item pw-calc-output__item--value">{{ output.month.pensionContribution | currency }}</dd>
            </div>
          </dl>
        </tab>
        <tab :key="'week'" :name="tabNames.week">
          <dl>
            <div class="pw-calc-output__main">
              <dt class="pw-calc-output__item pw-calc-output__item-title">Net Pay:</dt><dd class="pw-calc-output__item pw-calc-output__item--value">{{ output.week.netPay | currency }} </dd>
            </div>
            <p class="pw-calc-output__values-header">Breakdown</p>
            <div class="pw-calc-output__wrapper">
              <dt class="pw-calc-output__item pw-calc-output__item--label">PAYE Deduction:</dt><dd class="pw-calc-output__item pw-calc-output__item--value">{{ output.week.payeDeduction | currency }}</dd>
              <dt class="pw-calc-output__item pw-calc-output__item--label">NI Deduction:</dt><dd class="pw-calc-output__item pw-calc-output__item--value">{{ output.week.niDeduction | currency }} </dd>
              <dt class="pw-calc-output__item pw-calc-output__item--label">Student Loan Deduction:</dt><dd class="pw-calc-output__item pw-calc-output__item--value">{{ output.week.studentLoanDeduction | currency }} </dd>
              <dt class="pw-calc-output__item pw-calc-output__item--label">Employers NI:</dt><dd class="pw-calc-output__item pw-calc-output__item--value">{{ output.week.employerContribution | currency }} </dd>
              <dt class="pw-calc-output__item pw-calc-output__item--label">Employers Cost:</dt><dd class="pw-calc-output__item pw-calc-output__item--value">{{ output.week.employerCost | currency }} </dd>
              <dt class="pw-calc-output__item pw-calc-output__item--label">Pension contributions:</dt><dd class="pw-calc-output__item pw-calc-output__item--value">{{ output.week.pensionContribution | currency }}</dd>
            </div>
          </dl>
        </tab>
      </tabs>
      <div class="pw-calc-disclaimer">
        <p>This calculator is solely for estimative purposes and no warranty is given as to the accuracy or completeness of any information. You should not make decisions based on results from this calculator. Talk to us for expert advice.</p>
      </div>
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
          period: 'annual',
          pensionPercentage: 0,
          pensionType: 'auto',
          studentLoanLocation: 'england',
          region: 'england',
          studentLoan2012: 'before',
          date: '2020'
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
      },
      /*
      Added a tabClicked method. Which will look for a class at the top of the payslip output table.
      It will then scroll the screen to that class. We have implemented this method to the payslip
      calculator because currently as you user switches between output tabs it doesn't show the whole
      table. This method means that once a tab is clicked it will scroll to the top of the output table.
       */
      tabClicked () {
        document.querySelector('.pw-calc-output__description').scrollIntoView({behavior: 'smooth'});
      }
    }
  }
</script>

<style lang="scss">
  @import "../../scss/globals.scss";
</style>
