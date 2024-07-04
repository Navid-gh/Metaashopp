import React from 'react'
import {Link} from 'react-router-dom';
import './EasyMenu.css';
function EasyMenu() {
  return (
    <div className='easy-menu-container'>
      <div className='easy-menu-link-containers'>
        <Link to='/products/digitwatch' className='easy-menu-link'>
            <figure className='easy-menu-img-container'>
                <img src='/images/watch.png' className='easy-menu-img' alt='ساعت هوشمند' 
                loading='lazy' />
            </figure>
            <div className='easy-menu-caption'>
                <h3>ساعت هوشمند</h3>
            </div>
        </Link>
        <Link to='/products/handsfree' className='easy-menu-link'>
            <figure className='easy-menu-img-container'>
                <img src='/images/handsfree.png' className='easy-menu-img' alt='هندزفری' 
                loading='lazy' />
            </figure>
            <div className='easy-menu-caption'>
                <h3> هندزفری</h3>
            </div>
        </Link>
      </div>
      <div className='easy-menu-link-containers'>
        <Link to='/products/speaker' className='easy-menu-link'>
            <figure className='easy-menu-img-container'>
                <img src='/images/band.png' className='easy-menu-img' alt='اسپیکر' 
                loading='lazy' />
            </figure>
            <div className='easy-menu-caption'>
                <h3> اسپیکر</h3>
            </div>
        </Link>
        <Link to='/products/console' className='easy-menu-link'>
            <figure className='easy-menu-img-container'>
                <img src='/images/game.png' className='easy-menu-img' alt='کنسول بازی' 
                loading='lazy' />
            </figure>
            <div className='easy-menu-caption'>
                <h3> کنسول بازی</h3>
            </div>
        </Link>
      </div>
      <div className='easy-menu-link-containers'>
        <Link to='/products/life-style' className='easy-menu-link'>
            <figure className='easy-menu-img-container'>
                <img src='/images/lifestyle.png' className='easy-menu-img' alt='سبک زندگی' 
                loading='lazy' />
            </figure>
            <div className='easy-menu-caption'>
                <h3> سبک زندگی</h3>
            </div>
        </Link>
        <Link to='/products/cover' className='easy-menu-link'>
            <figure className='easy-menu-img-container'>
                <img src='/images/cover.png' className='easy-menu-img' alt='قاب موبایل' 
                loading='lazy' />
            </figure>
            <div className='easy-menu-caption'>
                <h3> قاب موبایل</h3>
            </div>
        </Link>
       </div>
       <div className='easy-menu-link-containers'>
        <Link to='/products/security-camera' className='easy-menu-link'>
            <figure className='easy-menu-img-container'>
                <img src='/images/camera.png' className='easy-menu-img' alt='دوربین امنیتی' 
                loading='lazy' />
            </figure>
            <div className='easy-menu-caption'>
                <h3> دوربین امنیتی</h3>
            </div>
        </Link>
        <Link to='/products' className='easy-menu-link'>
            <figure className='easy-menu-img-container'>
                <img src='/images/AllProducts.png' className='easy-menu-img' alt='همه محصولات' 
                loading='lazy' />
            </figure>
            <div className='easy-menu-caption'>
                <h3>محصولات</h3>
            </div>
        </Link>
      </div>

    </div>
  )
}

export default React.memo(EasyMenu);