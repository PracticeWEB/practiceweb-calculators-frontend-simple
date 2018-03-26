<!--
Payslip calculator.
-->
<template>
    <div class="practiceweb-calculator">
        <form @submit.prevent="submitCalculation">
            <label>Gross Pay: <input type="number" min="1" v-model.number="input.grossPay"></label>
            <label>Received
                Annual <input type="radio" v-model="input.period" value="annual"/>
                Monthly <input type="radio" v-model="input.period" value="month"/>
                Weekly <input type="radio" v-model="input.period" value="week"/>
            </label>
            <label>Tax Code: <input type="text" v-model="input.taxCode"></label>
            <label>Plan1<input type="checkbox" id="plan1" v-model="input.studentLoan.plan1" value="plan1"/></label>
            <label>Plan2<input type="checkbox" id="plan2" v-model="input.studentLoan.plan2" value="plan2"/></label>
            <button type="submit" :class="classes.button">Calculate</button>
        </form>
        <div v-if="Object.keys(output).length > 0">
            <span>Gross Pay: {{ output.grossPay | currency }} </span>
            <span>PAYE Deduction: {{ output.payeDeduction | currency }} </span>
            <span>NI Deduction: {{ output.niDeduction | currency }} </span>
            <span>Student Loan Deduction: {{ output.studentLoanDeduction | currency }} </span>
            <span>Net Pay: {{ output.netPay | currency }} </span>
            <span>Employers NI: {{ output.employerContribution | currency }} </span>
            <span>Employers Cost: {{ output.employerCost | currency }} </span>
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
  },
  data: () => {
    return {
      input: {
        period: 'month',
        taxCode: '1185L',
        studentLoan: {}
      },
      output: {}
    }
  }
}
</script>
