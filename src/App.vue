<template>
  <div
    id="app">
    <button
      @click="handleCancelRequest">cancelRequest</button>
    <div
      id="nav">
      <router-link
        to="/">
        Home
      </router-link>
      |
      <router-link
        to="/about">
        About
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      allRequestsRecordList: []
    }
  },
  methods: {
    handleCancelRequest() {
      console.log(this.allRequestsRecordList)
      this.allRequestsRecordList.forEach((item) => {
        item.cancel('cancel')
      })
    }
  },
  watch: {
    allRequestsRecord: {
      handler(val) {
        this.allRequestsRecordList = val
      }
    }
  },
  computed: {
    ...mapState(['allRequestsRecord'])
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
