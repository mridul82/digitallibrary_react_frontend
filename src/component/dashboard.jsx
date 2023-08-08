import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchContents } from '../api/teacher';
import Navbar from './Navbar';
import './dashboard.css';

// import { PlayCircleOutlineIcon, TextIcon } from '@mui/icons-material';
import ArticleIcon from '@mui/icons-material/Article';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


const Dashboard = () => {
    const [username, setUsername] = useState('');
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    useEffect(() => {
        fetchUserDate();
    }, []);

    const fetchUserDate = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem("user"));
           // console.log(userData);
            const username = userData ? userData.name : "";
            setUsername(username);
            const  response = await fetchContents();
            console.log(response.content);
            setContent(response.content);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching content data:', error);
      setLoading(false); 
        }
    }


    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    }

    // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = content?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  

    
  return (
    <div>
        <Navbar username={username} handleLogout={handleLogout} />
       <div>
      <h2>Welcome to the Dashboard {username}</h2>
      <p>This is the protected area that only logged-in users can access.</p>
      
      {/* Add any additional content or components for your dashboard */}
    </div>
    {loading ? (
          <CircularProgress /> // Show the loader while data is being fetched
        ) : (
    <Grid container spacing={3}>
          {currentItems ?.map(item => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Link to={`/content/${item.id}`} className="content-link">
              <Card>
                <CardContent>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                {/* <PlayCircleOutlineIcon color="primary" fontSize="large" /> */}

                {item.cnt_type === 3 ? (
            <YouTubeIcon color="primary" fontSize="large" />
          ) : (
            <ArticleIcon color="secondary" fontSize="large" />
          )}
               
                  <Typography variant="h5" component="h2">
                    {item.cnt_title}
                  </Typography>
                  </div>
                  <Typography variant="body2" component="p">
                    {item.cnt_topic}
                  </Typography>
                  <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle2">
                      Class: {item.cnt_class}
                    </Typography>
                    <Typography variant="subtitle2">
                      Chapter : {item.cnt_chapter}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
        )}
        <div style={{ marginTop: '20px' }}>
          {/* Pagination buttons */}
          {content?.length > itemsPerPage && (
            <div>
                <ButtonGroup variant="contained" aria-label="pagination">
                {Array.from({ length: Math.ceil(content.length / itemsPerPage) }).map((_, index) => (
                <Button key={index} onClick={() => paginate(index + 1)}>
                  {index + 1}
                </Button>
              ))}
                </ButtonGroup>
            
            </div>
          )}
        </div>
 
    </div>
  )
}

export default Dashboard
