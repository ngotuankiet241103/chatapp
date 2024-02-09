import { configureStore} from "@reduxjs/toolkit";

import  userSlice  from "./reducer/userReducer";
export const store = configureStore({
    reducer: {
        user: userSlice
    }
    
  })
