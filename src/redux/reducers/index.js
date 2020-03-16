import {combineReducers} from 'redux'
import countReducer from './count_reducer'
import personReducer from './person_reducer'

export default combineReducers({
    count:countReducer,
    persons:personReducer
})