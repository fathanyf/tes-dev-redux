import Head from 'next/head'
import React from 'react'
import GameBoard from '../../components/game-components/GameBoard'
import LeaderBoard from '../../components/player-components/LeaderBoard'
import PlayerList from '../../components/player-components/PlayerList'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { get_game_board } from '../../store/games/GamesSlice'
import { get_leader_board, get_player } from '../../store/players/PlayerSlice'
import { fetchUserGame, fetchUserGamePoint } from '../../store/users/UserSlice'
import { selectUser } from '../../store/users/UserSlice'

const Account = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const leaderBoard = useSelector((state) => state.player.leaderBoard)
    const playerData = useSelector((state) => state.player.profileData)
    const data = useSelector((state) => state.games.gamesBoard)

    const user = useSelector(selectUser);
    const auth = useSelector((state) => state.user)
    useEffect(() => {
        if (auth.user?.uid) {
            dispatch(fetchUserGamePoint(auth.user?.uid))
            dispatch(fetchUserGame(auth.user?.uid))
            // dispatch(fetchUserById(user.uid))
            // dispatch(fetchUserGame())
        }
    }, [auth.user?.uid, dispatch])
    
    console.log('data', data);
    console.log('player', playerData);
    console.log('leader', leaderBoard);
    console.log('user', user);

    useEffect(() =>{

        dispatch(get_player())
    }, [dispatch])

    useEffect(() => {

        dispatch(get_game_board())     
    }, [dispatch])

    useEffect(() => {

        dispatch(get_leader_board())
    }, [dispatch])
    return (
        <>
            <Head>
                <title>Chapter 10 | Account </title>
            </Head>
            <section className='dark-mode'>
                <div className="container">
                    <div className="row mt-3">
                        <div className="col-md-3">
                            <div className="card card-danger card-outline">
                                <div className="card-body box-profile">
                                    <div className="text-center">
                                        <img className="profile-user-img img-fluid img-circle" src={auth.data.avatar} alt="User profile picture" />
                                    </div>
                                    <h3 className="profile-username text-center">{auth.data.name}</h3>
                                    <ul className="list-group list-group-unbordered mb-3">
                                        <li className="list-group-item">
                                            <b>Address</b> <a className="float-right">{auth.data.address}</a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Phone</b> <a className="float-right">{auth.data.phone}</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card card-widget widget-user-2 shadow-sm">
                                <div className="widget-user bg-danger">
                                    <h5 className="p-2 text-center">Game History</h5>
                                </div>
                                <div className="card-footer p-0">
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">
                                                RPS Points <span className="float-right badge bg-warning">{auth.data.totalpoint}</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card-footer p-0">
                                    <ul className="nav flex-column">

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header p-2 bg-danger">
                                    <h2 className='text-center text-light'>Game Board</h2>
                                </div>
                                <div className="card-body">
                                < GameBoard />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card card-danger">
                                <div className="card-header text-center">
                                    <h3 className="card-title">Player List</h3>
                                </div>
                                < PlayerList />
                            </div>
                            <div className="card card-danger">
                                <div className="card-header">
                                    <h3 className="card-title">Leader Board</h3>
                                </div>
                                < LeaderBoard />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Account