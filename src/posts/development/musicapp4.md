---
title: "musicapp 개발일기 4"
date: "2020-03-25"
author: "HoJoon Eum"
path: "/musicapp4"
coverImage: "../../images/turtle.jpg"
tags: ["Next.js", "React", "Web", "CSS", "HoJoon Eum"]
---

## musicapp 개발일기 4

2. 프론트엔드 사이드에 대한 구상 이어서...  
   나는 React를 이용해서 Component를 개발할 때 항상 재사용성을 높이려고 노력한다.
   예를 들면 어떤 정보를 표현하거나 기능을 구현하기 위해서 _html tag_ 가 필요하다고 할때,
   그 태그가 한번만 쓰이고 말 것인지, 전체 앱에 대해서 재사용이 필요할 것이지를 고민한다.
   그래서 만약 재사용의 여지가 있다고 판단하면 _Component_ 를 새로 만드는 방향으로 진행한다.

   이번에도 페이지를 구성할 때에, 같은 개념을 적용하여 페이지는 비록 컴포넌트와는 차이가 있는 개념이지만, 페이지 자체도 재사용 가능하도록 하기 위하여 페이지까지 컴포넌트화 하여 페이지 단계에서는 페이지 컴포넌트에 필요한 _Props_ 만 _getInitialProps_ 로 받아와서 전달해주는 형식으로 구성했다.

   가장 껄끄러웠던 부분중의 하나는, _Page_ 에서 _getInitialProps_ 로 _apiServer_ 로부터 _Data_ 를 가져올 때, _Json_ 형식으로 그대로 가공을 거치지 않고 받아오는 것이라, 내가 원하는 데이터만 추출하는 재가공 작업을 거치는 것이었다.
   나는 이부분을 내가 원하는 데이터만을 가지는 새로운 객체로 만들어서 *Props*로 넘길려고 하기로 결정했다. 이를 위해서 우선 받아온 _Json_ 형식의 데이터를 구조분해한 다음, 이를 _Loop_ 를 이용해서 각 _Json_ 객체 별로 원하는 데이터만 추출해 내는 것이다.
   다음은 내가 작성한 코드이다.

```javascript

 for (let i = 0; i < Object.keys(albumDatas).length; i++) {

    let newAlbumData = getRequiredData(albumDatas[i]);
    newAlbumDataArr.push(newAlbumData);

  }

function getRequiredData(rawAlbum) {

    if (Object.keys(rawAlbum["discInfo"]).length === 1) {
      const {
        coverImg,
        title,
        release_date,
        productInfo: [
          {
            seqno: [seqno],
            releasedate: [releasedate],
            release: [release]
          }
        ],
        releaseInfo: [
          {
            release_title: [release_title],
            release_type: [release_type],
            release_year: [release_year],
            release_date: [released_date],
            release_company: [release_company]
          }
        ],
        discInfo: [discs]
      } = rawAlbum;

      const {
        $: { no: no, side: side },
        title: [disctitle],
        song: songs
      } = discs;

      let dataRequired = {};
      dataRequired.coverImg = coverImg;
      dataRequired.albumTitle = title;
      dataRequired.release_date = released_date;
      dataRequired.release = release;
      dataRequired.tracklist = [];
      songs.forEach(song => {
        const {
          $: { track: track, id: id, picksong: picksong },
          title: [songtitle],
          runningtime: [runtime],
          videoUrl: videoUrl,
          performer: [
            {
              _: performer,
              $: { id: performerId }
            }
          ],
          lyric: [lyrics]
        } = song;
        let songObj = {};
        songObj.trackNo = track;
        songObj.songTitle = songtitle;
        songObj.runTime = runtime;
        songObj.videoUrl = videoUrl;
        songObj.lyrics = lyrics;
        dataRequired.tracklist.push(songObj);
      });

      return dataRequired;
    } else {
      const {
        coverImg,
        title,
        release_date,
        productInfo: [
          {
            seqno: [seqno],
            releasedate: [releasedate],
            release: [release]
          }
        ],
        releaseInfo: [
          {
            release_title: [release_title],
            release_type: [release_type],
            release_year: [release_year],
            release_date: [released_date],
            release_company: [release_company]
          }
        ],
        discInfo: [
        ]
      } = rawAlbum;
```

_Json_ 형식에서 _Array_ 는 _Javascript Array_ 처럼 iteration이 불가능하기 때문에, _Object.keys()_ 메소드를 이용해야 반복문의 사용이 가능하다. ( 이 부분을 처음에는 몰랐기 때문에 꽤나 시간을 잡아먹었다. _Json_ 은 원시타입 이외에는 모두 객체로 정의되기 때문인것 같다.)

또 하나는, 이 데이터 전부를 내가 직접 만든게 아니기 때문에, 전부 다 애초부터 원하는 형식의 _Json_ 데이터로 만들기에는 무리가 있었다. 그렇기 때문에 하나하나 객체 데이터 구조를 파악하여 에러없이 구조를 분해하기가 꽤나 힘들었다. 다음에는 애초부터 조금 더 사용하기 용이한 객체 데이터를 받아오도록 개선해야겠다.
