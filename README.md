# Pproject 소개

> 슈퍼자동차 소개 , Pexels.com API를 사용한 자동차 이미지 검색 및 저장
- 기획 및 API 결정 : 2일
- UI 디자인 / 이미지 선별 및 수정 : 2일
- 기본세팅 및 프로젝트 구조, 라이브러리 설치 : 1일
- 코드작성 : 2일
- 테스트 : 1일
- 스크롤 네비게이션 / 이미지 뷰어 / 드롭다운 메뉴 / 글로벌 모달 등등 커스텀으로 개발
- pexels.com API를 통한 슈퍼 카 이미지 제공 (120장 한도)
- 원하는 이미지를 디바이스에 저장 / 관리
- Project Common Dependencies

  [![React](https://img.shields.io/badge/React-v16.13.1-white?style=flat&labelColor=blue&logoColor=black&logo=react)](https://github.com/facebook/react)
[![RN](https://img.shields.io/badge/React--Native-v0.63.4-white?style=fla&labelColor=blue&logoColor=blackt&logo=react)](https://github.com/facebook/react-native)
[![Typescript](https://img.shields.io/badge/Typescript-v4.1.3-white?style=flat&labelColor=blue&logoColor=black&logo=typescript)](https://github.com/microsoft/TypeScript)

  [![Redux](https://img.shields.io/badge/Redux-v7.2.2-white?style=flat&labelColor=blue&logoColor=black&logo=redux)](https://github.com/reduxjs/redux)
[![Saga](https://img.shields.io/badge/Redux--saga-v1.1.3-white?style=flat&labelColor=blue&logoColor=black&logo=redux-saga)](https://github.com/redux-saga/redux-saga)
[![Navigation](https://img.shields.io/badge/React--Navigation-v5-white?style=flat&labelColor=blue&logoColor=black&logo=react)](https://github.com/react-navigation/react-navigation)

  [![Reanimated](https://img.shields.io/badge/React--native--reanimated-v2.0.0--rc.0-white?style=flat&labelColor=blue&logoColor=black&logo=react)](https://docs.swmansion.com/react-native-reanimated/)
[![Redash](https://img.shields.io/badge/React--native--redash-v16.0.8-white?style=flat&labelColor=blue&logoColor=black&logo=react)](https://github.com/wcandillon/react-native-redash)
</br></br></br>
***
## Splash Screen
- [![Splash](https://img.shields.io/badge/React--native--splash--screen-v3.2.0-white?style=flat&labelColor=blue&logoColor=black&logo=react)](https://github.com/crazycodeboy/react-native-splash-screen)
- Android / iOS

![1 splash_screen_60p_30s](https://user-images.githubusercontent.com/25360777/108144861-d3642000-710d-11eb-95b7-e2f1066196fd.gif)
</br></br></br>
***
## Swipe & Touch Navigation / Animated Progress bar
- [![Reanimated](https://img.shields.io/badge/React--native--reanimated-v2.0.0--rc.0-white?style=flat&labelColor=blue&logoColor=black&logo=react)](https://docs.swmansion.com/react-native-reanimated/)
- 슬라이드 네비게이션 : rn-reanimated + PanGetstureHandler
- 터치유형에 따른 반응처리 및 가속도 처리
- Animated progress bar : HOC 형태로 개발

![2 customSlider_60p_30s](https://user-images.githubusercontent.com/25360777/108144893-e1b23c00-710d-11eb-8430-e286ed92766a.gif)
</br></br></br>
***
## Image viewer
- [![Fast](https://img.shields.io/badge/React--native--fast--image-v8.2.4-white?style=flat&labelColor=blue&logoColor=black&logo=react)](https://github.com/DylanVann/react-native-fast-image)
- 두개의 FlatList사용, onScrollMomentsEnd 이벤트로 상호작용
- onEndReached 이벤트로 Pexels.com API 접속 신규 이미지 조회
- Redux-saga와 immer.js로 status 관리

![3 customImaageviwer_download_from_web_60p_30s](https://user-images.githubusercontent.com/25360777/108144918-ec6cd100-710d-11eb-934f-ce850e3593af.gif)
</br></br></br>
***
## Web Image Download
- [![Fetch](https://img.shields.io/badge/Rn--fetch--blob-v0.12.0-white?style=flat&labelColor=blue&logoColor=black&logo=react)](https://github.com/joltup/rn-fetch-blob)
- 웹 이미지를 지정한 디바이스 저장소에 다운로드
- 다운로드 완료/실패 Toast 알림
- Android downloadmanager 다운로드 관리

![4 image_download_60p_30s](https://user-images.githubusercontent.com/25360777/108144940-f5f63900-710d-11eb-8443-db68a10023a5.gif)
</br></br></br>
***
### Global Modal Screen
- [![Modal](https://img.shields.io/badge/React--native--svg-v12.1.0-white?style=flat&labelColor=blue&logoColor=black&logo=react)](https://github.com/react-native-svg/react-native-svg)
- 글로벌 모달 컴포넌트 개발.
- React-native-svg + RN-reanimated 개발

![5 modal and animated_60p_30s](https://user-images.githubusercontent.com/25360777/108144962-ff7fa100-710d-11eb-898b-bdb9848d7544.gif)
</br></br></br>
***
## Map & Locations
- [![Mapbox](https://img.shields.io/badge/React--native--mapbox--gl-v8.1.0-white?style=flat&labelColor=blue&logoCoor=black&logo=google-maps)](https://github.com/react-native-mapbox-gl/maps)
- mapbox API
- 지정한 위치로의 이동 및 현재 위치 보 
- map 컨트롤을 위한 버튼 개발

![6 map_30p_15p](https://user-images.githubusercontent.com/25360777/108144976-07d7dc00-710e-11eb-8bed-eda478c2f53a.gif)
</br></br></br>
***
## Simple Edit Image
- [![CropPicker](https://img.shields.io/badge/React--native--image--crop--picker-v0.35.3-white?style=flat&labelColor=blue&logoCoor=black&logo=react)](https://github.com/ivpusic/react-native-image-crop-picker)
- 디바이스 라이브러리
- 이미지 crop 처리
- 이미지 배경 처리

![7 image modify_60p_25f_30s](https://user-images.githubusercontent.com/25360777/108144990-0efeea00-710e-11eb-8020-f2d9dbd74ecc.gif)
![8 layered_60p_30s](https://user-images.githubusercontent.com/25360777/108145022-19b97f00-710e-11eb-9f25-1527e4441dd0.gif)
</br></br></br>
