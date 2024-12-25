import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    navigate('/login');
  };

  const showLogoutModal = () => {
    setIsModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsModalOpen(false);
  };

  const goToFileManager = () => {
    navigate('/file-manager');
  };

  const goToFileUpload = () => {
    navigate('/file-upload');
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <h1 style={styles.navTitle}>CloudFlex MultiCloud Platform</h1>
        <div style={styles.navLinks}>
          <button
            style={styles.navButton}
            onClick={goToFileManager}
          >
            File Manager
          </button>
          <button
            style={styles.navButton}
            onClick={goToFileUpload}
          >
            Upload
          </button>
          <button
            style={styles.navButton}
            onClick={showLogoutModal}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Content Container */}
      <div style={styles.contentContainer}>
        {/* Profile and Team Members Grouped Together */}
        <div style={styles.profileTeamContainer}>
          <div style={styles.profileContainer}>
            <img
              src="https://www.w3schools.com/w3images/avatar2.png"
              alt="Profile"
              style={styles.profileImage}
            />
            <div style={styles.profileInfo}>
              <h2 style={styles.userName}>John Doe</h2>
              <p style={styles.userEmail}>johndoe@example.com</p>
            </div>
          </div>

          <div style={styles.teamMembersContainer}>
            <h3 style={styles.teamMembersTitle}>Team Members</h3>
            <ul style={styles.teamMembersList}>
              <li>Srineha, Siddharth, Kusuma, Ayaan,</li>
              <li>Tanveer, Yash, Anusha, Iraianbu</li>
              <li>Aditya, Sirisha</li>
            </ul>
          </div>
        </div>

        {/* CloudFlex MultiCloud Platform */}
        <div style={styles.cloudFlexContainer}>
          <div style={styles.cloudFlexTitle}>CloudFlex MultiCloud Platform</div>
          <p>Explore the power of CloudFlex MultiCloud Platform</p>
        </div>

        {/* Features and File Actions */}
        <div style={styles.cardsContainer}>
          <motion.div
            style={styles.card}
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h4 style={styles.cardTitle}>Cloud Storage Integration</h4>
            <p>Handle multiple cloud storage APIs.</p>
          </motion.div>
          <motion.div
            style={styles.card}
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 style={styles.cardTitle}>File Management</h4>
            <p>View, upload, and delete files.</p>
          </motion.div>
          <motion.div
            style={styles.card}
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h4 style={styles.cardTitle}>Unified Platform</h4>
            <p>Manage cloud storage from one app.</p>
          </motion.div>
        </div>

        {/* File Manager and Upload Cards */}
        <div style={styles.cardsContainer}>
          <div style={styles.roundCard} onClick={goToFileManager}>
            <h4 style={styles.cardTitle}>📁 File Manager</h4>
          </div>
          <div style={styles.roundCard} onClick={goToFileUpload}>
            <h4 style={styles.cardTitle}>⬆️ Upload a File</h4>
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      {isModalOpen && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2>Logout?</h2>
            <button style={styles.modalButton} onClick={handleLogout}>
              Yes, Logout
            </button>
            <button style={styles.modalButton} onClick={closeLogoutModal}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={styles.footer}>
        <p>Infosys Springboard Internship 2024-2025 | Contact: dummy | Email: dummy</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundImage:
      'url("/static/home.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#fff',
    paddingBottom: '80px',
    position: 'relative',  // Changed from fixed to relative
    width: '100%',
    height: '100vh',  // Ensure the container takes full height
    marginTop: '60px', // Adjusted to add space below navbar
    right: 0,
    overflowY: 'auto',  // Allow scrolling if content overflows
  },
  navbar: {
    width: '100%',
    padding: '5px 20px', // Reduced padding for a smaller topbar
    backgroundColor: 'rgba(0, 0, 0, 0.86)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 20,  // Ensure navbar is always on top
    height: '50px',  // Adjusted height
  },
  navTitle: {
    fontSize: '1.2rem',  // Adjusted font size
    fontWeight: 'bold',
  },
  navLinks: {
    display: 'flex',
    gap: '10px',
    marginRight: '50px',
  },
  navButton: {
    padding: '8px 18px', // Reduced button size for smaller navbar
    fontSize: '0.9rem',  // Adjusted font size
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'transform 0.3s, background-color 0.3s',
    zIndex: 30,  // Ensure the buttons are above other content
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',  // Centered content
    justifyContent: 'flex-start',
    width: '100%',
    padding: '20px',
    marginTop: '10px',  // Adjust space for the smaller navbar
  },
  profileTeamContainer: {
    display: 'flex',
    justifyContent: 'space-between',  // Profile and Team Members side by side
    width: '100%',
    maxWidth: '1000px',
    marginBottom: '20px',
    background: 'rgba(255, 255, 255, 0.8)',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
  },
  profileContainer: {
    display: 'flex',
    justifyContent: 'center',  // Center profile
    alignItems: 'center',
    marginRight: '30px',  // Add space between profile and team members
  },
  profileImage: {
    borderRadius: '50%',
    width: '80px',
    height: '80px',
    marginRight: '15px',
  },
  profileInfo: {
    textAlign: 'left',
    color: '#333',  // Consistent text color
  },
  userName: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: '1rem',
  },
  teamMembersContainer: {
    textAlign: 'center',
    color: '#333',  // Consistent text color
  },
  teamMembersTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  teamMembersList: {
    listStyleType: 'none',
    paddingLeft: 0,
    fontSize: '1rem',
  },
  cloudFlexContainer: {
    textAlign: 'center',
    color: '#333',  // Consistent text color
    width: '100%',
    maxWidth: '1000px',
    marginTop: '20px',
    background: 'rgba(255, 255, 255, 0.8)',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
  },
  cloudFlexTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  cardsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '20px',
    width: '100%',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    width: 'calc(33% - 20px)',
    textAlign: 'center',
    cursor: 'pointer',
    color: '#000',
  },
  cardTitle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#333',
  },
  roundCard: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '20px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
    width: '200px',
    textAlign: 'center',
    cursor: 'pointer',
    color: '#000',
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,  // Ensure the modal is on top of everything
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
    color: 'black',
  },
  modalButton: {
    padding: '8px 15px',
    fontSize: '1rem',
    margin: '10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'transform 0.3s, background-color 0.3s',
  },
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
    width: '100%',
    padding: '5px 20px', // Reduced padding for a smaller footer
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    zIndex: 5,  // Lower zIndex for footer, so it's under the content
    height: '40px',  // Adjusted height
  }
};



export default HomePage;
