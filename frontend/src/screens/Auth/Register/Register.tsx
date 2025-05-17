import React, { useState } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Errors>({});

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validate = () => {
    const newErrors: Errors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      alert('Registration successful!');
      setFormData({ email: '', password: '', confirmPassword: '' });
      setErrors({});
    }
  };

  return (
    <>
      <div className="register-container">
        <form onSubmit={handleSubmit} className="register-form" noValidate>
          <h2>Create Account</h2>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'input-error' : ''}
            placeholder="Enter your email"
          />
          {errors.email && <span className="error-text">{errors.email}</span>}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'input-error' : ''}
            placeholder="Enter a password"
          />
          {errors.password && <span className="error-text">{errors.password}</span>}

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? 'input-error' : ''}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}

          <button type="submit" className="submit-btn">Register</button>

          <div className="login-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </form>
      </div>
      <div className="registerBottom">
        <p>© 1996-2025, Amazon.com, Inc. or its affiliates</p>
      </div>
    </>
  );
};

export default Register;