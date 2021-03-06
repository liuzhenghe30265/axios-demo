/**
 * @name: 日期格式化
 * @msg: 对 Date 的扩展，将 Date 转化为指定格式的 String
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * eg:
 * dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * dateFormat(new Date(), "yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * dateFormat(new Date(), "yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * dateFormat(new Date(), "yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * dateFormat(new Date(), "yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 *
 * @param {*} date
 * @param {*} format
 * @return {*}
 */
export function dateFormat(date, format) {
  let iDate = null
  if (typeof date === 'number') {
    iDate = new Date(date)
  } else if (typeof date === 'string') {
    date = date.replace(/-/g, '/')
    if (date.indexOf('T') > -1) {
      const dotIndex = date.indexOf('.')
      date = date.substr(0, dotIndex)
      date = date.replace('T', ' ')
      date = new Date(date).getTime()
    }

    if (!isNaN(Number(date))) {
      date = Number(date)
    }

    iDate = new Date(date)
  } else if (date instanceof Date) {
    iDate = date
  } else {
    return false
  }

  // 时区
  // let timestamp = iDate.getTime()/1000 - 8 * 60 * 60;
  // iDate = new Date(timestamp*1000);

  const o = {
    'M+': iDate.getMonth() + 1, // 月份
    'd+': iDate.getDate(), // 日
    'h+': iDate.getHours() % 24 === 0 ? '00' : iDate.getHours() % 24, // 小时
    'H+': iDate.getHours(), // 小时
    'm+': iDate.getMinutes(), // 分
    's+': iDate.getSeconds(), // 秒
    'q+': Math.floor((iDate.getMonth() + 3) / 3), // 季度
    'S': iDate.getMilliseconds() // 毫秒
  }

  if (!format) {
    format = 'yyyy-MM-dd hh:mm:ss'
  }
  const week = {
    '0': '\u65e5',
    '1': '\u4e00',
    '2': '\u4e8c',
    '3': '\u4e09',
    '4': '\u56db',
    '5': '\u4e94',
    '6': '\u516d'
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (iDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(format)) {
    format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[iDate.getDay() + ''])
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }

  return format
}

/**
 * @name: 获取最近多少天的日期
 * @param {*} count 天数
 * @param {*} type 默认（向后计算）；before（向前计算）
 */
export function getDays(count, type) {
  const list = []
  if (type && type === 'before') {
    for (let i = 0; i < count; i++) {
      list.unshift(
        dateFormat(
          new Date(
            new Date().setDate(new Date().getDate() - i)
          ).toLocaleDateString(),
          'MM-dd'
        )
      )
    }
  } else {
    for (let i = 0; i < count; i++) {
      list.push(
        dateFormat(
          new Date(
            new Date().setDate(new Date().getDate() + i)
          ).toLocaleDateString(),
          'MM-dd'
        )
      )
    }
  }
  return list
}

/**
 * @name: 判断某年某月 1 号是星期几
 * @param {year}
 * @param {mounth}
 */
export function judjeFirstDay(year, mounth) {
  const date = new Date(year, mounth - 1, 1)
  const week = date.getDay()
  const weekArr = [1, 2, 3, 4, 5, 6, 7]
  return weekArr[week - 1]
}

/**
 * @name: 生成某年某月日历表
 * @param {*} year
 * @param {*} mounth
 */
export function createCalendar(year, mounth) {
  // 某个月一共有多少天
  const allDay = new Date(year, mounth, 0).getDate()
  // 某个月 1 号是星期几
  const firstDay = judjeFirstDay(year, mounth)
  // 需要多少行来展示
  const row = Math.ceil((allDay + firstDay) / 7)
  let k = firstDay - 1
  const result = []
  let count = 1
  // 生成日历二维数组
  for (let i = 0; i < row; i++) {
    result[i] = new Array(7)
    do {
      if (count <= allDay) {
        result[i][k] = {
          date: count
        }
        k++
        count++
      } else {
        break
      }
    } while (k < 7)
    k = 0
  }
  return result
}
