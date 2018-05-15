<!--
Payslip calculator.
-->
<template>
    <div class="practiceweb-calculator">
        <form @submit.prevent="submitCalculation">
            <fieldset>
            <div>
                <p>
                <label>Gross Pay: <input name="grossPay" v-validate="'required|decimal:2'" type="number" min="1" step="0.01" v-model.number="input.grossPay"></label>
                <span v-show="errors.has('grossPay')"> {{ errors.first('grossPay') }}</span>
                </p>
            </div>
            <div>
            <label>Received
                <label>Annual <input type="radio" v-model="input.period" value="annual"/></label>
                <label>Monthly <input type="radio" v-model="input.period" value="month"/></label>
                <label>Weekly <input type="radio" v-model="input.period" value="week"/></label>
            </label>
            </div>
            </fieldset>
            <fieldset>
                <legend> Where do you pay income tax?</legend>
                <label>England, Wales, Northen Ireland <input type="radio" v-model="input.region" value="england"/></label>
                <label>Scotland <input type="radio" v-model="input.region" value="scotland"/></label>
            </fieldset>
            <fieldset>
                <legend>Pensions</legend>
                <label>What percentage of your salary do you pay into a pension?<input type="number" min="0" v-model.number="input.pensionPercentage"></label>
                <label>Auto-enrolment<input type="radio" v-model="input.pensionType" value="auto"/></label>
                <label>Employer<input type="radio" v-model="input.pensionType" value="employer"/></label>
                <label>Salary Sacrifice<input type="radio" v-model="input.pensionType" value="sacrifice"/></label>
                <label>Personal<input type="radio" v-model="input.pensionType" value="personal"/></label>
                <div v-if="input.pensionType === 'sacrifice'">
                    <label>Has the sacrifice been applied above?<input type="checkbox" v-model="input.salarySacrificeApplied"></label>
                </div>
            </fieldset>
            <fieldset>
                <legend>Student Loan</legend>
                <label>Are you repaying a student loan?<input type="checkbox" id="hasLoan" v-model="input.hasStudentLoan"></label>
                <div v-if="input.hasStudentLoan">
                    <label>Did you apply for the loan after 1st Sep 2012? <input type="checkbox" v-model="input.studentLoanAfter2012"></label>
                    <fieldset v-if="input.studentLoanAfter2012">
                        <legend>Where did you live when you applied for the loan?</legend>
                        <label>England or Wales<input type="radio" v-model="input.studentLoanLocation" value="england"></label>
                        <label>Scotland or Northern Ireland<input type="radio" v-model="input.studentLoanLocation" value="scotland"></label>
                    </fieldset>
                </div>
            </fieldset>
            <button type="submit" :class="classes.button">Calculate</button>
        </form>
        <dl v-if="Object.keys(output).length > 0">
            <dt>Gross Pay:</dt><dd>{{ output.grossPay | currency }} </dd>
            <dt>PAYE Deduction:</dt><dd>{{ output.payeDeduction | currency }}</dd>
            <dt>NI Deduction:</dt><dd>{{ output.niDeduction | currency }} </dd>
            <dt>Student Loan Deduction:</dt><dd>{{ output.studentLoanDeduction | currency }} </dd>
            <dt>Net Pay:</dt><dd>{{ output.netPay | currency }} </dd>
            <dt>Employers NI:</dt><dd>{{ output.employerContribution | currency }} </dd>
            <dt>Employers Cost:</dt><dd>{{ output.employerCost | currency }} </dd>
            <dt>Pension contributions:</dt><dd>{{ output.pensionContribution | currency }}</dd>
        </dl>
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
  },
  computed: {
    studentLoanPlan: function () {
      let loanPlan = 'none'
      if (this.input.hasStudentLoan) {
        loanPlan = 'plan1'
        if (this.input.studentLoanAfter2012 && this.input.studentLoanLocation === 'england') {
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
        period: 'month',
        pensionPercentage: 0,
        pensionType: 'auto',
        studentLoanLocation: 'england',
        region: 'england'
      },
      output: {}
    }
  }
}
</script>
