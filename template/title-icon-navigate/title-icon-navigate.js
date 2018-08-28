const tap = function(e) {
  let dataset = e.currentTarget.dataset
  let data = dataset.data
  let type = dataset.type
  console.log(dataset)
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