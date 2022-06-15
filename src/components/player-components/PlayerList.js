import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { get_player } from "../../store/players/playerSlice"
import { selectUser } from "../../store/users/UserSlice"
import Link from "next/link"

const PlayerList = () => {

    const user = useSelector(selectUser)

    const playerData= useSelector((state) => state.player.playerData)
    const dispatch = useDispatch(playerData)

    console.log("user", user);

    useEffect(() => {
        dispatch(get_player())
    }, [dispatch])

    return (
                            <div className="card card-danger">

                                {
                                    playerData.map((e, index) => {
                                        return (
                                            <div className="card-body" key={index}>
                                                <div className="user-panel  d-flex">
                                                    <div className="image">
                                                        {
                                                            !e.avatar ? (
                                                                <avatar src="/blank-avatar.svg" className="img-circle elevation-2" alt="User Image" />
                                                            ) : (
                                                                <img src={e.avatar} className="img-circle elevation-2" alt="User Image" />
                                                            )
                                                        }
                                                    </div>
                                                    <div className="info">
                                                        <Link href={{ pathname: '/account', query: { id: e.id } }}>
                                                            <a className="d-block">{e.name}</a>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
    )

}

export default PlayerList