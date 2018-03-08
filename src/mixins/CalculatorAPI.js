/**
 *     submitCalculation (event) {
      let url = this.serviceRoot + this.servicePath
      let vm = this
      axios.post(url, this.input)
        .then((response) => {
          vm.output = response.data
          vm.$forceUpdate()
        })
    }
 **/

import axios from 'axios'

export default {
  props: ['serviceRoot'],
  methods: {
    submitCalculation (event) {
      let url = this.serviceRoot + this.servicePath
      let vm = this
      axios.post(url, this.input)
        .then((response) => {
          vm.output = response.data
          vm.$forceUpdate()
        })
    }
  }
}
