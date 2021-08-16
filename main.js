const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const net  = require('net')
const app  = express()
const mock = require('./mock/index')
const config = require('./config')


let port = config.PORT

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
mock(app)
init()





// 检测当前端口是否被使用
function init() {
  const server = net.createServer().listen(port)

  server.on('listening', () => {
    server.close()
    startServer()
  })

  server.on('error', ({ code }) => {
    // 端口被占用
    if (code === 'EADDRINUSE') { 
      console.log(`- EADDRINUSE: \x1B[31m%s\x1B[0m`, `Port ${port} is already in use and a new port is being reassigned\n`)
      port = port + 1
      init()
    }
  })
}

// 启动服务
function startServer() {
  app.listen(port, () => {
    console.log('\nApp running at:\n\n- Local: \x1B[34m%s\x1B[0m\n', 'http://localhost:' + port + '/updatelog/list')
  })
}

