const toUrl = function(e) {
  let url = e.currentTarget.dataset.url
  url && wx.navigateTo({
    url,
  })
}

export default toUrl;