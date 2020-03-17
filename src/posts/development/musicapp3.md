---
title: "musicapp 개발일기 3"
date: "2020-03-17"
author: "HoJoon Eum"
path: "/musicapp3"
coverImage: "../../images/turtle.jpg"
tags: ["Next.js", "React", "Web", "CSS", "HoJoon Eum"]
---

## musicapp 개발일기 3

1. 초기의 앱의 전체적 구조에 대한 구상
   처음에는 단일 서버로 운영하려고 했다.
   _Next.js_ 는 기본적으로 _SSR_ 이므로, 서버 인스턴스를 _express_ 를 이용하여 인스턴스를 하나 생성하고, 페이지를 렌더링 할 때 서버 사이드에서 먼저 _DB_ 와 연결하고,
   _DB_ 에 쿼리문을 보내 필요한 데이터를 받아오고, 그 데이터를 _page_ 의 _props_ 로 넘겨주어서
   이미 필요한 _props_ 를 가지고 있는 채로 _client_ 에 전달하고자 했다.

   ***

2) 프론트엔드 사이드에 대한 구상  
   _page_ 를 2개 생각했었다. 기본적인 **index** 페이지와, 그 페이지에서 링크를 달아
   내가 주로 보여주고 싶은 정보가 포함된 페이지로 넘어가게 하려고 했다.
   이를 위해서 _page_ 역할의 JS 파일 2개와, 그 _page_ 들을 구성할 _component_ 들이 필요할 것이라 예상했다.
   _component_ 와 _page_ 의 스타일에 관해서는, 여러가지 생각을 해보았다.
   크게 적용 방법은 3가지가 있는데,

   1. **global stylesheet**을 적용한다.  
      이 방법은 말 그대로 _page_ 전체에 _global_ 하게 _stylesheet_ 을 적용해서
      _html tag_ 의 _class, id_ 를 매칭시켜 스타일을 지정하는 방법이다.

   2. **JSX style**을 적용한다.  
      이 방법은 _React_ 의 _component_ level 에서 스타일을 지정하는 방법으로,
      스타일을 개별 _component_ 의 구성과 함께 할 수 있는 것이 큰 장점이다. 이렇게 하면 _component_ 의 재사용성도 늘고, _React_ 의 개념과도 상통하는 부분이 있어서 꽤 좋은 방법이라고 생각했다.

   3. **module.css** 를 적용한다.  
      이 방법은 위의 _JSX_ 를 적용하는 방법을 외부 _StyleSheet_ 으로 연장한 듯한 느낌을 주는 방법이다. _CSS_ 파일의 확장자명을 **_.module.css_** 로 지정하면,
      이 _CSS_ 파일을 **객체**로서 import 해 올 수 있다. 그런 다음 스타일 시트에서 지정한 _Class_ 스타일을 _CSS_ 객체의 프로퍼티로 접근할 수 있다. 이를
      **_className = { 객체.프로퍼티 }_** 와 같이 _jsx html_ 태그에 속성으로 넣어주면 스타일을 지정할 수 있다. 내가 생각하기에 이 방식의 장점은 외부 스타일 시트를 사용해서 스타일을 컴포넌트와 분리해서 관리 할 수 있는 구조가 된다는 것이고, 또 하나는 스타일을 _Javascript 변수_ 화 해서 동적으로 사용 할 수 있다는 것이다.
