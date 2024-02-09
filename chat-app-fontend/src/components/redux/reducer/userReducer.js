import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  info: {},
  isLogin: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, actions) => {
      console.log(state);
      console.log(actions);
      state.info = actions.payload.userInfo
       state.isLogin = true
       return state;
      
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions

export default userSlice.reducer