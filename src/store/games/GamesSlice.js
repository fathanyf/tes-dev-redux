import { createSlice } from '@reduxjs/toolkit'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../config/firebase'


export const get_games = () => {
    return (dispatch) => {
        const dbRef = collection(db, 'games')
        getDocs(dbRef)
            .then((snapshot) => {
                let result = []
                snapshot.docs.forEach((doc) => {
                    result.push({ ...doc.data(), id: doc.id })
                })
                console.log(result);
                dispatch(gamesData(result))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

const initialState = {
    games: [],
    isLoadingGames: true,
}

export const gamesSlice = createSlice({
    name: "games",
    initialState,
    reducers: {
        gamesData(state, action) {
            state.games = action.payload
            state.isLoadingGames = false
        },
    },
});

export const { gamesData } = gamesSlice.actions;
export default gamesSlice.reducer;




