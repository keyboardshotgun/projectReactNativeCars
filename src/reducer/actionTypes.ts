// carReducer
export const RESET_DATA = 'all/RESET' as const;

export const LOAD_CAR_DATA = 'car/LOAD' as const;
export const LOAD_ERROR_CAR_DATA = 'car/ERROR' as const;
export const LOAD_DONE_CAR_DATA = 'car/DONE' as const;

export const UPDATE_CAR_DATA = 'car/UPDATE' as const;
export const SET_CAR_DATA = 'car/SET' as const;
export const DELETE_CAR_DATA = 'car/DELETE' as const;

export const COUNT_UP = 'counter/UP' as const;
export const COUNT_SET = 'counter/SET' as const;
export const COUNT_DOWN = 'counter/DOWN' as const;
export const COUNT_RESET = 'counter/RESET' as const;

export const BACK_IMG_ADD = 'backgroundImage/add' as const;
export const BACK_IMG_SET = 'backgroundImage/set' as const;

// Pexels API.COM
export const LOAD_PHOTOS = 'photos/LOAD' as const;   // get api try start / end request
export const ERROR_PHOTOS = 'photos/ERROR' as const; // get api start / end error
export const GET_PHOTOS = 'photos/GET' as const;     // get api request start
export const LOAD_DONE_PHOTOS = 'photos/DONE' as const; // no more request API.
export const ADD_PHOTOS = 'photos/ADD' as const;        // photos to state
export const REMOVE_PHOTOS = 'photos/REMOVE' as const;  // remove from state photo by id
export const RESET_ALL_PHOTOS = 'photos/RESET_ALL_PHOTOS' as const;
