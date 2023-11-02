import { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineCloudUpload, AiTwotoneFile } from 'react-icons/ai'

const FileUploadDownload = () => {
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    // Fetch the list of uploaded files from the server
    axios.get('http://localhost:3001/uploads')
      .then((response) => {
        setUploadedFiles(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', file);

    axios.post('http://localhost:3001/upload', formData)
      .then((response) => {
        console.log(response.data);
        setFile(null);
      })
      .catch((error) => {
        console.error(error);
      }).finally(() => {
        axios.get('http://localhost:3001/uploads')
      .then((response) => {
        setUploadedFiles(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
      })
  };

  const handleDownload = (filename) => {
    window.open(`http://localhost:3001/download/${filename}`);
  };

  return (
    <div className='container'>
        <h3>Your Files</h3>
      <ul className='files-grid'>
        {uploadedFiles.map((file, index) => (
          <li key={index}>
            <AiTwotoneFile className='file-icon' />
            <button onClick={() => handleDownload(file)}>{file}</button>
          </li>
        ))}
      </ul>
      <div className="uploader">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}><span>Upload</span><AiOutlineCloudUpload /></button>
      <div>
        {file && <p>Selected File: {file.name}</p>}
      </div>
      </div>
    </div>
  );
};

export default FileUploadDownload;

