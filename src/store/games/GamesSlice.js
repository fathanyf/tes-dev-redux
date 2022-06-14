import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDocs, collection, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from "../../config/firebase";
import { addDoc, doc, query, updateDoc, where } from "firebase/firestore";


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

export const quitAndSave = createAsyncThunk(
    'games/quitAndSave',
    async (data, thunkAPI) => {
        const updateGameStats = collection(db, 'gamestats')
        const updateGamePoint = doc(db, 'gamepoint', data.playerId)
        const getGamePoint = query(collection(db, "gamepoint"), where("playerId", "==", data.playerId || ''))

        let totalpoint = null

        const newGameStat = {
            playerId: data.playerId,
            point: data.point,
            playCount: data.playCount,
            userWin: data.userWin,
            userLoss: data.userLoss,
            userDraw: data.userDraw,
            name: data.name,
            avatar: data.avatar,
            createdAt: serverTimestamp(),
        }

        try {
            const snapshot = await getDocs(getGamePoint)
            const [doc] = snapshot.docs

            totalpoint = doc.data().totalpoint
        } catch (e) {
            throw new Error(e)
        }

        try {
            await getDocs(updateGameStats).then(() => addDoc(updateGameStats, newGameStat))
            await updateDoc(updateGamePoint, {
                name: data.name,
                avatar: data.avatar,
                totalpoint: data.point + +totalpoint
            })
        } catch (error) {
            console.log(error)
        }

        try {
            const getGamesByQuery = query(collection(db, "games"), where("link", "==", data.qstring))
            const getUser = query(collection(db, "users"), where("playerId", "==", data.playerId))

            const snapshot = await getDocs(getGamesByQuery)
            const user = await getDocs(getUser)

            const [docs] = snapshot.docs
            const gameData = docs.data()

            const uid = data.playerId
            const gid = docs.id

            if (!gameData.users.includes(uid)) {
                gameData.users.push(uid)
            }

            const result = gameData.users.filter((u) => u !== '')
            const getGameById = doc(db, "games", gid)

            updateDoc(getGameById, { users: result })

            const [userDoc] = user.docs
            const userData = userDoc.data()
            let gamesInUser = null

            if (!userData.games || userData.games.length === 0) {
                gamesInUser = [gid]
            }

            if (userData.games && !userData.games.includes(gid)) {
                userData.games.push(gid)
            }

            updateDoc(doc(db, "users", uid), { games: gamesInUser })
        } catch (error) {
            console.log(error)
        }

        data.router.push('/games')
    }
)

const initialState = {
    games: [],
    addGames: [],
    addDummyGames: [],
    addGameData: []
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
        builder.addCase(quitAndSave.fulfilled, () => { })
        builder.addCase(getGameList.fulfilled, (state, action) => {
            state.games = action.payload
        })
    }
});

export const { gamesData } = gamesSlice.actions;
export default gamesSlice.reducer;




