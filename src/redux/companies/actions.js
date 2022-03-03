import {EDIT_COMPANY_RECORD, GET_COMPANIES, GET_COMPANY_DATA, GET_MESSAGE, GET_RESPONSE, SET_IS_LOADER} from "./types";
import {sendRequest} from "../../api/api";

const getCompaniesData = (payload)=>({type:GET_COMPANIES, payload});
const editCompanyData = (id, payload)=> ({type:EDIT_COMPANY_RECORD, id, payload});
const setIsLoader = (payload)=> ({type:SET_IS_LOADER, payload});
export const getMessage = (payload)=>({type:GET_MESSAGE, payload});
export const getCompanyData = (payload) => ({type:GET_COMPANY_DATA, payload})
export const getResponse = (payload)=> ({type:GET_RESPONSE, payload})

export const getCompanies = ()=>{
    return async (dispatch)=>{
       try{
           dispatch(setIsLoader(true))
           const response = await sendRequest('https://test-company-users.herokuapp.com/company', 'GET')
           dispatch(getCompaniesData(response))
           dispatch(setIsLoader(false))
       }catch (e) {
           console.log(e)
       }
    }
}
export const editCompany = (id, data)=>{
    return async (dispatch)=>{
        try{
            dispatch(setIsLoader(true))
            const response = await sendRequest(`https://test-company-users.herokuapp.com/company/${id}`, 'PATCH', JSON.stringify(data));
            if(response?.id){
                dispatch(getResponse(response))
            }
            if(response?.error){
                dispatch(getMessage(response.message))
            }            dispatch(setIsLoader(false))

        }catch (e) {
            console.log(e)
        }
    }
}
export const createCompany = (data)=>{
    return async (dispatch)=>{
      try{

          dispatch(setIsLoader(true))
          const response = await sendRequest('https://test-company-users.herokuapp.com/company', 'POST', JSON.stringify(data));
          if(response?.id){
              dispatch(getResponse(response))
          }
          if(response?.error){
              dispatch(getMessage(response.message))
          }

          dispatch(setIsLoader(false))

      }  catch (e) {
        console.log(e)
      }
    }

}

export const getCompany = (id)=>{
    return async (dispatch) => {
        try {
            {
                dispatch(setIsLoader(true));
                const response = await sendRequest(`https://test-company-users.herokuapp.com/company/${id}`, 'GET');
                dispatch(getCompanyData(response));
                dispatch(setIsLoader(false))

            }
        }catch (e) {
            console.log(e)
        }
    }

}

