const Mock = require('mockjs')
const list = []
const count = 100

for (let i = 0; i < count; i++) {
  list.push(
    Mock.mock({
      id: '@increment',
      title: '@title',
      username: '@first',
      create_time: '@datetime',
      old_adderss: '@county(true)',
      new_address: '@county(true)',
      msg: '@cparagraph(1, 15)',
      "isnew|1-2": true,
      "status|1-3": 1
    })
  )
}

exports.list = (req, res) => {
  const { page = 1, limit = 10} = req.query
  const data = list.filter((item, index) => index < limit * page && index >= limit * (page - 1))
  
  res.status(200).json({
    status: 200,
    count: data.length,
    result: data,
  })
}

