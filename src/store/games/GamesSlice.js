import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
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

export const getGameList = createAsyncThunk(
    'games/getGameList',
    async (uid) => {
        const dbRef = collection(db, 'games')
        const snapshot = await getDocs(dbRef)

        return snapshot.docs.reduce((a, c) => {
            const data = { ...c.data(), id: c.id }
            const user = c.data().users

            a.push(!uid ? data : { ...data, isPlayed: user.includes(uid) })
            return a
        }, [])
    }
)

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
    extraReducers: (builder) => {
        builder.addCase(getGameList.fulfilled, (state, action) => {
            state.games = action.payload
        })
    }
});

export const { gamesData } = gamesSlice.actions;
export default gamesSlice.reducer;




