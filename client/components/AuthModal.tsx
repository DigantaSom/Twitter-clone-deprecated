import { FC, useState } from 'react';
import Link from 'next/link';

import { IoArrowBack, IoCloseSharp } from 'react-icons/io5';
import { BsTwitter } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';

import { AuthModalType } from '../types';

import { useAppDispatch } from '../utils/hooks';
import { toggleAuthModal } from '../redux/UI/ui.slice';

import SignUpForm from './SignUpForm';
import InputErrorMessage from './InputErrorMessage';

interface AuthModalProps {
  modalType: AuthModalType;
}

const AuthModal: FC<AuthModalProps> = ({ modalType }) => {
  const [twitterHandle, setTwitterHandle] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const handleClickNext = () => {
    if (twitterHandle !== '') {
      dispatch(toggleAuthModal('login-form'));
    }
  };

  const handleClickLogin = () => {
    if (twitterHandle !== '' && password !== '') {
      // TODO: login
      dispatch(toggleAuthModal(''));
    }
  };

  return (
    <div
      className='w-screen h-screen ph:w-[90vw] ph:h-full sm:w-[600px] bg-white p-4 pb-8 
      ph:rounded-2xl'
    >
      {modalType === 'signup-form' && <SignUpForm />}

      {(modalType === 'signup' ||
        modalType === 'login' ||
        modalType === 'login-form') && (
        <div>
          {/* Header */}
          <div className='flex items-center'>
            {/* 0.75rem is deducted from here as the superparent div of this comopenent has 'p-3' class */}
            <div className='w-[calc(50%-0.75rem)]'>
              <div className='w-8 h-8 p-1 -ml-1 flex items-center justify-center rounded-full hover:bg-gray-200 hover:cursor-pointer'>
                {modalType === 'login-form' ? (
                  <IoArrowBack
                    className='text-2xl text-gray-700'
                    onClick={() => dispatch(toggleAuthModal('login'))}
                  />
                ) : (
                  <IoCloseSharp
                    className='text-2xl text-gray-700'
                    onClick={() => dispatch(toggleAuthModal(''))}
                  />
                )}
              </div>
            </div>
            <div className='w-[50%]'>
              <BsTwitter className='text-3xl text-twitter' />
            </div>
          </div>

          {/* Body */}
          <div className='mt-8 mx-auto w-[90%] ph:w-[75%]'>
            <h1 className='text-3xl font-bold'>
              {modalType === 'signup' && 'Join Twitter today'}
              {modalType === 'login' && 'Sign in to Twitter'}
              {modalType === 'login-form' && 'Enter your password'}
            </h1>

            {/* SignUp or Login(handle) modal only */}
            {(modalType === 'signup' || modalType === 'login') && (
              <div className='mt-8'>
                <div
                  onClick={() => {}}
                  className='hover:bg-gray-200 border-[1px] border-gray-300 flex items-center justify-center p-2 space-x-2 hover:cursor-pointer rounded-full'
                >
                  <FcGoogle className='text-2xl' />
                  <p className='font-semibold'>
                    {modalType === 'signup' && 'Sign up with Google'}
                    {modalType === 'login' && 'Sign in with Google'}
                  </p>
                </div>

                <div className='my-4 flex items-center space-x-2'>
                  <hr className='w-full' />
                  <span className='text-[15px]'>or</span>
                  <hr className='w-full' />
                </div>

                {modalType === 'signup' && (
                  <>
                    <button
                      onClick={() => dispatch(toggleAuthModal('signup-form'))}
                      className='mb-6 bg-black text-white font-semibold w-full p-2 rounded-full hover:opacity-80'
                    >
                      Sign up with phone or email
                    </button>

                    <p className='text-[13px] text-gray-500'>
                      By signing up, you agree to the{' '}
                      <Link href='#' className='text-twitter'>
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href='#' className='text-twitter'>
                        Privacy Policy
                      </Link>
                      , including{' '}
                      <Link href='#' className='text-twitter'>
                        Cookie Use.
                      </Link>
                    </p>
                  </>
                )}

                {modalType === 'login' && (
                  <>
                    <input
                      type='text'
                      placeholder='Username or Twitter Handle'
                      value={twitterHandle}
                      onChange={e => setTwitterHandle(e.target.value)}
                      className='border-[1px] border-gray-200 w-full p-4 rounded-md 
                    focus:outline-twitter'
                    />
                    {twitterHandle === '' && (
                      <InputErrorMessage message='Username must not be empty' />
                    )}
                    <button
                      onClick={handleClickNext}
                      disabled={twitterHandle === ''}
                      className={`my-6 bg-black text-white font-semibold w-full p-2 rounded-full hover:opacity-80 ${
                        twitterHandle === '' &&
                        'opacity-50 hover:opacity-50 hover:cursor-not-allowed'
                      }`}
                    >
                      Next
                    </button>
                    <button
                      onClick={() => {}}
                      className='hover:bg-gray-200 border-[1px] border-x-gray-300 w-full p-2 
                      rounded-full'
                    >
                      Forgot password?
                    </button>
                  </>
                )}

                {modalType === 'signup' && (
                  <p className='mt-10 text-gray-500 text-[15px]'>
                    Have an account already?{' '}
                    <span
                      onClick={() => dispatch(toggleAuthModal('login'))}
                      className='text-twitter hover:underline hover:cursor-pointer'
                    >
                      Log in
                    </span>
                  </p>
                )}
                {modalType === 'login' && (
                  <p className='mt-10 text-gray-500 text-[15px]'>
                    Don't have an account?{' '}
                    <span
                      onClick={() => dispatch(toggleAuthModal('signup'))}
                      className='text-twitter hover:underline hover:cursor-pointer'
                    >
                      Sign up
                    </span>
                  </p>
                )}
              </div>
            )}

            {/* Login modal(password) */}
            {modalType === 'login-form' && (
              <div className='mt-8'>
                <div>
                  <input
                    type='text'
                    value={twitterHandle}
                    className='bg-gray-100 border-[1px] border-gray-200 w-full p-4 mb-2 rounded-md focus:outline-none hover:cursor-not-allowed'
                    disabled
                  />
                  <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className='border-[1px] border-gray-200 w-full p-4 rounded-md 
                    focus:outline-twitter mt-2 mb-1'
                    required
                  />
                  {password === '' && (
                    <InputErrorMessage message='Password is required' />
                  )}
                </div>

                <div className='mt-8'>
                  <button
                    onClick={handleClickLogin}
                    className={`bg-black text-white font-semibold w-full p-2 rounded-full hover:opacity-80 mb-3 ${
                      password === '' &&
                      'opacity-60 hover:opacity-60 hover:cursor-not-allowed'
                    }`}
                  >
                    Login
                  </button>
                  <p className='text-gray-500 text-[15px]'>
                    Don't have an account?{' '}
                    <span
                      onClick={() => dispatch(toggleAuthModal('signup'))}
                      className='text-twitter hover:underline hover:cursor-pointer'
                    >
                      Sign up
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthModal;
