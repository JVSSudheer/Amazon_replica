import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { regiser } from '../../../services/authServices';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-toastify';

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const navigate = useNavigate();

  const { refetchUser } = useAuth();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    // Basic phone validation - adjust according to your needs
    return /^[0-9]{10,15}$/.test(phone);
  };

  const validate = () => {
    const newErrors: Errors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await regiser({
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          name: formData.name,
        });
        localStorage.setItem("token", response.body.token);
        refetchUser();
        toast.success("Registration successful");
          navigate('/');
      } catch (error) {
        console.error("Error during registration:", error);
      }
    }
  };

  return (
    <>
      <div className="register-container">
        <form onSubmit={handleSubmit} className="register-form" noValidate>
          <h2>Create Account</h2>

          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'input-error' : ''}
            placeholder="Enter your full name"
          />
          {errors.name && <span className="error-text">{errors.name}</span>}

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

          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? 'input-error' : ''}
            placeholder="Enter your phone number"
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}

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