/**
 * Calculator Style Mixin.
 * Use named styles to generate a set of classnames that a template can use.
 **/

export default {
  props: ['calculatorStyle'],
  computed: {
    classes: function () {
      let classes = {}
      let classMap = {
        default: {
          button: 'btn'
        },
        divi: {
          button: 'et_pb_button'
        }
      }
      if (classMap.hasOwnProperty(this.calculatorStyle)) {
        classes = classMap[this.calculatorStyle]
      } else {
        classes = classMap.default
      }
      return classes
    }
  }
}
