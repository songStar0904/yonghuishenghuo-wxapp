let goodsData = require('../libs/goodsData.js')
const getGoods = () => {
  // 随机生商品
  let goods = []
  for (let i = 0; i < Math.random() * 10; i++) {
	goods.push(goodsData[Math.random() > 0.5 ? 0 : 1]);
  }
  return goods
}
module.exports = getGoods