// import React from 'react'
// import {useParams} from 'react-router-dom'
// const SingleRecette = () => {
//    const {id} = useParams()
//     return (
//         <div>
            
//         </div>
//     )
// }

// export default SingleRecette
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Link, useNavigate, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addRecetteToWishList, deleteRecette, getAllRecettes, getRecette } from '../../features/recette/recetteSlice';
import moment, { isDate } from 'moment'
import './style.css'
import { Modal } from '@mui/material';
import ModalConfirm from '../ModalConfirm';
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function SingleRecette({ isScreenSmall}) {
  const [expanded, setExpanded] = React.useState(false);
  const {id} = useParams()
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const dispatch = useDispatch()
React.useEffect(()=>{
dispatch(getRecette(id))

},[dispatch,id])
const recetteState = useSelector(state=>state?.recette?.onerecette)
const toogleState = useSelector(state=>state?.toogle?.darkMode)
const[img,setImg]=React.useState(null)
React.useEffect(()=>{
  const getImg = async()=>{
    await setImg(recetteState?.images && recetteState?.images[0].url)
  }
  getImg()
},[recetteState?.images])
const user = useSelector(state=>state?.auth?.user)
const navigate = useNavigate()
const handleDelete=(e)=>{
  console.log(e);
dispatch(deleteRecette(e))
setTimeout(()=>{
dispatch(getAllRecettes())
navigate('/myrecette/recette-list')
},1000)
}
const [liked , setIsLiked] = React.useState(false)
const[open,setOpen] = React.useState(false)
const showModal = ()=>{
  setOpen(true)
}
const closeModal=()=>{
  setOpen(false)
}
const stateWishList = useSelector(state=>state?.recette?.wishlist)
React.useEffect(()=>{
 const verifIsLiked  =  stateWishList?.whishlist?.find((item)=>(item === id))
  console.log(verifIsLiked)
  if(verifIsLiked ){
    setIsLiked(true)
  }else{
    setIsLiked(false)
  }
console.log(liked)
},[stateWishList,id,liked])
React.useEffect(()=>{
  const selectElement = document.querySelector('.css-prb6n8-MuiPaper-root-MuiCard-root');
  const selectElement2 = document.querySelector('.css-83ijpv-MuiTypography-root')
  const selectElement3 = document.querySelector('.css-r40f8v-MuiTypography-root')
  const selectElement4 = document.querySelector('.css-i4bv87-MuiSvgIcon-root')
 const selectElement5 = document.querySelector('.anticon')
 if(selectElement && selectElement2 && selectElement3 && selectElement4 && selectElement5 && toogleState===true){
  selectElement.style.background = "#001529"
  selectElement.style.color="white"
  selectElement2.style.color="white"
  selectElement3.style.color="white"
  selectElement4.style.color="white"
  selectElement5.style.color="white"

 }else if(selectElement && selectElement2 && selectElement3 && selectElement4 && selectElement5 && toogleState===false){
  selectElement.style.background = "white"
  selectElement.style.color="black"
  selectElement2.style.color="black"
  selectElement3.style.color="black"
  selectElement4.style.color="black"
  selectElement5.style.color="black"
  

 }
},[toogleState])
  return (<div className='container'>

<Card  sx={{ maxWidth: '100%' }}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            <img style={{objectFit:'contain'}} src={user?.pic} alt='' />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" className='dropdown bg-transparent'>
            <button className="btn btn-transparent border border-0 dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"><MoreVertIcon /></button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><button className="dropdown-item" onClick={()=>{
      setOpen(true)
      }} >Delete</button></li>
    <li><Link className="dropdown-item" to={`/myrecette/update/${id}`}>UPDATE</Link></li>
    <li><a className="dropdown-item" href="#">Something else here</a></li>
  </ul>
          </IconButton>
        }
        title={user?.fullname}
        subheader={moment(recetteState?.createdAt).format('YYYY-MM-DD h:mm A').toLocaleString()}
      />
      <CardMedia
        component="img"
         height={` ${img && img &&  isScreenSmall ? '200' : '300'}`}

          image={img ? img : ''}
       
        style={{objectFit:'cover'}}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary"  dangerouslySetInnerHTML={{__html:`${recetteState?.description}`}}>
       
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={()=>{ 
         
          dispatch(addRecetteToWishList(recetteState?._id))}}>
         {liked ? <FavoriteIcon  style={{color:"red",fontSize:'30px'}} /> : <FavoriteIcon  />} 
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
  
    </Card>
    {open && <ModalConfirm showModal={showModal} handleDelete={()=>{handleDelete(id)}} closeModal={closeModal}/>}
  </div>
  );
}