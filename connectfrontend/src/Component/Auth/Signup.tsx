import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { userid_context } from '../home_component/Home';

interface UserData {
  user_id: string;
  user_name: string;
  password: string;
  college_id: string;
  role: string;
  year_of_student: string;
}

interface UserLData {
  user_name: string;
  password: string;
}

export default function Signup() {
  const { _setuserid, _userid, _collegeid, _setcollegeid } = useContext(userid_context);
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [Username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [college_id, setcollegeid] = useState('');
  const [role, setRole] = useState('');
  const [year, setyear] = useState('');
  const [logpage, setLogpage] = useState<boolean>(true);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userLData: UserLData = {
      user_name: Username,
      password: password,
    };

    try {
      const response = await fetch('https://connectapi.tharanitharan-n2022cse.workers.dev/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userLData),
      });

      if (response.ok) {
        const check = await response.json();

        // Assuming the response structure for setting the userId and collegeId
        const u = check.username.results[0].user_id;
        const c = check.college_id.results[0].college_id;

        if (check.isCorrectPassword) {
          _setuserid(u);
          _setcollegeid(c);
          localStorage.setItem('_userid', u);
          localStorage.setItem('_collegeid', c);
          localStorage.setItem('_username', Username);
          console.log("Login:", _userid, _collegeid);
          navigate('/home');
        } else {
          alert('Invalid login details');
        }
      } else {
        alert('Failed to log in. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData: UserData = {
      user_id: userId,
      user_name: Username,
      password: password,
      college_id: college_id,
      role: role,
      year_of_student: year,
    };

    try {
      const response = await fetch('https://connectapi.tharanitharan-n2022cse.workers.dev/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const check = await response.json();

        if (check.isCorrectPassword) {
          _setuserid(userId);
          _setcollegeid(college_id);
          localStorage.setItem('_userid', userId);
          localStorage.setItem('_username', Username);
          localStorage.setItem('_collegeid', college_id);
          console.log("Signup:", _userid, _collegeid);
          navigate('/home');
        } else {
          alert('Invalid signup details');
        }
      } else {
        alert('Failed to sign up. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred during signup:', error);
    }
  };

  const toggleForm = () => {
    setLogpage(!logpage);
  };

  return (
    <form
      style={{ backgroundColor: 'rgba(39,39,48,255)' }}
      onSubmit={logpage ? handleSignup : handleLogin}
      className="bg-darkblue flex flex-col h-screen w-screen items-center justify-center"
    >
      <div
        style={{ backgroundColor: 'rgba(24,132,254,255)', boxShadow: 'rgb(24 144 255 / 35%) 0px 2px 7px' }}
        className="bg-blue flex flex-col items-center gap-6 rounded-lg p-4"
      >
        <h1 className="text-white text-3xl ">{logpage ? 'Sign up' : 'Login'}</h1>
        <div className="flex flex-col gap-4 items-center">
          {logpage ? (
            <>
              <div className="flex flex-row gap-3 items-center justify-between w-11/12">
                <label className="text-white">College ID:</label>
                <input
                  className="rounded-full h-10 w-7/12 pl-3"
                  type="text"
                  placeholder="Enter the college_id"
                  value={college_id}
                  onChange={(e) => setcollegeid(e.target.value)}
                />
              </div>
              <div className="flex flex-row gap-10 items-center justify-between w-11/12">
                <label className="text-white">User ID:</label>
                <input
                  className="rounded-full h-10 w-7/12 pl-3"
                  type="text"
                  placeholder="Enter the Userid"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>
              <div className="flex flex-row gap-3 items-center justify-between w-11/12">
                <label className="text-white">User Name:</label>
                <input
                  className="rounded-full h-10 w-7/12 pl-3"
                  type="text"
                  placeholder="Enter the Username"
                  value={Username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-row gap-3 items-center justify-between w-11/12">
                <label className="text-white">Password:</label>
                <input
                  className="rounded-full h-10 w-7/12 pl-3"
                  type="password"
                  placeholder="Enter the password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-row gap-3 items-center justify-between w-11/12">
                <label className="text-white">Role:</label>
                <input
                  className="rounded-full h-10 w-7/12 pl-3"
                  type="text"
                  placeholder="Enter the Role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
              <div className="flex flex-row gap-3 items-center justify-between w-11/12">
                <label className="text-white">Year of student:</label>
                <input
                  className="rounded-full h-10 w-7/12 pl-3"
                  type="text"
                  placeholder="Enter the Year"
                  value={year}
                  onChange={(e) => setyear(e.target.value)}
                />
              </div>
              <button
                style={{ color: 'white', cursor: 'pointer', backgroundColor: 'black' }}
                type="submit"
                className="bg-darkblue h-10 w-32 rounded-full"
              >
                {logpage ? 'Sign Up' : 'Login'}
              </button>
              <div>
                <p onClick={toggleForm} style={{ color: 'blue', cursor: 'pointer' }}>
                  {logpage ? 'Already have an account? Login' : 'Don\'t have an account? Sign Up'}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-row gap-3 items-center justify-center w-11/12">
                <label className="text-white">User Name:</label>
                <input
                  className="rounded-full h-10 w-7/12 pl-3"
                  type="text"
                  placeholder="Enter the Username"
                  value={Username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-row gap-3 items-center justify-center w-11/12">
                <label className="text-white">Password:</label>
                <input
                  className="rounded-full h-10 w-7/12 pl-3"
                  type="password"
                  placeholder="Enter the password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                style={{ color: 'white', cursor: 'pointer', backgroundColor: 'black' }}
                type="submit"
                className="h-10 w-32 rounded-full"
              >
                Login
              </button>
              <div>
                <p onClick={toggleForm} style={{ color: 'blue', cursor: 'pointer' }}>
                  {logpage ? 'Already have an account? Login' : 'Don\'t have an account? Sign Up'}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
