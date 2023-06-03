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
const RecetteCard = ({ item }) => {
  const navigate = useNavigate()
  let str = item?.description.slice(0,100)
  return (
    <Card sx={{ maxWidth: 345,height:max }} onClick={()=>navigate(`/myrecette/recette-details/${item?._id}`)}>
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
