import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchContentDetails } from '../api/teacher';
import Navbar from './Navbar';

import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const ContentDetails = () => {
    const {id} = useParams();
    const [contentDetail, setContentDetail] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        fetchContentDetails(id)
        
        .then((data) => {
            console.log(data);
            setContentDetail(data);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching content detail:', error);
            setLoading(false);
        })
    }, [id]);


   
     // Function to handle edit button click
  const handleEditClick = () => {
    // Implement the logic to handle the edit action here
    console.log('Edit button clicked!');
  };

  // Function to handle delete button click
  const handleDeleteClick = () => {
    // Implement the logic to handle the delete action here
    // Show a confirmation popup before deleting
    const confirmDelete = window.confirm('Are you sure you want to delete this content?');

    if (confirmDelete) {
      // Implement the logic to handle the delete action here
      console.log('Delete confirmed!');
    } else {
      console.log('Delete canceled!');
    }
  };
    

// Extract online_storage_url and filename from contentDetail
const filename = contentDetail?.contentDetail.filename;
const online_storage_url = contentDetail?.contentDetail.online_storage_url;
const url = contentDetail?.contentDetail.file_url;

//Check if online_storage_url is null and the filename has a PDF extension
const isPDF = online_storage_url === null && filename.endsWith('.pdf');
// if(isPDF) {
//        // Create a URL object from the received blob data
//     //    const pdfBlob = new Blob(url , { type: 'application/pdf' });
//     //    const pdfUrl = URL.createObjectURL(pdfBlob);
//     const pdfUrl = url;
//        setPdfUrl(pdfUrl);
// }
// console.log(url)

// useEffect(() => {
//     if (contentDetail?.contentDetail?.file_url) {
//         // Extract the file URL from the contentDetail object
//         const url = contentDetail.contentDetail.file_url;
//         // Check if the file URL ends with ".pdf" to determine if it's a PDF file
//         const isPDF = url.endsWith('.pdf');
//         console.log(isPDF);
//         if (isPDF) {
//             // Set the PDF URL directly from the received URL
//             setPdfUrl(url);
//         }
//     }
// }, [contentDetail]);

 
  return (
    <div>
        <Navbar  />
        {
            loading ? (
                <CircularProgress />
            ) : (
                <div>
                <h2>Content Detail</h2>
                <div>

                    {isPDF  ? (
                     
                     <iframe
                     src={`${'http://localhost:8000'}`/contentDetail?.contentDetail?.file_url}
                     title="PDF Viewer"
                     width="100%"
                     height="500px"
                   />
                   )
                :
                (
                    <iframe
                    width="860"
                    height="415"
                    src={contentDetail.contentDetail.online_storage_url.replace("watch?v=", "embed/")}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )
                }
                  {/* Embed the YouTube video using an iframe */}
                 
                </div>
           
           
              </div>
            )
        }
        <Button variant="contained" color="primary" onClick={handleEditClick} style={{marginRight: '25px'}}>
          Edit
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDeleteClick}>
          Delete
        </Button>

    </div>
  )
}

export default ContentDetails
