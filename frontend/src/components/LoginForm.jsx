import { useEffect, useState } from 'react';
import { GraduationCap, Bell, Settings } from 'lucide-react';
import ColorButtonFull from './ColorButtonFull';


const LogingForm =  () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    if (!storedUsers) {
        const defaultUsers = [
        { username: 'admin', password: '12345', userType: 'admin' },
        { username: 'student1', password: 'abcde', userType: 'student' }
        ];
        localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
    }, []);

    const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find(
        (user) => user.username === username && user.password === password
    );

    if (foundUser) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(foundUser));
        window.location.href = '#/dashboard';
    } else {
        setMessage('❌ Invalid username or password');
    }
    };

    const handleSignUpClick = () => {
    window.location.href = '/register';
    };

    return (
    <section className="bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center px-6 py-12 h-[700px]">
        <div className="bg-white border border-neutral-200 rounded-lg p-8 shadow-sm">
            <div className="text-center mb-8">
                <GraduationCap className="mx-auto w-10 h-10" />
                <h2 className="text-2xl text-neutral-900 mb-2">Welcome Back</h2>
                <p className="text-neutral-600">
                Sign in to your Bow Course Registration account
                </p>
            </div>

            <form className="space-y-6" onSubmit={handleLogin}>

                <div>
                    <label>Username or Email</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                        placeholder="Enter your username or email"
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                        placeholder="Enter your password"
                    />
                </div>

                <div className="flex justify-between">
                    <div>
                        <input type="checkbox" />
                        <label className="ml-1">Remember me</label>
                    </div>
                    <span className="text-neutral-600 hover:underline cursor-pointer">
                        Forgot Password?
                    </span>
                </div>

                <ColorButtonFull type='submit' label={"Sign in"}/>
            </form>

            {message && (
                <p className="mt-4 text-center text-sm text-neutral-700">{message}</p>
            )}

            <div className="mt-6 text-center">
                <p className="text-sm text-neutral-600">
                Don't have an account?{' '}
                <span 
                className="text-neutral-900 hover:underline cursor-pointer"
                onClick={handleSignUpClick}
                >
                    Sign up here
                </span>
                </p>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-200">
                <div className="text-center">
                    <p>Need Help?</p>
                    <div className="flex justify-center space-x-4 text-xs">
                        <span className="text-neutral-600 hover:text-neutral-900 cursor-pointer">
                        Contact Support
                        </span>
                        <span className="text-neutral-300">|</span>
                        <span className="text-neutral-600 hover:text-neutral-900 cursor-pointer">
                        Technical Issues
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );

};

export default LogingForm;