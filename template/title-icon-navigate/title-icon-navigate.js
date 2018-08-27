const tap = function(e) {
  let dataset = e.currentTarget.dataset
  let key = Object.keys(dataset)
  let data = dataset[Object.keys(dataset)]
  key == 'url' && wx.navigateTo({
    url: data,
  })
  key == 'phone' && wx.makePhoneCall({
    phoneNumber: data,
  })
}

export default tap;