# axios 取消 pending 状态的请求

获取当前所有的 XHR 请求，取消某个或多个正在 pending 的接口。

## src/api/request.js

```
import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
import store from '@/store'
// import { getToken } from '@/utils/auth'

// 记录所有的 ajax 请求
const allRequestsRecord = []

/**
 * 通过请求的 url 和 method 来标示请求唯一值
 * @param {*} config 配置信息
 * @returns
 */
function getUniqueId(config) {
  return `url=${config.url}&method=${config.method}`
}

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }

    // 设置请求的 cancelToken
    config.cancelToken = new axios.CancelToken(function executor(cancel) {
      // 添加记录，记录请求的唯一值和取消方法
      allRequestsRecord.push({ id: getUniqueId(config), cancel })
    })
    store.commit('setAllRequestsRecord', allRequestsRecord)

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      // Message({
      //   message: res.message || 'Error',
      //   type: 'error',
      //   duration: 5 * 1000
      // })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        // MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        //   confirmButtonText: 'Re-Login',
        //   cancelButtonText: 'Cancel',
        //   type: 'warning'
        // }).then(() => {
        //   store.dispatch('user/resetToken').then(() => {
        //     location.reload()
        //   })
        // })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
```

## src/store/index.js

```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有的 ajax 请求
    allRequestsRecord: []
  },
  mutations: {
    setAllRequestsRecord(state, data) {
      state.allRequestsRecord = data
    }
  },
  actions: {
  },
  modules: {
  }
})

```

## src/api/api.js

```
import request from './request'

export function fetchList(query) {
  return request({
    url: 'http://localhost:3000/data',
    method: 'get',
    params: query
  })
}

export function fetchList2(query) {
  return request({
    url: 'http://localhost:3000/data2',
    method: 'get',
    params: query
  })
}
```

## 请求示例

```
<script>
import * as API from '@/api/api.js'
export default {
  mounted() {
    API.fetchList().then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>
```

## 取消示例

```
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
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
```
