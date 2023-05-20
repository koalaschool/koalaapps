import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Checkbox from 'components/checkbox';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginData = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post('http://203.194.112.59:28001/v1/login', loginData);
      localStorage.setItem('token', response.data.access_token);
      console.log(response.data.status);
      navigate('/admin');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h5 className="mb-3 font-bold text-navy-300 dark:text-white">Welcome, Koala School Assistant</h5>
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username" className="text-sm text-navy-700 dark:text-white">
            Username*
          </label>
          <div>
            <input
              className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
              placeholder="Username"
              id="username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              autoComplete="current-username"
            />
          </div>
          <div className="mb-4 mt-2">
            <label htmlFor="password" className="text-sm text-navy-700 dark:text-white">
              Password*
            </label>
            <input
              className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
              placeholder="Password"
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              autoComplete="current-password" // Add the autocomplete attribute
            />

          </div>
          <div className="mb-4 flex items-center justify-between px-2">
            <div className="flex items-center">
              <Checkbox />
              <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                Keep me logged In
              </p>
            </div>
            <a
              className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
              href=" "
            >
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
