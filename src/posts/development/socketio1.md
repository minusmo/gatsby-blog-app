---
title: "Node.js, socket.io를 이용한 간단한 채팅 웹앱 만들기"
date: "2020-05-29"
author: "HoJoon Eum"
path: "/socketio1"
coverImage: "../../images/turtle.jpg"
tags: ["Node.js", "API", "express", "socket.io", "HoJoon Eum"]
---

# socket.io 를 이용한 간단한 채팅 웹앱 만들기

**_React Native_** 를 이용하여 채팅 서비스를 구현하기 위해, 어떤 방법이 있을지 모색하다가 **_Node.js_** 에 소켓 활용을 더 쉽게 할 수 있도록 만들어진 라이브러리인
**_socket.io_** 를 발견하였다. 소켓을 활용한 통신을 구현하는 것은 나에겐 처음이었기 때문에 라이브러리를 활용하는 것이라도 기본적인 통신 과정을 이해하는 것부터 시작해야했다.

---

## socket의 필요성에 대하여

실시간 채팅을 구현하기 위해서는 단순 http 통신으로는 부족하다. http 통신은 tcp/ip 를 기반으로 client의 request에 대해 server에서 response를 주는 형식인데, 요청을 보내고 그에 대한 응답을 받는 동안에 다른 update에 관해서 client가 정보를 업데이트 받을 수 없기 때문에 진정한 '실시간'의 통신을 구현하기 어렵다. 이 때문에 socket을 이용하는 것이다.

### socket 이란

socket은 TCP 통신의 네트워크 레이어 기반의 통신방식으로, 데이터 스트림을 이용한 실시간 통신 방식이다. 다시말해, 클리이언트와 서버간에 직접 정보를 주고 받을 수 있는 통로를 만들어, 이 통로로 데이터를 직접 주고받는다고 할 수 있다.

---

## socket.io 에 대하여

원래는 Node.js의 기본 **_net.socket_** 을 이용해서 구축하는 것이지만, **_socket.io_** 는 이벤트 설정, 자동 재접속, 등등 실시간 통신을 더 쉽게 할 수 있도록 편리한 api들을 많이 갖추고 있다.

### socket.io 의 사용방법에 대하여

소켓은 tcp 네트워크 레이어의 통신이고 html 페이지를 보내어주는 것은 http 통신 레이어이기 때문에, 서버에 두가지 인스턴스가 필요하다. 하나는 client로 부터 http request가 들어왔을 때 이에 대한 response로 html 페이지를 보내줄 수 있는 라우팅 및 리퀘스트 핸들링이 가능한 인스턴스와, 다른 하나는 client에서 socket.io 인스턴스로 소켓 연결 요청을 보냈을 때 이에 응답할 수 있는 tcp 레이어의 socket.io 서버 인스턴스이다.  
나는 후자의 인스턴스로 **_express_** 를 사용했다. **_express_** 는 **_http.createServer()_** 의 parameter로 넘겨져 **_requestListener_** 역할을 한다.

```javascript
const express = require("express")();
const server = require("http").createServer(express);
const io = require("socket.io")(server);
```

위와 같이 인스턴스를 구성하게 되는데, 3번째 줄은 **_socket.io_** 를 http 서버에 binding 하기 위해 **_io()_** 함수의 parameter로 http서버 인스턴스를 넘겨주게된다. 이를 통해 같은 포트로의 http 통신으로 들어온 소켓 연결 요청을 서버의 **_socket.io_** 인스턴스가 받게 된다.

---

### socket.io 로 데이터를 주고받는 방식에 대하여

방식은 아주 간단하다. **_io_** 인스턴스 하나에는 여러개의 소켓이 연결될 수 있는데, 그 소켓들로부터 온 데이터 전송 이벤트들은 **_io.on(이벤트이름, callback(소켓))_** 함수로 받을 수 있다. 각 소켓간의 통신은 **_socket.emit(이벤트이름, 전송할 데이터)_** 와
**_socket.on(이벤트이름, 전송받은데이터)_** 로 이루어진다. 소켓 메소드로 이루어지는 통신은 각 소켓 다시말해 각각의 클리이언트와 서버간의 1:1 통신이되는 것이고, io 메소드로 이루어지는 통신은 모든 클라이언트 와 서버간의 N:1의 통신이 되는 것이다. 이를 이용해서 클라이언트마다 개별적으로 처리할 부분과 전체적으로 처리할 부분을 나눌 수 있다.

이어서...
