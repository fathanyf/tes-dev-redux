import { createSlice } from '@reduxjs/toolkit'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';


export const get_profile_data = (id) => {
    return async (dispatch) => {
      const fetchData = async () => {
        const docRef = doc(db, 'users', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          dispatch(profileData(docSnap.data()));
        }
      };
  
      fetchData();
    };
  };

export const get_total_point = (id) => {
    return async (dispatch) => {
      const fetchData = async () => {
        const docRef = doc(db, 'gamepoint', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          dispatch(getPoint(docSnap.data()));
        }
      };
  
      fetchData();
    };
  };

const initialState = {
    profile:'',
    isLoadingProfile:true,
    point:'',
    isLoadingPoint:true
}

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        profileData(state,action){
            state.profile = action.payload
            state.isLoadingProfile = false
        },
        getPoint(state,action){
            state.point = action.payload
            state.isLoadingPoint = false
        }
    },
});

export const { profileData ,getPoint} = profileSlice.actions;
export default profileSlice.reducer;
