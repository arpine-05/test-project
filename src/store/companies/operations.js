import { makeRequest } from "../../services";

import { companiesSlice } from "./companiesSlice";

const getAllCompanies = () => {
    const { setCompanies, setIsLoading } = companiesSlice.actions

    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true))
            const {data} = await makeRequest({
                endPoint:'company'
            })
            dispatch(setCompanies(data))
            dispatch(setIsLoading(false))

        }catch(e) {
            console.log(e)
        }
    }
}

const getCompany = (id) => {
    const { setCompany } = companiesSlice.actions
    return async (dispatch) => {
        try {
            const {data} = await makeRequest({
                endPoint:`company/${id}`
            })
            dispatch(setCompany(data))
        }catch(e) {
            console.log(e)
        }
    }    
}


const editCompany = (id, updatedData) => {
    const {setCompany} = companiesSlice.actions
    return async (dispatch) => {
        try {
            const {data} = await makeRequest({
                endPoint:`company/${id}`,
                method: 'PATCH',
                body: JSON.stringify(updatedData)
            })
            dispatch(getAllCompanies())
            dispatch(setCompany(data))
        }catch(e) {
            console.log(e)
        }
    }   
}

const addCompany = (newData) => {
    return async (dispatch) => {
        try {
            await makeRequest({
                endPoint:`company`,
                method: 'POST',
                body: JSON.stringify(newData)
            })
            dispatch(getAllCompanies())
        }catch(e) {
            console.log(e)
        }
    }   
}


const addCompanyWorker = (id, newData) => {
    const {setCompany} = companiesSlice.actions
    return async (dispatch) => {
        try {
            const {data} = await makeRequest({
                endPoint:`company/${id}/user`,
                method: 'POST',
                body: JSON.stringify(newData)
            })
            dispatch(getAllCompanies())
            dispatch(setCompany(data))
        }catch(e) {
            console.log(e)
        }
    }   
}


const editCompanyWorker = (id, workerId, newData) => {
    const {setCompany} = companiesSlice.actions
    return async (dispatch) => {
        try {
            const {data} = await makeRequest({
                endPoint:`company/${id}/user/${workerId}`,
                method: 'PATCH',
                body: JSON.stringify(newData)
            })
            dispatch(getAllCompanies())
            dispatch(setCompany(data))
        }catch(e) {
            console.log(e)
        }
    }   
}


const removeCompanyWorker = (id, workerId) => {
    const {setCompany} = companiesSlice.actions
    return async (dispatch) => {
        try {
            const {data} = await makeRequest({
                endPoint:`company/${id}/user/${workerId}`,
                method: 'DELETE',
            })
            dispatch(getAllCompanies())
            dispatch(setCompany(data))
        }catch(e) {
            console.log(e)
        }
    }   
}

export const companiesOperations = {
    getAllCompanies,
    getCompany,
    editCompany,
    addCompany,
    editCompanyWorker,
    addCompanyWorker,
    removeCompanyWorker
}