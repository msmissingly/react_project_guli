import {SAVE_HEADER_TITLE} from '../action-types'
export default function(preState='',action){
    const {type,data} = action
    let newState
    switch (type) {
        case SAVE_HEADER_TITLE:
             newState=data
             return  newState
    
        default:
            return preState;
    }
}