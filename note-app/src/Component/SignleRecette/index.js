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
import {useNavigate, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { deleteRecette, getAllRecettes, getRecette } from '../../features/recette/recetteSlice';
import moment from 'moment'
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

export default function SingleRecette() {
  const [expanded, setExpanded] = React.useState(false);
  const {id} = useParams()
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const dispatch = useDispatch()
React.useEffect(()=>{
dispatch(getRecette(id))
},[dispatch,id])
const recetteState = useSelector(state=>state?.recette?.oneRecette)
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
const[open,setOpen] = React.useState(false)
const showModal = ()=>{
  setOpen(true)
}
const closeModal=()=>{
  setOpen(false)
}
  return (<div className='container'>

<Card sx={{ maxWidth: '80%' }}>
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
    <li><a className="dropdown-item" href="#">Another action</a></li>
    <li><a className="dropdown-item" href="#">Something else here</a></li>
  </ul>
          </IconButton>
        }
        title={user?.fullname}
        subheader={moment(recetteState?.createdAt).format('YYYY-MM-DD h:mm A').toLocaleString()}
      />
      <CardMedia
        component="img"
        height={`${recetteState?.images[0] ? '350' : '0'}`}
        image={recetteState?.images[0] ? recetteState?.images[0].url : ''}
       
        style={{objectFit:'cover'}}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary"  dangerouslySetInnerHTML={{__html:`${recetteState?.description}`}}>
       
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
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
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>See Moore:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    {open && <ModalConfirm showModal={showModal} handleDelete={()=>{handleDelete(id)}} closeModal={closeModal}/>}
  </div>
  );
}