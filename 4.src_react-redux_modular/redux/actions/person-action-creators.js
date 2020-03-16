import { ADD_PERSON } from "../action-types"

export const createAddPersonAction = (personObj)=>({type:ADD_PERSON,data:personObj})