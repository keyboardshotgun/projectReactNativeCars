import {
  all, //call,
  delay,
  fork,
  put,
  takeLatest,
  call
  //throttle,
} from "redux-saga/effects";
import Axios from "axios";
import * as actionTypes from "../reducer/actionTypes";
import { REACT_APP_PIXELS_API_KEY } from "@env";

function* addCount(action: any) {
  try {
    yield put({ type: actionTypes.LOAD_CAR_DATA });
    yield put({ type: actionTypes.COUNT_SET, data: "up" });
    yield put({ type: actionTypes.LOAD_DONE_CAR_DATA });
  } catch (err) {
    yield put({
      type: actionTypes.LOAD_ERROR_CAR_DATA,
      data: err.message
    });
  }
}

function* addBackImage(action: any) {
  try {
    yield put({ type: actionTypes.BACK_IMG_SET, data: action.data });
  } catch (err) {
    yield put({
      type: actionTypes.LOAD_ERROR_CAR_DATA,
      data: err.message
    });
  }
}

function* removeCount() {
  try {
    yield put({ type: actionTypes.LOAD_CAR_DATA });
    yield put({ type: actionTypes.COUNT_SET, data: "down" });
    yield put({ type: actionTypes.LOAD_DONE_CAR_DATA });
  } catch (err) {
    yield put({
      type: actionTypes.LOAD_ERROR_CAR_DATA,
      data: err.message
    });
  }
}

function* resetCount() {
  try {
    yield delay(500);
    yield put({ type: actionTypes.LOAD_CAR_DATA });
    yield put({ type: actionTypes.COUNT_SET, data: "reset" });
    yield put({ type: actionTypes.LOAD_DONE_CAR_DATA });
  } catch (err) {
    yield put({
      type: actionTypes.LOAD_ERROR_CAR_DATA,
      data: err.message
    });
  }
}


function* updateCarData(action: any) {
  try {
    yield put({ type: actionTypes.LOAD_CAR_DATA });
    yield put({ type: actionTypes.SET_CAR_DATA, data: action.data });
    yield put({ type: actionTypes.LOAD_DONE_CAR_DATA });
  } catch (err) {
    yield put({
      type: actionTypes.LOAD_ERROR_CAR_DATA,
      data: err.message
    });
  }
}

// interface AxiosInstance {
//   request<T = any, R = AxiosResponse<T>> (config: AxiosRequestConfig): Promise<R>;
// }

//console.log("carSaga/REACT_APP_PIXELS_API_KEY =>", REACT_APP_PIXELS_API_KEY);
Axios.defaults.baseURL = "https://api.pexels.com/v1";
Axios.defaults.responseType = "json";
Axios.defaults.headers = { "Authorization": REACT_APP_PIXELS_API_KEY };

function getPhotoJsonAPI(page: number) {
  //console.log('getPhotoJsonAPI/page', page);
  return Axios.request<number, object[]>({
    method: "get",
    url: "/search?query=supercar&per_page=10&page=" + page
  })
    .then(( res: any ) => res )
    .catch((err: string) => {
      throw new Error().message = err;
    });
}

// photos
function* getPhotos(actions: any) {

  if ( actions && !actions?.data?.page ) {
    actions.data.page = 1;
    console.log('getPhotos/page error, set to 1');
  }

  try {
    const result = yield call(getPhotoJsonAPI, actions.data.page);
    //console.log("getPhotos===>", result.data);

    yield put({ type: actionTypes.LOAD_PHOTOS });

    yield put({
      type: actionTypes.ADD_PHOTOS,
      data: result.data
    });

    yield put({ type: actionTypes.LOAD_DONE_PHOTOS });

  } catch (err) {

    yield put({
      type: actionTypes.ERROR_PHOTOS,
      data: err.message
    });

  }
}

function* watchAddBackImageSaga() {
  yield takeLatest(actionTypes.BACK_IMG_ADD, addBackImage);
}

function* watchAddCountSaga() {
  yield takeLatest(actionTypes.COUNT_UP, addCount);
}

function* watchRemoveCountSaga() {
  yield takeLatest(actionTypes.COUNT_DOWN, removeCount);
}

function* watchResetCountSaga() {
  yield takeLatest(actionTypes.COUNT_RESET, resetCount);
}

function* watchUpdateCarData() {
  yield takeLatest(actionTypes.UPDATE_CAR_DATA, updateCarData);
}

// photo
function* watchGetPhotosSaga() {
  yield takeLatest(actionTypes.GET_PHOTOS, getPhotos);
}

export default function* carSaga() {
  yield all([
    fork(watchAddCountSaga),
    fork(watchRemoveCountSaga),
    fork(watchResetCountSaga),
    fork(watchUpdateCarData),
    fork(watchAddBackImageSaga),
    fork(watchGetPhotosSaga)
  ]);
}
