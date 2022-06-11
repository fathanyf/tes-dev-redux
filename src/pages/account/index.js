import Head from 'next/head'
import React from 'react'

const Account = () => {
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
                                    <h3 className="profile-username text-center">joko</h3>

                                    <ul className="list-group list-group-unbordered mb-3">
                                        <li className="list-group-item">
                                            <b>Address</b> <a className="float-right">jl kenangan</a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Phone</b> <a className="float-right">0899</a>
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

                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card card-danger">
                                <div className="card-header text-center">
                                    <h3 className="card-title">Player List</h3>
                                </div>

                            </div>
                            <div className="card card-danger">
                                <div className="card-header">
                                    <h3 className="card-title">Leader Board</h3>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Account