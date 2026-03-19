import { useState } from 'react';
import PropTypes from 'prop-types';
import { ShieldCheck, UserRound } from 'lucide-react';
import { login } from '../../services/authAPI.js';
import './LoginForm.css';

const LoginForm = ({ onLogin }) => {
    const [role, setRole] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!role) { setError('Please select a role'); return; }
        if (!username || !password) { setError('Please fill in all fields'); return; }
        try {
            const user = await login(username, password);
            if (user.role !== role) {
                setError(`Invalid credentials for ${role} role`);
                return;
            }
            onLogin(user);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-page">
            <div className="bubble" />
            <div className="login-card">

                {/* Left green branding panel */}
                <div className="login-left">
                    <div className="login-left-content">
                        <div className="login-brand">
                            <div className="brand-dot">E</div>
                            <h1>Expiro</h1>
                        </div>
                        <h2>Welcome</h2>
                        <p>Select your role to get started.</p>

                        <div className="role-selector">
                            <div
                                className={`role-card ${role === 'manager' ? 'active' : ''}`}
                                onClick={() => { setRole('manager'); setError(''); }}
                            >
                                <ShieldCheck size={20} strokeWidth={1.5} />
                                <div>
                                    <p className="role-title">Manager</p>
                                    <p className="role-sub">Admin access</p>
                                </div>
                            </div>
                            <div
                                className={`role-card ${role === 'employee' ? 'active' : ''}`}
                                onClick={() => { setRole('employee'); setError(''); }}
                            >
                                <UserRound size={20} strokeWidth={1.5} />
                                <div>
                                    <p className="role-title">Employee</p>
                                    <p className="role-sub">Staff access</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right white login panel */}
                <div className="login-right">
                    <div className="login-form-wrap">
                        <h2>Welcome</h2>
                        <p className="login-sub">Login to your account to continue</p>

                        {error && <p className="login-error">{error}</p>}

                        <form onSubmit={handleSubmit}>
                            <input
                                className="login-input"
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                className="login-input"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="submit" className="login-btn">LOG IN</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

LoginForm.propTypes = {
    onLogin: PropTypes.func.isRequired,
};

export default LoginForm;