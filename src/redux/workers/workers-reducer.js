import {DELETE_WORKER, GET_MESSAGE, GET_RESPONSE, GET_WORKER, GET_WORKERS, SET_IS_LOADER} from "./types";

const initialState = {
    workers:[],
    worker:{},
    isLoader:false,
    message:[],
    responseMes:5
}

const WorkersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_WORKERS:
            return{
                ...state,
                workers:action.payload
            }
        case GET_WORKER:
            return {
                ...state,
                worker:action.payload
            }
        case DELETE_WORKER:
            return {
                ...state,
                workers:state.workers.filter(worker=> worker.id !== action.payload)
            }
        case SET_IS_LOADER:
            return {
                ...state,
                isLoader:action.payload

            }
        case GET_MESSAGE:
            return {
                ...state,
                message:action.payload

            }
        case GET_RESPONSE:
            return {
                ...state,
                responseMes: action.payload
            }
        default: return  state
    }
}

export default WorkersReducer;