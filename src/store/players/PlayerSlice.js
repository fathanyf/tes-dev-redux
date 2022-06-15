import { getDocs, collection, getDoc, serverTimestamp, limit } from 'firebase/firestore'
import { db } from "../../config/firebase";
import { addDoc, doc, query, updateDoc, where, orderBy } from "firebase/firestore";
import { createSlice } from '@reduxjs/toolkit';


export const get_leader_board = (id) => {
    return(dispatch) => {
        const q = query(collection(db, 'gamestats'), orderBy("point", "desc"), limit(3))
        getDocs(q)
            .then((Snapshot) => {
                console.log("2a. berhasil dapat data :", Snapshot.docs);
                let gamestats = []
                Snapshot.docs.forEach((doc) =>{
                    gamestats.push({ ...doc.data(), id: doc.id })
                })
                console.log(gamestats);
                dispatch(leaderBoard(gamestats))
            })
            .catch((error) =>{
                console.log(error);
            })
    }
}

export const get_player = () => {
    return(dispatch) => {
        const dbRef = query(collection(db, 'users'), limit(3))
        getDocs(dbRef)
            .then((snapshot) => {
                console.log("2b. berhasil dapat data :", snapshot.docs);
                let users = []
                snapshot.docs.forEach((doc) => {
                    users.push({ ...doc.data(), id: doc.id})
                })
                console.log(users);
                dispatch(playerData(users))
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

export const playerSlice = createSlice({
    name: 'player',
    initialState: {
        leaderBoard: [],
        playerData:[],
        loadingleaderBoard:true,
        loadingPlayerData:true,
    },
    reducers: {
        leaderBoard(state, action) {
            state.leaderBoard = action.payload
            state.loadingleaderBoard = false
        },
        playerData(state,action){
            state.playerData = action.payload
            state.loadingPlayerData = false
        },
    },
})

export const { leaderBoard, playerData } = playerSlice.actions
export default playerSlice.reducer
