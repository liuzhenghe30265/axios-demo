<template>
  <div
    class="home">
    home
  </div>
</template>

<script>
import * as API from '@/api/api.js'
export default {
  name: 'Home',
  props: {
    msg: String
  },
  mounted() {
    API.fetchList().then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })

  },
  methods: {

  }
}
</script>
