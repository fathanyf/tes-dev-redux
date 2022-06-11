import { GET_GAMES, GET_USER, GET_TOTAL_SCORE } from '../../actions/GamesAction'

const initialState = {
    getGamesResult: false,
    getGamesLoading: false,
    getGamesError: false,
}

const gamesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_GAMES:
            return {
                ...state,
                getGamesResult: action.payload.data,
                getGamesLoading: action.payload.loading,
                getGamesError: action.payload.errorMessage
            }
        case GET_USER:
            return {
                ...state,
                getUser: action.payload
            }
        case GET_TOTAL_SCORE:
            return {
                ...state,
                getTotalScore: action.payload
            }
        default:
            return state
    }
}

export default gamesReducer