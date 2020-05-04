/**
 * CalculatorAPI mixin.
 * Handles communication with the API server.
 * Provides one property serviceRoot and expects servicePath to be provided
 * by the component.
 */
import axios from 'axios'

export default {
  props: ['serviceRoot'],
  methods: {
    /**
     * Send a calculation request to the service.
     *
     * @param event
     *   Event object triggering the submit.
     */
    submitCalculation (event) {
      // Call Vee-validate rules.
      this.$validator.validateAll().then((result) => {
        // Result is true is validation passed.
        if (result) {
          // Generate the url. servicePath should be set in the component.
          let url = this.serviceRoot + this.servicePath
          let vm = this
          // Send the post request with Axios.
          axios.post(url, this.input)
            .then((response) => {
              // Update the model with the response data.
              vm.output = response.data
              // Ensure that we update.
              vm.$nextTick()
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.log(event);
              // TODO catch error
              // TODO parse repsonse
              // TODO update object
              vm.error = error
              vm.$nextTick()
            })
        }
      })
    }
  }
}
