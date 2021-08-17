
module.exports = function(app) {
  const updatelog = require('./updatelogs')

  app.get('/updatelog/list', updatelog.list)
}