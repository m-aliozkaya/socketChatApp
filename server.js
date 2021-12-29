var express = require("express");
const fs = require('fs')

var app = express();
const { CryptoHelper } = require("./cryptoHelper");

var http = require("http").createServer(app);
var socketIO = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

var users = [{userName : "Krai"},{userName : "Salih"}];

socketIO.on("connection", function (socket) {
  socket.on("connected", function (user) {
    const userIndex = users.findIndex(x => x.userName == user);
    users[userIndex] = {userName : user, socketId : socket.id, keys: CryptoHelper.createKeys() }
    console.log("Users : ", users);
  });

  socket.on("sendEvent", async function (data) {
    const user = users.find(x => x.userName != data.userName);
    let cipherText = "Mesaj şifreli gönderilmemiş";

    if(data.algorithm != ''){
      cipherText = data.algorithm == 'sha' ? CryptoHelper.encyrptSha256(data.message, user.keys.publicKey) : CryptoHelper.encyrptSpn(data.message, user.keys.spnKey)
    }

    var sendedMessage = {plainText : data.message, cipherText : cipherText};
    socket.to(user.socketId).emit("messageReceived", sendedMessage);
  });

});

http.listen(process.env.PORT || 3000, function () {
  console.log("Server is started.");
});

