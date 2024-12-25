import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FileManagerPage = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [uploadChoice, setUploadChoice] = useState('googleDrive'); // Default upload choice

  // Allowed values for storageType
  const allowedStorageTypes = ["googleDrive", "oneDrive", "localDrive"];

  // Function to automatically determine file category based on MIME type
  const determineCategory = (mimeType) => {
    if (mimeType.startsWith('image/')) return 'Images';
    if (mimeType.startsWith('video/')) return 'Videos';
    if (mimeType.startsWith('application/')) {
      if (mimeType.includes('pdf')) return 'Documents';
      if (mimeType.includes('msword') || mimeType.includes('officedocument')) return 'Documents';
    }
    return 'Unknown'; // Default category for unsupported file types
  };

  // Upload files to the local state
  const uploadFile = (event) => {
    const uploadedFiles = event.target.files;
    const fileDetails = Array.from(uploadedFiles).map((file, index) => ({
      id: index + 1, // Assign a unique ID for each file
      storageType: uploadChoice,
      category: determineCategory(file.type), // Automatically decide category
      fileName: file.name, // Extract the file name
      file: file, // Store the actual file for viewing
    }));

    setFiles((prevFiles) => [...prevFiles, ...fileDetails]);
    alert(`Files uploaded to ${uploadChoice}`);
  };

  // Delete a file from the list
  const deleteFile = (fileName) => {
    setFiles(files.filter((file) => file.fileName !== fileName));
  };

  // Transfer file metadata to the backend
  const transferFiles = async () => {
    if (!allowedStorageTypes.includes(uploadChoice)) {
      alert('Invalid storage type selected. Allowed values are: googleDrive, oneDrive, or localDrive.');
      return;
    }

    if (files.length === 0) {
      alert('No files to transfer.');
      return;
    }

    try {
      // Send the metadata as JSON to the backend
      const response = await axios.post('http://localhost:8081/api/files', files, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Handle successful metadata transfer
      console.log('Files metadata transferred successfully', response.data);
      alert('Files metadata transferred successfully');
    } catch (error) {
      // Handle errors
      console.error('Error transferring files metadata:', error);
      alert('Failed to transfer files metadata');
    }
  };

  // Open file in a new tab
  const viewFile = (file) => {
    const fileUrl = URL.createObjectURL(file); // Create URL for local file
    window.open(fileUrl, '_blank'); // Open the file in a new tab
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2 style={styles.pageTitle}>CloudFlex File Manager</h2>
      </header>

      <section style={styles.fileActions}>
        <div style={styles.uploadChoiceContainer}>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              value="googleDrive"
              checked={uploadChoice === 'googleDrive'}
              onChange={() => setUploadChoice('googleDrive')}
            />
            Google Drive
          </label>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              value="oneDrive"
              checked={uploadChoice === 'oneDrive'}
              onChange={() => setUploadChoice('oneDrive')}
            />
            OneDrive
          </label>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              value="localDrive"
              checked={uploadChoice === 'localDrive'}
              onChange={() => setUploadChoice('localDrive')}
            />
            Local Drive
          </label>
        </div>

        <label htmlFor="fileUpload" style={styles.uploadButton}>
          Upload Files
        </label>
        <input
          id="fileUpload"
          type="file"
          multiple
          style={styles.fileInput}
          onChange={uploadFile}
        />
      </section>

      <section style={styles.fileList}>
        <h3 style={styles.fileListTitle}>Uploaded Files</h3>
        {files.length > 0 ? (
          <div style={styles.tableContainer}>
            <table style={styles.fileTable}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>File Name</th>
                  <th style={styles.tableHeader}>Category</th>
                  <th style={styles.tableHeader}>View</th>
                  <th style={styles.tableHeader}>Delete</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file.id}>
                    <td style={styles.tableCell}>{file.fileName}</td>
                    <td style={styles.tableCell}>{file.category}</td>
                    <td style={styles.tableCell}>
                      <button
                        style={styles.viewButton}
                        onClick={() => viewFile(file.file)}
                      >
                        View
                      </button>
                    </td>
                    <td style={styles.tableCell}>
                      <button
                        style={styles.deleteButton}
                        onClick={() => deleteFile(file.fileName)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No files uploaded yet.</p>
        )}
      </section>

      <div style={styles.buttonContainer}>
        <button
          style={styles.transferButton}
          onClick={transferFiles}
        >
          Transfer Metadata to Backend
        </button>
        <button
          style={styles.backButton}
          onClick={() => navigate('/home')}
        >
          <i className="bi bi-arrow-left" style={styles.arrowIcon}></i>
          Back to Home
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundImage: 'url("/static/manager.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    overflowY: 'auto',
    paddingBottom: '80px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  pageTitle: {
    fontSize: '2rem',
    color: '#333',
  },
  fileActions: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  uploadChoiceContainer: {
    marginBottom: '20px',
  },
  radioLabel: {
    marginRight: '20px',
    fontSize: '1rem',
  },
  uploadButton: {
    display: 'inline-block',
    backgroundColor: '#008CBA',
    color: '#fff',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '5px',
    margin: '10px',
  },
  fileInput: {
    display: 'none',
  },
  fileList: {
    textAlign: 'center',
    maxHeight: '300px',
    overflowY: 'auto',
    width: '80%',
    margin: '0 auto',
  },
  tableContainer: {
    overflowY: 'auto',
  },
  fileTable: {
    margin: '0 auto',
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    padding: '10px',
    fontSize: '1rem',
  },
  tableCell: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    fontSize: '1rem',
  },
  viewButton: {
    backgroundColor: '#008CBA',
    color: '#fff',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '0.9rem',
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
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
    position: 'absolute',
    bottom: '20px',
    left: '49%',
    transform: 'translateX(-50%)',
    width: '100%',
  },
  transferButton: {
    backgroundColor: '#008CBA',
    color: '#fff',
    padding: '10px 20px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
    transition: 'transform 0.3s ease',
  },
  backButton: {
    background: '#008CBA',
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    fontWeight: 'bold',
    transition: 'transform 0.3s ease',
    marginLeft: '45px',
  },
  arrowIcon: {
    fontSize: '20px',
    marginRight: '10px',
  },
};

export default FileManagerPage;
