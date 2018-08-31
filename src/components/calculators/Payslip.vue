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
                    <label class="input-field--label flex-grow border-left" :class="{active: input.period === 'Annual'}"><input type="radio" v-model="input.period" value="Annual" class="input-field input-field--radio input-field--radio--hidden" :checked="checked"/>Annual</label>
                    <label class="input-field--label flex-grow border-left" :class="{active: input.period === 'Monthly'}"><input type="radio" v-model="input.period" value="Monthly" class="input-field input-field--radio input-field--radio--hidden" :checked="checked"/>Monthly</label>
                    <label class="input-field--label flex-grow border-left" :class="{active: input.period === 'Weekly'}"><input type="radio" v-model="input.period" value="Weekly" class="input-field input-field--radio input-field--radio--hidden" :checked="checked"/>Weekly</label>
                </div>
            </fieldset>
            <fieldset class="input-fields">
                <p class="input-fields__title">Where do you pay income Tax? *</p>
                <div class="form-group form-group--mobile flex-wrap">
                    <label class="input-field--label radio-spacing"  :class="{active: input.region === 'england'}"><input type="radio" v-model="input.region" value="england" class="input-field input-field--radio" :checked="checked"/>England, Wales, Nothern island</label>
                    <label class="input-field--label radio-spacing"  :class="{active: input.region === 'scotland'}"><input type="radio" v-model="input.region" value="scotland" class="input-field input-field--radio" :checked="checked"/>Scotland</label>
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
                    <label class="input-field--label radio-spacing"  :class="{active: input.pensionType === 'auto'}"><input type="radio" v-model="input.pensionType" value="auto" class="input-field input-field--radio" :checked="checked"/>Auto-enrolment</label>
                    <label class="input-field--label radio-spacing"  :class="{active: input.pensionType === 'employer'}"><input type="radio" v-model="input.pensionType" value="employer" class="input-field input-field--radio" :checked="checked"/>Employer</label>
                    <label class="input-field--label radio-spacing"  :class="{active: input.pensionType === 'sacrifice'}"><input type="radio" v-model="input.pensionType" value="sacrifice" class="input-field input-field--radio" :checked="checked"/>Salary sacrifice</label>
                    <label class="input-field--label radio-spacing"  :class="{active: input.pensionType === 'personal'}"><input type="radio" v-model="input.pensionType" value="personal" class="input-field input-field--radio" :checked="checked"/>Personal</label>
                </div>
                <div v-if="input.pensionType === 'sacrifice'">
                    <p>Has the sacrifice been applied above?<input type="checkbox" v-model="input.salarySacrificeApplied"></p>
                </div>
            </fieldset>
            <fieldset class="input-fields">
              <p class="input-fields__title">Include student Loan?</p>
              <div class="form-group form-group--loan-twos form-group--mobile">
                <label class="input-field--label radio-spacing"  :class="{active: input.studentLoan2012 === 'before'}"><input type="radio" v-model="input.studentLoan2012" value="before" class="input-field input-field--radio" :checked="checked"/>Before 1st Sept 2012</label>
                <label class="input-field--label radio-spacing"  :class="{active: input.studentLoan2012 === 'after'}"><input type="radio" v-model="input.studentLoan2012" value="after" class="input-field input-field--radio" :checked="checked"/>After 1st Sept 2012</label>
              </div>
              <div v-if="input.studentLoan2012 === 'after'">
                <fieldset v-if="input.studentLoan2012 === 'after'">
                  <p>Where did you live when you applied for the loan?</p>
                  <p>England or Wales<input type="radio" v-model="input.studentLoanLocation" value="england"></p>
                  <p>Scotland or Northern Ireland<input type="radio" v-model="input.studentLoanLocation" value="scotland"></p>
                  <p>You will be covered under {{ studentLoanPlan }}</p>
                </fieldset>
              </div>
            </fieldset>
          <button type="submit" :class="classes.button" @click="setResult">Calculate</button>
        </form>
        <div class="output output--width" v-if="Object.keys(output).length > 0">
            <template v-if="payslipResult">
                <p class="output-description">Results based on <strong>{{ resultPeriod }}</strong> Gross pay of <span>{{ resultGrossPay | currency }}</span></p>
            </template>
            <tabs>
              <tab :key="'annual'" :name="tabNames.annual">
                <dl>
                  <div class="main-value">
                    <dt class="value-items value-title">Net Pay:</dt><dd class="value-items value-number">{{ output.annual.netPay | currency }} </dd>
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
                    <!--<dt>Gross Pay:</dt><dd>{{ resultSet.grossPay | currency }} </dd>-->
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
                    <!--<dt>Gross Pay:</dt><dd>{{ resultSet.grossPay | currency }} </dd>-->
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
      if (this.input.studentLoan2012) {
        loanPlan = 'plan 1'
        if (this.input.studentLoan2012 && this.input.studentLoanLocation === 'england') {
          loanPlan = 'plan 2'
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

  // Start of Flex classes.
    .flex {
        display: flex;
    }

    .flex-wrap {
      flex-wrap: wrap;
    }

    .flex-grow {
      flex-grow: 1;
    }

    // End of Flex classes.

    // Start of Global styles.

    .inline {
        display: inline-block;
    }

    .radio-spacing{
        margin-right: 0;
        border-radius: 0.2rem;
    }

    button {
      width: 100%;
    }

    // End of Global styles.

    // Start of header styles.

    .practiceweb-calculator {
        margin: auto;
        color: #333333;
    }

    .practiceweb-calculator-header {
        font-weight: bold;
        border-bottom: 5px solid #dce6eb;
        padding-bottom: 1rem;
    }

    // End of header styles.

    // Start of  Input styles.

    .input--width {
        width: 100%;
        .input-fields {
            padding: 1rem 0;
            .input-fields__title {
                padding-bottom: 0.5rem;
            }
        }
    }

    .input-fields__title {
        font-weight: bold;
    }

    .input-fields {
        .form-group {
            display: flex;
            .input-field {
                border: 1px solid #dce6eb;
                padding: 0.6875rem;
            }
            .input-field--label {
                padding: 0.45rem 1rem;
                border: 1px solid #dce6eb;
                &:hover {
                    background-color: #F2F2F2;
                }
                .input-field--radio {
                  margin-right: 0.5rem;
                }
                .input-field--radio--hidden {
                    width: 1px;
                    margin: 0;
                    visibility: hidden;
                }
            }
            .active {
                background-color: #F2F2F2;
                border-color: #F2F2F2;
                box-shadow: 0 1.5px 2px -2px grey;
            }
            .input-field--number {
                width: calc(100% - 30px);
            }
           .input-field--specialCharacter {
               padding: 0.36rem;
               border: 1px solid #dce6eb;
               width: 1.875rem;
               text-align: center;
               font-weight: bold;
           }
           .input-field--specialCharacter--pound {
             border-radius: 2px 0 0 2px;
             float: left;
           }
           .input-field--specialCharacter--percent {
             border-radius: 0 2px 2px 0;
           }
        }
        .form-group--gross {
          .input-field--label {
            text-align: center;
          }
        }
        .form-group--mobile {
          .input-field--label {
            width: 100%;
            margin-bottom: 10px;

          }
        }
        .form-group--twos {
            flex-wrap: wrap;
            .radio-spacing {
                margin: 0 0 10px 0;
                width: 100%;
            }
        }
        .form-group--loan-twos {
          width: 100%;
          flex-wrap: wrap;
        }
    }

    // End of Input styles.

    // Start of Output styles.

    .tabs-component {
      border: solid 1px #ddd;
    }

    .tabs-component-tab {
        color: #999;
        font-size: 14px;
        font-weight: 600;
        margin-right: 0;
        list-style: none;
        width: 33.3%;
        display: inline-block;
        border: solid 1px #ddd;
    }

    .tabs-component-tab:hover {
        color: #666;
    }

    .tabs-component-tab.is-active {
        color: #000;
        background-color: #f2f2f2;
    }

    .tabs-component-tab.is-disabled * {
        color: #cdcdcd;
        cursor: not-allowed !important;
    }

    .output {
        .tabs-component {
          .tabs-component-tabs {
            padding: 0;
          }
        }
        .output-description {
            padding: 1em 0;
            text-align: center;
        }
        .main-value {
            padding: 3em 4em;
            background-color: #f2f2f2;
            .value-items {
                text-align: center;
            }
            .value-title {
                padding-bottom: 1em;
            }
            .value-number {
                font-size: 2em;
            }
        }
        .values-header {
            padding-top: 2em;
            text-align: center;
            font-size: 1.2em;
        }
        .sub-values {
            font-size: 1.2em;
            padding: 1em 3em;
            .value-items {
                width: 50%;
                display: inline-block;
                padding-bottom: 0.5em;
            }
            .value-label {
                font-weight: normal;
            }
        }
        .value-number {
            margin: 0;
            text-align: right;
            font-weight: bold;
        }
    }

    .tabs-component-tab-a {
        align-items: center;
        color: inherit;
        display: flex;
        padding: 1em 0;
        text-decoration: none;
        text-align: center;
        justify-content: center;

    }

    // End of Output styles.

    @media (min-width: 991px) {

        // Start of Global responsive styles.

        button {
          width: auto;
        }

        .flex-grow {
          flex-grow: 0;
        }

        .radio-spacing {
          margin: 0 10px 0 0;
        }

        // End of Global responsive styles.

        // Start of Input responsive styles.

        .input-fields {
            .form-group {
                display: flex;
                .input-field {
                    border: 1px solid #dce6eb;
                    padding: 0.6875rem;
                }
                .border-left {
                  border-left: none;
                }
                .input-field--label {
                    &:hover {
                        background-color: #F2F2F2;
                    }
                    &:active {
                        background-color: #F2F2F2;
                    }
                }
                .input-field--number {
                    width: 35%;
                }
            }
            .form-group--mobile {
              .input-field--label {
                width: auto;
                margin-bottom: 0;
              }
            }
            .form-group--twos {
                width: 80%;
                .radio-spacing {
                    width: 47%;
                    margin: 0 10px 10px 0;
                }
            }
            .form-group--loan-twos {
              width: 90%;
            }
        }

        .input--width {
            width: 50%;
            display: inline-block;
        }

        // End of Input responsive styles.

        // Start of Output responsive styles.

        .output--width {
           width: 50%;
            display: inline-block;
            float: right;
        }

        .tabs-component {
          border: 0;
        }

        .tabs-component-tab {
            background-color: #fff;
            border: solid 1px #ddd;
            transform: translateY(2px);
            transition: transform .3s ease;
            width: 34%;
        }

        .tabs-component-tabs {
            align-items: stretch;
            display: flex;
            justify-content: flex-start;
            margin-bottom: -1px;
            padding: 0;
        }

        .tabs-component-tab.is-active {
            border-bottom: solid 1px #f2f2f2;
            z-index: 2;
            transform: translateY(0);
            border-top: 0.25em solid #1380bc;
        }

        .tabs-component-panels {
            border-top-left-radius: 0;
            background-color: #fff;
            border: solid 1px #ddd;
            border-radius: 0 6px 6px 6px;
            box-shadow: 0 0 10px rgba(0, 0, 0, .05);
        }

        // End of Output responsive styles.

    }
</style>
