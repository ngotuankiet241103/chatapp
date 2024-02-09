import axios from "axios";
export default function requestApi(endpoint,method,body,responseType = 'json',isRedirect = false){
    const headers = {
        "Accept": "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*"
    };
    const instance = axios.create({headers})
    // check endpoint api 
    if(endpoint !== '/login' && endpoint !== '/register' && !endpoint.includes("/register/confirm") ){
        // add token when call request api
        instance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem("accessToken")
                console.log("token" + token);
                if(token) {
                    config.headers['Authorization'] = `Bearer ${token}`
                }
                return config;
            },
            (error) => {
                return Promise.reject(error)
            }
        )
        // handle response when token expired
        instance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalConfig = error.config
                console.log(error);
                console.log(error.response.status === 401);
                if( error.response.status === 401){
                    
                    try {
                        const refeshToken = getCookieValue("refreshToken");
                        const data = {
                            refresh_token: refeshToken
                        }
                        if(refeshToken && isRedirect){
                            window.location.href = 'https://localhost:3000/login';
                        }
                        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/refresh-token`,data)
                        if(response.status === 200){

                            setToken(response.data);
                        }
                        return instance(originalConfig)
                    } catch (error) {
                        
                        if(error && error.response.status === 401){
                            deleteToken()
                            // if(isRedirect){
                            //     window.location.href = 'http://localhost:3000/login';
                            // }
                        }
                       

                        return Promise.reject(error);
                    }
                }
                return Promise.reject(error);
            }
        )
    }
   
    return instance.request(
        {
            method,
            url: `${process.env.REACT_APP_API_BASE_URL}${endpoint}`,
            data: body,
            responseType
        }
    )
}
export function deleteToken(){
    localStorage.removeItem("accessToken")
    deleteCookie("refreshToken")
}
function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
export function setToken(response) {
    deleteCookie('refeshToken')
	console.log(response);
	localStorage.setItem("accessToken", response.access_token);
	document.cookie = `refreshToken=${response.refresh_token}; max-age=2678400;`;
}
export function getCookieValue(key) {
	// Tách chuỗi cookie thành mảng các cặp key-value
	const cookies = document.cookie.split(";");
	console.log(cookies);
	// Duyệt qua mảng cookies
	for (let i = 0; i < cookies.length; i++) {
		// Tách từng cặp key-value
		const cookie = cookies[i].split("=");

		// Lấy key và value
		const cookieKey = cookie[0].trim();
		const cookieValue = cookie[1];

		// Kiểm tra xem key có trùng với key mong muốn không
		if (cookieKey === key) {
			// Trả về giá trị tương ứng với key
			return cookieValue;
		}
	}

	// Trả về undefined nếu không tìm thấy key
	return undefined;
}
export const getApi = async (url) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}${url}`)
        console.log(response);
        if(response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }

}