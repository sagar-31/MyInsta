import React, {useEffect,useState} from 'react';
import logo from './logo.png';
import Post from './post.js';
import Modal from '@material-ui/core/Modal';
import {makeStyles} from '@material-ui/core/styles';
import ImageUpload from './ImageUpload';
import './App.css';
import { db, auth } from './firebase';
import { Button,Input } from '@material-ui/core';
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes=useStyles();
  const [posts,setPosts]= useState([]);
  const [open,setOpen]=useState(false);
  const [modalStyle]=useState(getModalStyle);
  const [openSignIn,setOpenSignIn]= useState(false);
  const [username,setUsername]= useState('');
  const [password,setPassword]=useState('');
  const [email,setEmail]=useState('');
  const [user,setUser]=useState(null);
  useEffect(()=>{

    const unsubscribe=auth.onAuthStateChanged((authUser)=>{
      if(authUser){
     console.log(authUser);
     setUser(authUser);
     if(authUser.displayName){

     }
     else{
       return authUser.updateProfile({
         displayName:username,
       });
     }
      }
      else{
      setUser(null);
      }
  })
  return ()=>{
    unsubscribe();
  }
},[user,username]);


  useEffect(()=>{
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc=>({
        id:doc.id,
        post:doc.data()
        })));
    })
  },[]);
  const handleClose = () => {
    setOpen(false);
  };
  const signUp=(event)=>{
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser)=>{
      return authUser.user.updateProfile({
        displayName:username
      })
    })
    .catch((error)=>alert(error.message));
    setOpen(false);
  }
  const signIn=(event)=>{
    event.preventDefault();
    auth.signInWithEmailAndPassword(email,password)
    .catch((error)=>alert(error.message))
    setOpenSignIn(false);
  }
  return (
    <div className="app">
    {user?.displayName ? (
      <ImageUpload username={user.displayName}/>
    ):
    (
      <h3>SORRY PLEASE LOG IN</h3>
    )}
    
     <Modal open={open} onClose={handleClose}>
     <div style={modalStyle} className={classes.paper}>
     <form className="app_signup">
     <center> 
       <img className="app-logo"
       src={logo}
       alt=""
       />
     </center>
     <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
     />
     <Input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
     />
     <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
     />
     <Button onClick={signUp}>Sign Up</Button>
     </form>
     </div>
     </Modal>
     <Modal open={openSignIn} onClose={()=>setOpenSignIn(false)}>
     <div style={modalStyle} className={classes.paper}>
     <form className="app_signup">
     <center> 
       <img className="app-logo"
       src={logo}
       alt=""
       />
     </center>
     <Input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
     />
     <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
     />
     <Button onClick={signIn}>Sign Ip</Button>
     </form>
     </div>
     </Modal>
     <div className="app_header">
       <img src={logo} className='app-logo' alt='logo'/>
       <h1 className='appName'>MyInsta</h1>
     </div>
     {
       user ? (
        <Button onClick={()=>auth.signOut()}>Logout</Button>
       ):(
        <div className="app_loginContainer">
        <Button onClick={()=>setOpenSignIn(true)}>Sign In</Button>
        <Button onClick={()=>setOpen(true)}>Sign Up</Button>
        </div>
       )
     } 
     {
       posts.map(({id,post}) =>(
         <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
       ))
     }
    
    </div>
  );
}

export default App;
