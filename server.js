const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

const compiler = webpack(webpackConfig);

app.use(express.static(__dirname + '/www'));

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

io.on('connection', function(socket){
    console.log("a user connected")
    socket.on("send_message", message=>{
      console.log("sending message...")
      console.log(message)
      socket.broadcast.emit("new_message", message)
    })
    socket.on('disconnection', ()=>{
        console.log('a user disconnected')
    })
})

const server = http.listen(port, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
