<template>
  <div
    id="app">
    <button
      @click="handleCancelRequest">cancelRequest</button>
    <!-- <div
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
    <router-view /> -->
    <table>
      <tr
        v-for="(tr, index) of calendarData"
        :key="index">
        <td
          v-for="(td, tdindex) of tr"
          :key="tdindex">
          <b
            v-if="td && td.date">
            {{ td.date }}
          </b>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { dateFormat, getDays, createCalendar } from '@/utils/utils.js'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      calendarData: [],
      allRequestsRecordList: []
    }
  },
  computed: {
    ...mapState(['allRequestsRecord'])
  },
  watch: {
    allRequestsRecord: {
      handler(val) {
        this.allRequestsRecordList = val
      }
    }
  },
  mounted() {
    console.log(dateFormat(new Date()))
    console.log(dateFormat('2020-2-2 23:00:00'))
    console.log(getDays(10, 'before'))
    console.log(getDays(10))
    console.log(createCalendar(2020, 5))
    this.calendarData = createCalendar(2021, 5)
  },
  methods: {
    handleCancelRequest() {
      console.log(this.allRequestsRecordList)
      this.allRequestsRecordList.forEach((item) => {
        item.cancel('cancel')
      })
    }
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
