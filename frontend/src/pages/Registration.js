import React, { useState } from "react";

const RegistrationForm = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate email format
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Validate password strength
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    // Validate name
    if (!formData.name.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Name is required",
      }));
    }

    // Validate email
    if (!formData.email.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required",
      }));
    } else if (!validateEmail(formData.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email format",
      }));
    }

    // Validate password
    if (!formData.password.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
    } else if (!validatePassword(formData.password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password:
          "Password must be at least 8 characters long and include at least one letter, one number, and one special character",
      }));
    }

    // Validate confirm password
    if (!formData.confirmPassword.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Confirm Password is required",
      }));
    } else if (formData.password !== formData.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
    }

    // If no errors, submit the form
    if (
      !errors.name &&
      !errors.email &&
      !errors.password &&
      !errors.confirmPassword
    ) {
      console.log("Form submitted successfully:", formData);
      // You can add your form submission logic here
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h2 style={styles.title}>Registration Form</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Name */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Name<span style={styles.required}>*</span>
            </label>
            <div style={styles.inputWrapper}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            {errors.name && <div style={styles.error}>{errors.name}</div>}
          </div>

          {/* Email */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Email<span style={styles.required}>*</span>
            </label>
            <div style={styles.inputWrapper}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            {errors.email && <div style={styles.error}>{errors.email}</div>}
          </div>

          {/* Password */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Password<span style={styles.required}>*</span>
            </label>
            <div style={styles.inputWrapper}>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            {errors.password && (
              <div style={styles.error}>{errors.password}</div>
            )}
          </div>

          {/* Confirm Password */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Confirm Password<span style={styles.required}>*</span>
            </label>
            <div style={styles.inputWrapper}>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            {errors.confirmPassword && (
              <div style={styles.error}>{errors.confirmPassword}</div>
            )}
          </div>

          {/* Submit Button */}
          <div style={styles.inputGroup}>
            <button type="submit" style={styles.submitButton}>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reuse the same styles from ProfilePage
const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#345c66",
    padding: "2rem",
  },
  formCard: {
    width: "100%",
    maxWidth: "800px",
    backgroundColor: "#2E4F4F",
    padding: "2.5rem",
    borderRadius: "1rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 15px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(254, 244, 175, 0.2)",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#fef4af",
    textAlign: "center",
    marginBottom: "2.5rem",
    fontFamily: "'Montserrat', sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  label: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#fef4af",
    fontFamily: "'Montserrat', sans-serif",
  },
  required: {
    color: "#ff6b6b",
    marginLeft: "0.25rem",
  },
  inputWrapper: {
    position: "relative",
    backgroundColor: "rgba(254, 244, 175, 0.1)",
    borderRadius: "0.75rem",
    padding: "0.75rem",
    border: "1px solid rgba(254, 244, 175, 0.2)",
  },
  input: {
    width: "100%",
    color: "#fef4af",
    fontSize: "1rem",
    fontFamily: "'Montserrat', sans-serif",
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
  },
  error: {
    fontSize: "0.875rem",
    color: "#ff6b6b",
    marginTop: "0.25rem",
  },
  submitButton: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#fef4af",
    color: "#2E4F4F",
    fontSize: "1rem",
    fontWeight: "600",
    fontFamily: "'Montserrat', sans-serif",
    border: "none",
    borderRadius: "0.75rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default RegistrationForm;