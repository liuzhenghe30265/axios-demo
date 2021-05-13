<template>
  <div
    class="about">
    about
  </div>
</template>

<script>
import * as API from '@/api/api.js'
export default {
  name: 'About',
  props: {
    msg: String
  },
  mounted() {
    API.fetchList2().then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>