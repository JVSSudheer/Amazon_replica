import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

interface FormData {
  email: string;
  password: string;
}

interface Errors {
  email?: string;
  password?: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [errors, setErrors] = useState<Errors>({});

  const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validate = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validate()) {
      alert('Login successful!');
      setFormData({ email: '', password: '' });
      setErrors({});
    }
  };

  return (
    <>
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <h2>Sign In</h2>

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'input-error' : ''}
          />
          {errors.password && <span className="error-text">{errors.password}</span>}

          <button type="submit" className="submit-btn">Login</button>

          <div className="register-link">
            Don't have an account? <Link to="/register">Create one</Link>
          </div>
        </form>
      </div>
      <div className="loginBottom">
        <p>© 1996-2025, Amazon.com, Inc. or its affiliates</p>
      </div>
    </>
  );
};

export default Login;