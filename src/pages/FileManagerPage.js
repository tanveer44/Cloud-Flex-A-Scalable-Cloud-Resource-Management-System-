import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FileManager = () => {
  const navigate = useNavigate();
  const [activeStorageType, setActiveStorageType] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    if (!activeStorageType || !activeCategory) return;

    try {
      const response = await axios.get(
        `http://localhost:8081/api/files/search?storageType=${activeStorageType}&category=${activeCategory}`
      );
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  useEffect(() => {
    fetchFiles(); 
  }, [activeStorageType, activeCategory]);

  const handleStorageTypeClick = (storageType) => {
    setActiveStorageType(storageType);
    setActiveCategory('All'); 
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleFileAction = (action, file) => {
    alert(`${action} action on ${file.fileName}`);
  };

  // Handle file deletion
  const handleDeleteFile = async (id) => {
    try {
      // Send DELETE request to the backend
      await axios.delete(`http://localhost:8081/api/files/${id}`);
      // Remove the deleted file from the UI by filtering it out
      setFiles(files.filter(file => file.id !== id));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const renderFilesTable = () => {
    if (!files || files.length === 0) return null;

    return (
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Type</th>
              <th style={styles.tableHeader}>View</th>
              <th style={styles.tableHeader}>Download</th>
              <th style={styles.tableHeader}>Rename</th>
              <th style={styles.tableHeader}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{file.fileName}</td>
                <td style={styles.tableCell}>{file.category}</td>
                <td style={styles.tableCell}>
                  <button
                    style={styles.actionButton}
                    onClick={() => handleFileAction('View', file)}
                  >
                    View
                  </button>
                </td>
                <td style={styles.tableCell}>
                  <button
                    style={styles.actionButton}
                    onClick={() => handleFileAction('Download', file)}
                  >
                    Download
                  </button>
                </td>
                <td style={styles.tableCell}>
                  <button
                    style={styles.actionButton}
                    onClick={() => handleFileAction('Rename', file)}
                  >
                    Rename
                  </button>
                </td>
                <td style={styles.tableCellCenter}>
                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDeleteFile(file.id)}
                    className="fa fa-trash"
                  >
                   
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2 style={styles.pageTitle}>File Manager</h2>
      </header>

      <nav style={styles.navbar}>
        <button
          style={{ ...styles.navButton, backgroundColor: '#4285F4' }}
          onClick={() => handleStorageTypeClick('googleDrive')}
        >
          Google Drive
        </button>
        <button
          style={{ ...styles.navButton, backgroundColor: '#4285F4' }}
          onClick={() => handleStorageTypeClick('oneDrive')}
        >
          OneDrive
        </button>
        <button
          style={{ ...styles.navButton, backgroundColor: '#4285F4' }}
          onClick={() => handleStorageTypeClick('localDrive')}
        >
          Local Drive
        </button>
      </nav>

      {activeStorageType && (
        <div style={styles.categorySwitchBar}>
          <button
            style={styles.categoryButton}
            onClick={() => handleCategoryChange('All')}
          >
            All
          </button>
          <button
            style={styles.categoryButton}
            onClick={() => handleCategoryChange('Documents')}
          >
            Documents
          </button>
          <button
            style={styles.categoryButton}
            onClick={() => handleCategoryChange('Images')}
          >
            Images
          </button>
          <button
            style={styles.categoryButton}
            onClick={() => handleCategoryChange('Videos')}
          >
            Videos
          </button>
        </div>
      )}

      <div style={styles.fileTableContainer}>
        {renderFilesTable()}
      </div>

      <footer style={styles.footer}>
        <button style={styles.backButton} onClick={() => navigate('/home')}>
        <i className="bi bi-arrow-left" style={styles.arrowIcon}></i>
          Back to Home
        </button>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundImage:
      'url("/static/manager.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    overflow: 'auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
  },



  pageTitle: {
    fontSize: '2.5rem',
    color: '#333',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '20px',
  },
  navButton: {
    padding: '10px 20px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    cursor: 'pointer',
  },
  categorySwitchBar: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '30px',
  },
  categoryButton: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#f2f2f2',
    color: '#333',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  fileTableContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    overflowY: 'auto',
    maxHeight: '300px',
    scrollBehavior: 'smooth',
    scrollbars: 'thin',
    marginLeft: '100px',
  },
  tableContainer: {
    maxHeight: '400px',
    overflowY: 'auto',
    width: '80%',  // Increase width percentage or set a fixed width
    margin: '0 auto',  // Centers the container
    display: 'flex',
    justifyContent: 'center',
  },
  table: {
    width: '100%',  // Let the table take the full width of the container
    borderCollapse: 'collapse',
  },
  tableHeader: {
    padding: '10px',
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
  },
  tableCell: {
    padding: '10px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  },
  tableCellCenter: {
    textAlign: 'center',
  },
  actionButton: {
    backgroundColor: '#4285F4',
    color: 'white',
    padding: '5px 10px',
    fontSize: '0.9rem',
    border: 'none',
    borderRadius: '5px',
    margin: '2px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  deleteButton: {
    color: '#333',
  padding: '5px',
  cursor: 'pointer',
  borderRadius: '150%',
  fontSize: '1.2rem',
  backgroundColor: 'transparent',
  border: '1px solid #ccc', 
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 auto',
  opacity: 0.8,

  },
  footer: {
    marginTop: 'auto',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  backButton: {
    background: '#4285F4',
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    fontWeight: 'bold',
    transition: 'transform 0.3s ease',
    marginBottom: '30px',
  },
  arrowIcon: {
    fontSize: '20px',
    marginRight: '10px',
  },
};

export default FileManager;
