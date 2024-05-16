import React, { useEffect, useState } from "react";
import { useRef } from "react";
import SuccessImag from "../../Images/tickimage.png";
import {
  downloadFile,
  getUser,
  getUserFiles,
  uploadFile,
} from "../../services/https";
import "./HomePag.scss";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const inputref = useRef();
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [share, setShare] = useState(false);
  const [download, setDownload] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [success,setSuccess]=useState(false);
  const [id, setId] = useState([
    {
      _id: "",
      userName: "",
    },
  ]);
  const [filesdownload, setFilesdownload] = useState([
    {
      _id: "",
      userName: "",
    },
  ]);

  const postFile = async (files) => {
         const formdata = new FormData();
      formdata.append("name", files.name);
      formdata.append("filetype", files.type);
      formdata.append("file", files);
      formdata.append("studentId", studentId);
      
      const res = await uploadFile(formdata);
      if (res) {
        setFile('');
        setSuccess(true)
      }
    
  };
 
  const onChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
       postFile(selectedFile);
      // Reset file input value to allow the same file to be uploaded again
      e.target.value = '';
    }
  };

  const onButtonClick = (e) => {
    inputref.current.click();
    setStudentId(e);
  };

  // useEffect(() => {
  
  // }, [file]);

  useEffect(() => {
    // Generate animation delay classes dynamically based on the number of list items
    const delayClasses = filesdownload.map((item, index) => `.delay-${index + 1} { animation-delay: 0.${index}s; }`).join('\n');
    
    // Create a new style element and append the dynamically generated delay classes
    const style = document.createElement('style');
    style.textContent = delayClasses;
    document.head.appendChild(style);
  }, [filesdownload]);

  useEffect(() => {
    // Generate animation delay classes dynamically based on the number of list items
    const delayClasses = id.map((item, index) => `.delay-${index + 1} { animation-delay: 0.${index}s; }`).join('\n');
    
    // Create a new style element and append the dynamically generated delay classes
    const style = document.createElement('style');
    style.textContent = delayClasses;
    document.head.appendChild(style);
  }, [id]);

  // const downloadFiledata = async (id, name,type) => {
  //   try {
  //     const response = await fetch(`http://localhost:8000/file/${id}`);
  //     const blob = await response.blob();
  //     let extension = "";

  //     if (type === 'image/png') {
  //       // For image files
  //       extension = ".png"; // Assuming images will be downloaded as JPEG files
  //     } 
  //     // else if(type === 'image/jpeg' || type === 'image/jpg'){
  //     //   extension = ".jpg";
  //     // }
  //     else if (type === "application/pdf") {
  //       // For PDF files
  //       extension = ".pdf";
  //     } else {
  //       // For other file types, you can handle accordingly
        
  //       return;
  //     }
  
  //     // const blob = await response.blob();
  
  //     // Create a temporary anchor element
  //     const a = document.createElement("a");
  //     a.href = window.URL.createObjectURL(blob);
  //     a.download = `${id}${extension}`;
  //     a.click();
  //     window.URL.revokeObjectURL(a.href);
  //   } catch (error) {
  //     console.error("Error downloading file:", error);
  //   }
  // };

  const downloadFiledata = async (id, name, type) => {
    try {
      const response = await fetch(`https://filesharingadi-e1a9a8b291a1.herokuapp.com/file/${id}`);
      const blob = await response.blob();
  
      // Create a temporary anchor element
      const a = document.createElement("a");
      a.href = window.URL.createObjectURL(blob);
      
      // Set download attribute to a generic name without extension
      a.download = name || 'download';
      
      // Trigger download
      a.click();
      
      // Clean up
      window.URL.revokeObjectURL(a.href);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  
  useEffect(() => {
    const getUsers = async () => {
      const res = await getUser(localStorage.getItem("userName"));
      setId(res);
    };
    const getUsersFiles = async () => {
      const res = await getUserFiles(localStorage.getItem("id"));
      setFilesdownload(res);
    };
    getUsers();
    getUsersFiles();
  }, []);

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="homepage">
     {success &&  <div className="SuccessPopup">
          <img src={SuccessImag} alt='successimg'/>
          <h1>File Uploaded Successfully.</h1>
          <button
          onClick={() => {
            setSuccess(false)
          }}
        >
          OK
        </button>
      </div>}
      <div className="navbar">
        <button
          onClick={() => {
            setShare(true);
            setDownload(false);
          }}
        >
          Share
        </button>
        <button
          onClick={() => {
            setDownload(true);
            setShare(false);
          }}
        >
          Download
        </button>
        <button onClick={onLogout}>Logout</button>
      </div>
      <div className="cloudMessages">
        <h1>Welcome to Our Cloud Storage File Sharing System.</h1>
        <p>
          Here you can share file to your friends using cloud storage system.
        </p>
        <p>
          On Clicking on share you can share a file to your friends who are same
          platform.
        </p>
        <p>
          {" "}
          On Clicking on download you can download whichever file you want
          shared by your friend.
        </p>
      </div>
      {share && (
        <div className="downloadSection">
           {
            id.length < 1 && <h1 style={{width:'800px'}}>Congratulations. You are the first person on Our Platform wait for sometime for Other to Join.</h1>
          }
          <input
            ref={inputref}
            onChange={(e) => {
              onChange(e);
            }}
            type="file"
            style={{ display: "none" }}
          />
          <ul>
            {id.map((e, index) => {
              return (
                <li  key={index} className={`animate delay-${index}`}>
                  {e.userName}{" "}
                  <button
                    onClick={() => {
                      onButtonClick(e._id);
                    }}
                  >
                    Select
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {download && (
        <div className="downloadSection">
          {
            filesdownload.length < 1 && <h1 >Currently No File Shared to you</h1>
          }
          <ul>
            {filesdownload.map((e, index) => {
              return (
                <li key={index} className={`animate delay-${index}`}>
                  {e.name}{" "}
                  <button
                    onClick={() => {
                      downloadFiledata(e._id, e.name, e.type);
                    }}
                  >
                    download
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HomePage;
