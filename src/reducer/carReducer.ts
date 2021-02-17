import * as actionTypes from './actionTypes';
import immerProduce from '../util/immerProduce';
import {Draft} from 'immer';
import { carsSpecificationsProps } from "../Components/ImageData";

//PEXELS.COM
type photosType = {
  "id": number,
  "width"?: number,
  "height"?: number,
  "url"?: string,
  "photographer"?: string,
  "photographer_url"?: string,
  "photographer_id"?: number,
  "avg_color"?: string,
  "src": {
    "original": string,
    "large2x"?: string,
    "large"?: string,
    "medium"?: string,
    "small"?: string,
    "portrait"?: string,
    "landscape"?: string,
    "tiny"?: string,
  }
}

type backImgType = {uri : string};

export type initProps = {
  readonly carData: {
    readonly selected: carsSpecificationsProps;
  };
  readonly counter: number;
  readonly carDataLoad: boolean;
  readonly carDataLoadError: boolean | null;
  readonly carDataLoadDone: boolean;
  readonly backImage: backImgType[];
  readonly photos: photosType[];

  readonly photos_page : number;
  readonly photos_next_page : string | null;
  readonly photos_total_results : number | null;

  readonly loadPhotos : boolean;
  readonly errorPhotos : string | null;
  readonly donePhotos : boolean;
};

const initState: initProps = {
  carData: {
    selected: {
      id: "",
      name: "",
      Manufacturer: "",
      MSRP: "",
      Year: "",
      Vehicle_type: "",
      Engine: "",
      Power: "",
      Length: "",
      Width: "",
      Height: "",
      Weight: "",
      Passengers: "",
      Zero_100: "",
      Top_speed: ""
    },
  },
  counter: 0,
  carDataLoad: false,
  carDataLoadError: false,
  carDataLoadDone: false,
  backImage : [],
  photos_page : 1,
  photos_next_page : null,
  photos_total_results : null,
  photos : [],
  loadPhotos : false,
  errorPhotos : null,
  donePhotos : false,
};

type setCounterPropsType = {
  data: string
}

export const setCount = (action: setCounterPropsType) => ({
  type: actionTypes.COUNT_SET,
  data: action.data,
});

export const resetCounter = () => ({
  type: actionTypes.COUNT_RESET,
});

type setCarDataPropsType = {
   data: {
     car_name: string,
     size: string,
     price: string,
   }
}

export const setCarData = (action: setCarDataPropsType) => ({
  type: actionTypes.SET_CAR_DATA,
  data: action.data
})

type setBackImageType = {
  data : backImgType
}

export const setBackImage = ( action : setBackImageType) => ({
  type: actionTypes.BACK_IMG_SET,
  data: action.data
})

export const loadPhotos = () => ({
  type: actionTypes.LOAD_PHOTOS
})

export const errorPhotos = (action: { data : string }) => ({
  type: actionTypes.ERROR_PHOTOS,
  data: action.data
})

export const donePhotos = () => ({
  type: actionTypes.LOAD_DONE_PHOTOS
})

type setPhotosType = {
  data: {
    next_page: string,
    page: number,
    per_page: number,
    total_results: number,
    photos: photosType[],
  };
}

export const setPhotos = (action: setPhotosType ) => ({
  type: actionTypes.ADD_PHOTOS,
  data: action.data
})

export const removePhotos = (action : { data : { id : number }}) => ({
  type: actionTypes.REMOVE_PHOTOS,
  data: action.data.id
})

export const resetAllPhotos = () => ({
  type: actionTypes.RESET_ALL_PHOTOS
})

type CounterAction =
  | ReturnType<typeof setCount>
  | ReturnType<typeof resetCounter>
  | ReturnType<typeof setCarData>
  | ReturnType<typeof setBackImage>
  | ReturnType<typeof loadPhotos>
  | ReturnType<typeof errorPhotos>
  | ReturnType<typeof donePhotos>
  | ReturnType<typeof setPhotos>
  | ReturnType<typeof removePhotos>
  | ReturnType<typeof resetAllPhotos>

const carReducer = (state: initProps = initState, action: CounterAction) =>
  immerProduce(state, (draft: Draft<initProps>) => {
    switch (action.type) {
      case actionTypes.BACK_IMG_SET:
        draft.backImage.unshift(action.data);
        break;
      case actionTypes.COUNT_SET:
        if (action.data === 'up') {
          draft.counter++;
        } else if (action.data === 'down') {
          if (draft.counter === 0) {
            draft.counter = 0;
          } else {
            draft.counter--;
          }
        } else if (action.data === 'reset') {
          draft.counter = 0;
        }
        break;
      case actionTypes.COUNT_RESET:
        draft.counter = 0;
        break;
      // case actionTypes.LOAD_CAR_DATA:
      //   draft.carDataLoad = true;
      //   draft.carDataLoadError = null;
      //   draft.carDataLoadDone = false;
      //   break;
      // case actionTypes.LOAD_ERROR_CAR_DATA:
      //   draft.carDataLoad = false;
      //   draft.carDataLoadError = true;
      //   draft.carDataLoadDone = false;
      //   break;
      // case actionTypes.LOAD_DONE_CAR_DATA:
      //   draft.carDataLoad = false;
      //   draft.carDataLoadError = false;
      //   draft.carDataLoadDone = true;
      //   break;
      case actionTypes.SET_CAR_DATA:
         draft.carData.selected = action.data;
      break;
      case actionTypes.LOAD_PHOTOS:
        draft.loadPhotos = true;
        draft.errorPhotos = null;
        draft.carDataLoadDone = false;
      break;
      case actionTypes.ADD_PHOTOS :
        draft.photos_page = action.data.page
        draft.photos_next_page = action.data.next_page
        draft.photos_total_results = action.data.total_results
        draft.photos = draft.photos.concat(action.data.photos);
      break;
      case actionTypes.ERROR_PHOTOS:
        draft.loadPhotos = false;
        draft.errorPhotos = action.data
        draft.carDataLoadDone = false;
      break;
      case actionTypes.LOAD_DONE_PHOTOS:
        draft.loadPhotos = false;
        draft.errorPhotos = null;
        draft.donePhotos = true;
      break;
      case actionTypes.REMOVE_PHOTOS:
        if(draft.photos.length > 0){
          draft.photos.filter( (data) => data.id !== action.data)
        }
      break;
      case actionTypes.RESET_ALL_PHOTOS:
        if(draft.photos.length > 0){
            draft.photos_page = 1;
            draft.photos_next_page = null;
            draft.photos_total_results = null;
            draft.photos = [],
            draft.loadPhotos  = false;
            draft.errorPhotos = null;
            draft.donePhotos  = false;
        }
      break;
      // case actionTypes.DELETE_CAR_DATA:
      //   draft.carData.selected = {
      //     car_name: '',
      //     size: '',
      //     price: '',
      //   };
      //   break;
      // case actionTypes.RESET_DATA:
      //   return initState;
      //   break;
      default:
        break;
    }
  });

export default carReducer;
