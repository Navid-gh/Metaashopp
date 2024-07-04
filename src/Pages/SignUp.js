import React from 'react';
import '../App.css';
import SignUpForm from '../Components/SignUp/SignUpForm';
import SEO from '../helpers/seo';
function SignUp() {
  return (
    <>
    <SEO
            titleTemplate="ورود"
            description=" ورود و ثبت نام متا شاپ"
    />
    <div className='sign-up'>
               
       <SignUpForm />
    </div>
    </>
  )
}

export default React.memo(SignUp);