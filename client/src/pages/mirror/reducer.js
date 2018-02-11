import { SECTION_POST_FAILURE, SECTION_POST_REQUEST, SECTION_POST_SUCCESS, MIRROR_POST_FAILURE, MIRROR_POST_REQUEST, MIRROR_POST_SUCCESS, MIRROR_GET_FAILURE, MIRROR_GET_REQUEST, MIRROR_GET_SUCCESS, FETCH_WEATHER_FAILURE, FETCH_WEATHER_REQUEST, FETCH_WEATHER_SUCCESS } from './types';

const INITIAL_STATE = {
  isRequesting: false,
  errorMessage: '',
  weather: {}
}

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
// Mirror Get
    case MIRROR_GET_REQUEST:
      return { ...state, isRequesting: true, errorMessage: action.errorMessage };
    case MIRROR_GET_SUCCESS:
      return { ...state, mirror: action.mirror, isRequesting: false };
    case MIRROR_GET_FAILURE:
      return { ...state, isRequesting: false, errorMessage: action.errorMessage };
// Mirror post
    case MIRROR_POST_REQUEST:
      return { ...state, isRequesting: true, errorMessage: action.errorMessage  };
    case MIRROR_POST_SUCCESS:
      return { ...state, isRequesting: false, mirror: action.mirror};
    case MIRROR_POST_FAILURE:
      return { ...state, isRequesting: false, errorMessage: action.errorMessage};
// Section post
    case SECTION_POST_REQUEST:
      return { ...state, isRequesting: true };
    case SECTION_POST_SUCCESS:
      return { ...state, isRequesting: false, section: action.section, errorMessage: action.errorMessage };
    case SECTION_POST_FAILURE:
      return { ...state, isRequesting: false, errorMessage: action.errorMessage};

// Weather Fetch
    case FETCH_WEATHER_REQUEST:
      return { ...state, isRequesting: true };
    case FETCH_WEATHER_SUCCESS:
      return { ...state, isRequesting: false, weather: action.weather };
    case FETCH_WEATHER_FAILURE:
      return { ...state, isRequesting: false, errorMessage: action.errorMessage };

    default:
      return state;
  }
};
