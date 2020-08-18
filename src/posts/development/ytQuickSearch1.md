---
title: "YouTube Quick Search Extension for Chrome 개발기 1"
date: "2020-08-17"
author: "HoJoon Eum"
path: "/ytQuickSearch1"
coverImage: "../../images/extension.png"
tags: ["youtube", "Chrome", "Extension", "Javascript", "HoJoon Eum"]
---

# YouTube Quick Search Extension for Chrome

![extension screenshot](../../images/extension.png)

## 익스텐션을 만들게 된 이유

나는 유튜브 검색을 필요한 정보를 가진 동영상을 검색하기 위해, 혹은 듣고 싶은 노래를 검색하기 위해
사용하는데, 항상 유튜브에서 검색을 할 때면, 새로운 탭을 열고, www.youtube.com 으로 접속한 다음,
검색창에 내가 원하는 검색어를 검색해야 했다. 하지만 늘 하던 방식이라 불편함을 못 느끼던 중, 최근에 유튜브에서
새로운 영상을 검색하는 빈도 수가 늘자, 이 과정이 은근히 일련의 시간의 지연을 발생시키는 요인들의 모음이라는
생각이 들었다. 그래서 처음에는 브라우저 검색창에 _www.youtube.com/results?search_query=_ **+ 검색어** 를 직접 입력해서 검색하기 시작했는데, 몇 번 하다보니 이 것 마저 불편하다 느껴졌다.
그래서 내가 직접 이 불편을 해소하기 위한 **Chrome** extension을 만들기로 결정했다.

---

## 익스텐션의 기본적 구조

익스텐션은 크게 2가지로 이루어진다.

1. 확장프로그램의 정보를 담고잇는 **manifest.json** 파일
2. 확장프로그램의 팝업을 구성하는 **html, css, javascript** 파일 (백그라운드 프로세스가 필요한 경우에는 background.js 포함)

---

### manifest.json

chrome 익스텐션 패키지에 꼭 포함되어야 하는 파일로, 웹 익스텐션을 정의 하는 파일이다.
좀 더 많은 정보는 https://developer.mozilla.org/ko/docs/Mozilla/Add-ons/WebExtensions/manifest.json 에서 볼 수 있다.

"manifest_version", "version", "name" 는 필수인 항목으로, 각각
manifest.json 파일의 버전, 웹익스텐션의 버전, 웹익스텐션의 이름을 의미한다.

나의 manifest.json 은 다음과 같았다.

```javascript

{
  "manifest_version": 2,

  "name": "YouTube Quick-Search",
  "description": "Quick Search Chrome Extension for YouTube",
  "version": "1.2",

  "browser_action": {
    "default_icon": "icon.png",
    "default_popup": "YQ.html"
  },

  "commands": {
    "_execute_browser_action": {
      "suggested_key": {
        "default": "Ctrl+Shift+Y",
        "mac": "MacCtrl+Shift+Y"
      },
      "description": "Opens YQ.html"
    }
  },
  "permissions": ["activeTab"]
}

```

나는 유저가 아이콘을 클릭하면, 혹은 단축키를 누르면 검색을 위한 창이 떠서, 검색어를 입력하도록
하는 기능을 원했기 때문애, "browser_action"에 아이콘과 팝업시 뜰 html 문서를 지정했다.
그리고 앞서 말한 단축키를 지정하기 위해 "commands"를 정의해주고, 마지막으로는 위의 기능들(아이콘 클릭, 단축키등) 구현하기 위해 "permissions"를 정의해 주었다.

---

### 나머지(html, css, javscript)

나는 별도의 백그라운드 프로세스를 필요로하는 익스텐션이 아니었기 때문에,
이제는 팝업을 구성하는 윈도우를 웹페이지와 똑같이 구현하면 되었다. 간단하게 검색창을 만들고,
설명을 추가해주었다.

추가로 유저가 직접 현재 탭에서 검색창을 열것인지, 새로운 탭에서 열것인지를 선택 할 수 있게
하기 위해 체크 박스를 하나 만들고, 이 상태를 팝업이 사라져도 유지할 수 있게하기 위해 **localStorage** 를 사용했다.

## 후기

갑작스럽게 떠올린 생각이라 스스로도 조금 당황스럽기는 했지만, 생각보다 내가 생각한 수준의
익스텐션은 만들기가 쉬워서 다행이었다. 생각보다 많은 API를 Chrome에서 제공하고 있으니,
또 다른 아이디어가 떠오르면 자유롭게 새로운 익스텐션을 만들 수 있을 것 같다.
역시나 내가 생각한 것을 바로 만들 수 있어서 너무 좋았고, 아주 의미 없는 것이 아니라
생활 속의 불편을 해소할 수 있는 것이어서 더욱 의미가 있는 개발이었던 것 같다.

그런데 크롬 익스텐션 개발자의 거주 지역에 한국이 없다는 것이 조금 충격이었다...  
그만큼 한국에서 크롬 익스텐션을 개발하는 사람이 없다는 것이겠지... 많이 아쉬웠다.
