import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import img from '../../images/patiss2.jpg'
import { useNavigate } from 'react-router-dom';
import { max } from 'moment';
import { useSelector } from 'react-redux';
const RecetteCard = ({ item }) => {
  const navigate = useNavigate()
  let str = item?.description.slice(0,100)
  const toogleState = useSelector(state=>state?.toogle?.darkMode)
  React.useEffect(()=>{
   const elements = document.querySelectorAll('.MuiPaper-root')
   const elements1=document.querySelectorAll('.css-r40f8v-MuiTypography-root')
   if(toogleState && elements){
    elements.forEach((elem)=>{
      elem.style.background = "#001529"
      elem.style.color="white"
    })
    elements1.forEach((elem1)=>{
      elem1.style.backgroundColor="#001529"
      elem1.style.color="white"
    })
      
   }
   else{
    elements.forEach((elem)=>{
      elem.style.background = "white"
      elem.style.color="black"
    })
    elements1.forEach((elem1)=>{
      elem1.style.backgroundColor="white"
      elem1.style.color="black"
    })

   }
  },[toogleState])
  const [isScreenSmall, setIsScreenSmall] = React.useState(false);

React.useEffect(() => {
  const handleResize = () => {
    const isSmall = window.matchMedia("(max-width: 600px)").matches;
    setIsScreenSmall(isSmall);
  };

  // Ajoute un écouteur d'événement pour détecter les changements de taille d'écran
  window.addEventListener("resize", handleResize);

  // Vérifie la taille de l'écran au chargement initial de la page
  handleResize();
  console.log(isScreenSmall)
  // Nettoie l'écouteur d'événement lorsque le composant est démonté
  return () => {
    window.removeEventListener("resize", handleResize);
  };

}, [isScreenSmall]);
  return (
    <Card className='col-sm-12' sx={{ maxWidth: isScreenSmall ? 345 :  345,height:max }} onClick={()=>navigate(`/myrecette/recette-details/${item?._id}`)}>
      <CardMedia
        sx={{ height: 140 }}
        image={item?.images[0]?.url}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item?.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{__html:`${str}`}}>
          
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    
    </Card>
  )
}

export default RecetteCard
