import axios from "axios"

export function updata(layload){
    return function(dispatch){
        return axios.get("/getrankList").then(result=>{
            return dispatch({
                type:"UPDATA",
                layload:result.data.data
            })
        })
    }
}