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

export const get_user = (uid) => {
    return (dispatch) => {
        const userDocRef = doc(db, 'users', uid)
        getDoc(userDocRef)
            .then((doc) => {
                const data = doc.data()
                dispatch({
                    type: GET_USER,
                    payload: {
                        data: data,
                        id: doc.id
                    }
                })
            })
            .catch((error) => {
                console.log('failed to connect');
                dispatch({
                    type: GET_USER,
                    payload: null
                })
            })
    }
}

export const get_total_score = (uid) => {
    return (dispatch) => {
        const q = query(collection(db, "gamepoint"), where("playerId", "==", uid || ''))
        getDocs(q)
            .then((snapshot) => {
                const [doc] = snapshot.docs
                const data = doc.data()

                dispatch({
                    type: GET_TOTAL_SCORE,
                    payload: data.totalpoint
                })
            })
            .catch((err) => {
                console.error(err);
            })
    }
}

export const save_and_update_gamestats = ({
    uid,
    point,
    playCount,
    userWin,
    userLoss,
    userDraw,
    name,
    avatar,
    createdAt,
    totalpoint,
    qstring,
    toast,
    router,
}) => {
    return (dispatch) => {
        const gameStatRef = collection(db, 'gamestats')

        const playerCollectionRef = doc(db, 'gamepoint', uid)
        const q = query(collection(db, "games"), where("link", "==", qstring))
        const x = query(collection(db, "users"), where("playerId", "==", uid))

        getDocs(q).then(s => {
            const id = s.docs[0].id
            const data = s.docs[0].data()

            if (!data.users.includes(uid)) {
                data.users.push(uid)
            }

            const result = data.users.filter((u) => u !== '')
            const gamesRps = doc(db, "games", id)

            updateDoc(gamesRps, { users: result })
            getDocs(x).then(u => {
                const data = u.docs[0].data()

                let gamesInUser = null

                if (!data.games || data.games.length === 0) {
                    gamesInUser = [id]
                }

                if (data.games && !data.games.includes(id)) {
                    data.games.push(id)
                }

                updateDoc(doc(db, "users", uid), { games: gamesInUser })
            })
        })
        addDoc(gameStatRef, {
            playerId: uid,
            point,
            playCount,
            userWin,
            userLoss,
            userDraw,
            name,
            avatar,
            createdAt,
            // users: !q.users.includes(uid) ? [...users, uid] : [...users]
        })
            .then(() => {
                updateDoc(playerCollectionRef, {
                    totalpoint,
                    name,
                    avatar,
                    updatedAt: createdAt
                }).then(() => {
                    toast.success("games successfully saved")
                    router.push('/home')

                })
            })

    }
}