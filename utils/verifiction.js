const verifiction = function (rules, data) {
  // console.log(rules)
  let flag = false
  for (let key in rules) {
    if (flag) {
      continue 
    }
    let d = data[key]
    let rule = rules[key];
    for (let i = 0; i< rule.length ; i++) {
      let item = rule[i]
      if (item.required) {
        flag = isNull(d)
      } else if (d, item.max) {
        flag = isMax(item.max)
      } else if (item.phone) {
        flag = !isPhone(d)
      } else if (d && item.email) {
        flag = !isEmail(d)
      }
      if (flag) {
        showMsg(item.msg)
        break
      }
    }
  }
  return !flag
}
module.exports = verifiction
// 提示信息
function showMsg(msg) {
  wx.showToast({
    title: msg,
    icon: 'none'
  })
}
// 是否为空
function isNull(data) {
  if (!data.length) {
    return true
  } else {
    return false
  }
}
// 是否超出
function isMax(data, max) {
  if (data.length > max) {
    return true
  } else {
    return false
  }
}
// 是否为邮箱
function isEmail(data) {
  if (data.length != 0) {
    let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!reg.test(data)) {
      return false
    } else {
      return true
    }
  }
}
// 是否为手机号
function isPhone(data) {
  if (data.length != 0) {
    let reg = /^1[34578]\d{9}$/;
    if (!reg.test(data)) {
      return false
    } else {
      return true
    }
  }
}
// 是否为中文字符
function isChinese(data) {
  if (data.length != 0) {
    let reg = [\u4e00 - \u9fa5];
    if (!reg.test(data)) {
      return false
    } {
      return true
    }
  }
}
// 表单是否完整
function required(data) {
  for (let key in data) {
    data[key] = data[key].replace(/ /g, '')
    if (!data[key]) {
      return false
    }
  }
  return true
}