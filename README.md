# projectReactNativeCars

> Dependencies 
 

[ ![alt text](https://img.shields.io/badge/React-v16.13.1-white?style=flat&labelColor=blue&logoColor=black&logo=react) ]
[ ![alt text](https://img.shields.io/badge/React--Native-v0.63.4-white?style=fla&labelColor=blue&logoColor=blackt&logo=react) ]
[ ![alt text](https://img.shields.io/badge/Typescript-v4.1.3-white?style=flat&labelColor=blue&logoColor=black&logo=typescript) ]

[ ![alt text](https://img.shields.io/badge/Redux-v7.2.2-white?style=flat&labelColor=blue&logoColor=black&logo=redux) ]
[ ![alt text](https://img.shields.io/badge/Redux--saga-v1.1.3-white?style=flat&labelColor=blue&logoColor=black&logo=redux-saga) ]
[ ![alt text](https://img.shields.io/badge/React--Navigation-v5-white?style=flat&labelColor=blue&logoColor=black&logo=react) ]

[ ![alt text](https://img.shields.io/badge/React--native--reanimated-v2.0.0--rc.0-white?style=flat&labelColor=blue&logoColor=black&logo=react) ]
[ ![alt text](https://img.shields.io/badge/React--native--redash-v16.0.8-white?style=flat&labelColor=blue&logoColor=black&logo=react) ]


### 스플레쉬 스크린 [ ![alt text](https://img.shields.io/badge/React--native--splash--screen-v3.2.0-white?style=flat&labelColor=blue&logoColor=black&logo=react) ]
- Splash Screen for Android / IOS
- Must not have its own title.
- Must link to local image in current repository.
- Must appear directly after the title.

![1 splash_screen_60p_30s](https://user-images.githubusercontent.com/25360777/108144861-d3642000-710d-11eb-95b7-e2f1066196fd.gif)


### 커스텀 네비게이션 과 프로그래스 바 [ ![alt text](https://img.shields.io/badge/React--native--reanimated-v2.0.0--rc.0-white?style=flat&labelColor=blue&logoColor=black&logo=react) ]
- PanGetstureHandler로 사용하여 개발한 슬라이더
- rn-reanimated를 사용하여 개발한 Animated 프로그래스 바

![2 customSlider_60p_30s](https://user-images.githubusercontent.com/25360777/108144893-e1b23c00-710d-11eb-8430-e286ed92766a.gif)


### 이미지 뷰어 [ ![alt text](https://img.shields.io/badge/React--native--fast--image-v8.2.4-white?style=flat&labelColor=blue&logoColor=black&logo=react) ]


- FlatList와 React-native 내장 Animated로 개발한 커스텀 이미지 뷰어
- 상단과 하단 두개의 FlatList들을 onScrollMomentsEnd 를 사용하여 서로 동기화 합니다.
- onEndReached 이벤트로 API 접속 함수를 동작하여Pexels.com API를 활용한 새로운 이미지를 가져 옵니다.
- 신규로 가져온 이미지들이 존재 한다면 Redux-saga와 immer.js로 status에 추가 합니다.

![3 customImaageviwer_download_from_web_60p_30s](https://user-images.githubusercontent.com/25360777/108144918-ec6cd100-710d-11eb-934f-ce850e3593af.gif)

### 웹이미지 다운로드 [ ![alt text](https://img.shields.io/badge/Rn--fetch--blob-v0.12.0-white?style=flat&labelColor=blue&logoColor=black&logo=react) ]
- rn-fetch-blob를 사용하여, 웹 이미지를 다운로드 처리하고, 
- Toast로 사용자에게 다운로드가 완료 되었다는 것을 알려 줍니다.
- 다운로드의 성공과 실패를 Android-media-manager로 상태 관리를 합니다.

![4 image_download_60p_30s](https://user-images.githubusercontent.com/25360777/108144940-f5f63900-710d-11eb-8443-db68a10023a5.gif)


### 글로벌 모달 [ ![alt text](https://img.shields.io/badge/React--native--svg-v12.1.0-white?style=flat&labelColor=blue&logoColor=black&logo=react) ]
- 글로벌 모달 컴포넌트 개발.
- React-native-svg + RN-reanimated로 간단한 placeholder 개발

![5 modal and animated_60p_30s](https://user-images.githubusercontent.com/25360777/108144962-ff7fa100-710d-11eb-898b-bdb9848d7544.gif)

### 맵활용 [ ![alt text](https://img.shields.io/badge/React--native--mapbox--gl-v8.1.0-white?style=flat&labelColor=blue&logoCoor=black&logo=google-maps) ]
- mapbox api 활용하여 위치정보 처리
- 커스텀 버튼을 제작하여 map 컨트롤 처리
- 
![6 map_30p_15p](https://user-images.githubusercontent.com/25360777/108144976-07d7dc00-710e-11eb-8bed-eda478c2f53a.gif)

### 배경화면 지정 [ ![alt text](https://img.shields.io/badge/React--native--image--crop--picker-v0.35.3-white?style=flat&labelColor=blue&logoCoor=black&logo=react) ]
- 디바이스 미디어 라이브러리에서 저장되어 있는 사진을 선택하고, 단순한 crop 기능 제공

![7 image modify_60p_25f_30s](https://user-images.githubusercontent.com/25360777/108144990-0efeea00-710e-11eb-8020-f2d9dbd74ecc.gif)
![8 layered_60p_30s](https://user-images.githubusercontent.com/25360777/108145022-19b97f00-710e-11eb-9f25-1527e4441dd0.gif)
