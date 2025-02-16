import React, { useState } from "react";

const ProfilePage = () => {
  // Hardcoded profile data
  const profileData = {
    fullName: "John Doe",
    email: "john.doe@example.com",
    jobTitle: "Senior Software Engineer",
    company: "Tech Corp Inc.",
    location: "San Francisco, CA",
    bio: "Experienced software engineer with a passion for building scalable and user-friendly applications. Proficient in React, Node.js, and cloud technologies.",
    skills: "React, Node.js, Python, AWS, Docker",
    socialLinks: "https://linkedin.com/in/johndoe\nhttps://github.com/johndoe",
  };

  // State for profile picture
  const [profilePicture, setProfilePicture] = useState(
    "https://via.placeholder.com/150"
  );

  // Handle profile picture upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h2 style={styles.title}>Profile Information</h2>

        <div style={styles.form}>
          {/* Profile Picture */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Profile Picture<span style={styles.required}>*</span>
            </label>
            <div style={styles.profilePictureContainer}>
              <div style={styles.profilePictureWrapper}>
                <img
                  src={profilePicture}
                  alt="Profile"
                  style={styles.profilePicture}
                />
                <input
                  type="file"
                  name="profilePicture"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={styles.fileInput}
                />
              </div>
            </div>
          </div>

          {/* Full Name */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Full Name<span style={styles.required}>*</span>
            </label>
            <div style={styles.inputWrapper}>
              <div style={styles.input}>{profileData.fullName}</div>
            </div>
          </div>

          {/* Email */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Email<span style={styles.required}>*</span>
            </label>
            <div style={styles.inputWrapper}>
              <div style={styles.input}>{profileData.email}</div>
            </div>
          </div>

          {/* Job Title */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Job Title<span style={styles.required}>*</span>
            </label>
            <div style={styles.inputWrapper}>
              <div style={styles.input}>{profileData.jobTitle}</div>
            </div>
          </div>

          {/* Company */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Company<span style={styles.required}>*</span>
            </label>
            <div style={styles.inputWrapper}>
              <div style={styles.input}>{profileData.company}</div>
            </div>
          </div>

          {/* Location */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Location<span style={styles.required}>*</span>
            </label>
            <div style={styles.inputWrapper}>
              <div style={styles.input}>{profileData.location}</div>
            </div>
          </div>

          {/* Bio */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Bio<span style={styles.required}>*</span>
            </label>
            <div style={styles.inputWrapper}>
              <div style={styles.textarea}>{profileData.bio}</div>
            </div>
            <div style={styles.charCount}>
              {profileData.bio.length}/500 characters
            </div>
          </div>

          {/* Skills */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Skills <span style={styles.optional}>(Optional)</span>
            </label>
            <div style={styles.inputWrapper}>
              <div style={styles.textarea}>{profileData.skills}</div>
            </div>
            <div style={styles.charCount}>
              {profileData.skills.length}/300 characters
            </div>
          </div>

          {/* Social Links */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Social Links <span style={styles.optional}>(Optional)</span>
            </label>
            <div style={styles.inputWrapper}>
              <div style={styles.textarea}>
                {profileData.socialLinks.split("\n").map((link, index) => (
                  <div key={index}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.link}
                    >
                      {link}
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div style={styles.charCount}>
              {profileData.socialLinks.length}/300 characters
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reuse the same styles from StrategyForm
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
  optional: {
    color: "#fef4af",
    opacity: 0.6,
    fontWeight: "normal",
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
  },
  textarea: {
    width: "100%",
    color: "#fef4af",
    fontSize: "1rem",
    fontFamily: "'Montserrat', sans-serif",
    whiteSpace: "pre-wrap",
  },
  charCount: {
    fontSize: "0.875rem",
    color: "#fef4af",
    opacity: 0.6,
    textAlign: "right",
  },
  profilePictureContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  profilePictureWrapper: {
    position: "relative",
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    overflow: "hidden",
    border: "2px solid #fef4af",
  },
  profilePicture: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  fileInput: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0,
    cursor: "pointer",
  },
  link: {
    color: "#fef4af",
    textDecoration: "none",
    wordBreak: "break-all",
  },
};

export default ProfilePage;