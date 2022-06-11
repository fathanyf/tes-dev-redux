import React from 'react'

const profile = () => {
  return (
    <>
     <section className='dark-mode'>
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-6 offset-3">
                            <div className="card card-danger">
                                <div className="card-header">
                                    <h3 className="card-title">Form Update Profile</h3>
                                </div>
                                <form>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Address</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword1">Phone</label>
                                            <input type="text" className="form-control"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword1">Avatar</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-danger btn-block">Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    </>
  )
}

export default profile