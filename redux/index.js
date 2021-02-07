import { createStore, Store, applyMiddleware, compose } from 'redux';
import { MakeStore, createWrapper, Context, HYDRATE } from 'next-redux-wrapper';
import thunk from 'redux-thunk';


// combineReducers
import { combinedReducers } from './rootReducer';

// compose enhancers( && window as any)
const composeEnhancers = process.browser && (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;




// Declare initial state
// const initialState = {
//     auth: {user: 'bola'}
//   };

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload }
    default:
      return combinedReducers(state, action);
  };
}



const store = () => {
  //: Store 
  const store = createStore(
    rootReducer,
    //   initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};


// make store for wrapper : MakeStore : Context
const makeStore = (context) => store()

export const wrapper = createWrapper(makeStore, { debug: false });
