import {DELETE_WORKER, GET_MESSAGE, GET_RESPONSE, GET_WORKER, GET_WORKERS, SET_IS_LOADER} from "./types";
import {sendRequest} from "../../api/api";

export const getWorkersData = (payload)=>({type:GET_WORKERS, payload});
const getWorkerData = (payload)=>({type:GET_WORKER, payload});
const setIsLoader = (payload)=>({type:SET_IS_LOADER, payload});
export const getMessage = (payload)=>({type:GET_MESSAGE, payload});
const deleteWorkerData = (payload) => ({type:DELETE_WORKER, payload})
export const getResponse = (payload)=> ({type:GET_RESPONSE, payload})

export const getWorkers = (id)=> {
    return async (dispatch)=>{
        try {
            dispatch(setIsLoader(true))
            const response = await sendRequest(`https://test-company-users.herokuapp.com/company/${id}/user`, 'GET')
            dispatch(getWorkersData(response))
            dispatch(setIsLoader(false))


        }catch (e) {
            console.log(e)
        }
    }
}

export const getWorker = (id, workerId)=> {
    return async (dispatch)=>{
        try {
            dispatch(setIsLoader(true))
            const response = await sendRequest(`https://test-company-users.herokuapp.com/company/${id}/user/${workerId}`, 'GET')
            dispatch(getWorkerData(response))
            dispatch(setIsLoader(false))
        }catch (e) {
            console.log(e)
        }
    }
}

export const editWorker = (id, userId, data)=> {
    return async (dispatch)=>{
        try {
            dispatch(setIsLoader(true))
            const response = await sendRequest(`https://test-company-users.herokuapp.com/company/${id}/user/${userId}`, 'PATCH', JSON.stringify(data))
            dispatch(setIsLoader(false))
        }catch (e) {
            console.log(e)
        }
    }
}

export const deleteWorker = (id, userId)=>{
    return async (dispatch)=>{
        try {
            dispatch(setIsLoader(true))
            const response = await fetch(`https://test-company-users.herokuapp.com/company/${id}/user/${userId}`, {
                method:'DELETE'
            })
            dispatch(deleteWorkerData(id))
            dispatch(setIsLoader(false))
        }catch (e) {
            console.log(e)
        }
    }
}

export const createWorker = (id, data)=>{
    return async (dispatch)=>{
        try {
            dispatch(setIsLoader(true))
            const response = await sendRequest(`https://test-company-users.herokuapp.com/company/${id}/user`, 'POST', JSON.stringify(data))
            if(response?.id){
                dispatch(getResponse(response))
            }
            if(response?.error){
               dispatch(getMessage(response.message))
           }
            dispatch(setIsLoader(false))
        }catch (e) {
            console.log(e)
        }
    }
}
