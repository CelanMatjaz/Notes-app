export const types = {
    LOGIN: 0,
    LOGOUT: 1,
    CHECK_FOR_TOKEN: 2
}



export const reducer = (state, { type, payload }) => {
    switch(type){
        case types.LOGIN:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                isEmpty: false,
                authToken: payload.token
            }
        case types.LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                isEmpty: true,
                authToken: null
            }
        case types.CHECK_FOR_TOKEN:
            const token = localStorage.getItem('token');
            if(token) return {
                ...state,
                isEmpty: false,
                authToken: token
            }
            return state;
        default: return state;
    }
}