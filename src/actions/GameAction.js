export const GET_GAME = 'GET_GAME'
export const GET_BOARD_GAME = 'GET_BOARD_GAME'

import { db } from '../config/firebase'
import { UserAuth } from '../context/AuthContext'
import { addDoc, doc, query, updateDoc, where } from "firebase/firestore";
import { getDocs, collection, getDoc } from 'firebase/firestore'

export const get_games = () => {
    return (dispatch) => {
        dispatch({
            type: GET_GAMES,
            payload: {
                loading: true,
                data: false,
                errorMessage: false,
            }
        })

        const dbRef = collection(db, 'games')
        getDocs(dbRef)
            .then((snapshot) => {
                let games = []
                snapshot.docs.forEach((doc) => {
                    games.push({ ...doc.data(), id: doc.id })
                })
                dispatch({
                    type: GET_GAMES,
                    payload: {
                        loading: false,
                        data: games,
                        errorMessage: false,
                    }
                })
            })
            .catch((error) => {
                console.log('failed to connect');
                dispatch({
                    type: GET_GAMES,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: error.message,
                    }
                })
            })


    }
}