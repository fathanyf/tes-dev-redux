import Head from 'next/head'
import Link from 'next/link'


export default function Home() {
  return (
    <>
      <Head>
        <title>Chapter 10</title>
      </Head>
      <div>
        <header className="showcase">
          <div className="showcase-top">
            <img src="/logochapter10.png" style={{ width: '325px' }} />
            <Link href='/auth/signin'><a className='btn btn-rounded'>Sign In</a></Link>
          </div>
          <div className="showcase-content">
            <h1>Next level Gaming</h1>
            <p>Free Trial all games for 30 days</p>
            <Link href='/auth/signup'><a className="btn btn-xl">Sign up for free <i className="fas fa-chevron-right btn-icon" /></a></Link>
          </div>
        </header>
      </div>
      <section className="feature-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 p-0">
              <div className="feature-item set-bg" data-setbg="/3.jpg" style={{ backgroundImage: 'url("/3.jpg")' }}>
                <span className="cata new">strategy</span>
                <div className="fi-content text-white">
                  <h5><a href="#">Justo tempor, rutrum erat id, molestie</a></h5>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                  <a href="#" className="fi-comment">3 Comments</a>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 p-0">
              <div className="feature-item set-bg" data-setbg="/3.jpg" style={{ backgroundImage: 'url("/3.jpg")' }}>
                <span className="cata new">strategy</span>
                <div className="fi-content text-white">
                  <h5><a href="#">Justo tempor, rutrum erat id, molestie</a></h5>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                  <a href="#" className="fi-comment">3 Comments</a>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 p-0">
              <div className="feature-item set-bg" data-setbg="/3.jpg" style={{ backgroundImage: 'url("/3.jpg")' }}>
                <span className="cata new">strategy</span>
                <div className="fi-content text-white">
                  <h5><a href="#">Justo tempor, rutrum erat id, molestie</a></h5>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                  <a href="#" className="fi-comment">3 Comments</a>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 p-0">
              <div className="feature-item set-bg" data-setbg="/3.jpg" style={{ backgroundImage: 'url("/3.jpg")' }}>
                <span className="cata new">strategy</span>
                <div className="fi-content text-white">
                  <h5><a href="#">Justo tempor, rutrum erat id, molestie</a></h5>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                  <a href="#" className="fi-comment">3 Comments</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
