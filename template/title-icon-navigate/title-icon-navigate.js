const tap = function(e) {
  let {data, type} = e.currentTarget.dataset
  if (!type) {
    return
  } 
  type == 'url' && wx.navigateTo({
    url: data,
  })
  type == 'phone' && wx.makePhoneCall({
    phoneNumber: data,
  })
}

export default tap;