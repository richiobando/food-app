import React from 'react'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'
import s from './LandingPage.module.css'


// export default function LandingPage() { 
// return <div className={s.bgCover}><Loading/></div>
// }
export default function LandingPage() {
  return (
     <div className={s.bgCover}>
      <div className={s.bg}></div>
      <div className={s.container}>
        <div className={s.content}>
          <Link  to='/home'>
            {' '}
            <h1 className={s.textReveal}>Find your Recipe</h1>
            <svg
              viewBox='0 0 24 122'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M10.9393 121.061C11.5251 121.646 12.4749 121.646 13.0607 121.061L22.6066 111.515C23.1924 110.929 23.1924 109.979 22.6066 109.393C22.0208 108.808 21.0711 108.808 20.4853 109.393L12 117.879L3.51471 109.393C2.92893 108.808 1.97918 108.808 1.39339 109.393C0.807607 109.979 0.807607 110.929 1.39339 111.515L10.9393 121.061ZM10.5 -6.55671e-08L10.5 120L13.5 120L13.5 6.55671e-08L10.5 -6.55671e-08Z'
                fill='white'
              />
            </svg>
          </Link>
        </div>
      </div>
    </div> 
  )
}
