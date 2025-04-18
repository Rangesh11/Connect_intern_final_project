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
    <div className="min-h-screen bg-gradient-to-r from-orange-50 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-lg shadow-xl overflow-hidden">
        {/* Left side - Form */}
        <div className="w-full md:w-1/2 bg-white p-8">
          <div className="mb-6 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h10" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Connect</h1>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            {logpage ? 'Create your account' : 'Welcome back'}
          </h2>
          
          <form onSubmit={logpage ? handleSignup : handleLogin} className="space-y-4">
            {logpage ? (
              <>
                <InputField 
                  label="College ID" 
                  value={college_id} 
                  setValue={setcollegeid} 
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>}
                />
                <InputField 
                  label="User ID" 
                  value={userId} 
                  setValue={setUserId} 
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>}
                />
                <InputField 
                  label="Username" 
                  value={Username} 
                  setValue={setUsername} 
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>}
                />
                <InputField 
                  label="Password" 
                  value={password} 
                  setValue={setPassword} 
                  type="password" 
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>}
                />
                <InputField 
                  label="Role" 
                  value={role} 
                  setValue={setRole} 
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>}
                />
                <InputField 
                  label="Year of Student" 
                  value={year} 
                  setValue={setyear} 
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>}
                />
              </>
            ) : (
              <>
                <InputField 
                  label="Username" 
                  value={Username} 
                  setValue={setUsername} 
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>}
                />
                <InputField 
                  label="Password" 
                  value={password} 
                  setValue={setPassword} 
                  type="password" 
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>}
                />
              </>
            )}
            
            <button
              type="submit"
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-md transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
            >
              {logpage ? 'Sign Up' : 'Log In'}
            </button>
            
            <div className="text-center mt-4">
              <button 
                type="button"
                onClick={toggleForm} 
                className="text-orange-500 hover:text-orange-600 font-medium"
              >
                {logpage ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
              </button>
            </div>
          </form>
        </div>
        
        {/* Right side - Image and Info */}
        <div className="hidden md:block w-1/2 bg-gradient-to-br from-orange-500 to-red-600 p-8 text-white">
          <div className="h-full flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-6">Join Your College Community</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Connect with students and faculty</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Join groups based on your interests</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Share posts and stay updated</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-auto">
              <img 
                src="C:\Users\Rangesh\Desktop\Connect_intern_final_project\connectfrontend\src\assets\college.jpeg" 
                alt="College Student" 
                className="rounded-lg shadow-lg object-cover h-48 w-full" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable InputField component with icon
interface InputFieldProps {
  label: string;
  value: string;
  setValue: (val: string) => void;
  type?: string;
  icon?: React.ReactNode;
}

const InputField = ({ label, value, setValue, type = 'text', icon }: InputFieldProps) => (
  <div className="relative">
    <label className="text-sm font-medium text-gray-700 mb-1 block">{label}</label>
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      <input
        type={type}
        className={`w-full px-4 py-2 ${icon ? 'pl-10' : ''} border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </div>
  </div>
);
