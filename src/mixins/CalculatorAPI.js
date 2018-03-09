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
      // Generate the url. servicePath should be set in the component.
      let url = this.serviceRoot + this.servicePath
      let vm = this
      // Send the post request with Axios.
      axios.post(url, this.input)
        .then((response) => {
          // Update the model with the response data.
          vm.output = response.data
          // Force udpate is required for the template to update.
          vm.$forceUpdate()
        })
    }
  }
}
