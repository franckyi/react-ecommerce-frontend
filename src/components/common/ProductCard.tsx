import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import BasicButtonGroup from './ButtonGroup';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ProductCard(props) {
  const [value, setValue] = React.useState<number | null>(2);

  // MODAL
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal-box">
          <div className="col">
            <Typography id="modal-modal-title" sx={{ fontSize: 18, fontWeight: 800, maxWidth: '70%' }} component="h3">
              {props.item.title}
            </Typography>
            <img
              className="product-img"
              src={props.item.image}
              alt={props.item.title}
              height="350"
              draggable="false"
            />
          </div>
          <div className="col">
            <div className="rating">
              <Rating
                name="simple-controlled"
                value={props.item.rating.rate}
                size="small"
                precision={0.5}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
              <span>voted by {props.item.rating.count} users</span>
            </div>
            <p>Categories / <span className="label">{props.item.category}</span></p>
            <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: 14 }}>
              {props.item.description}
            </Typography>
            <Button size="small" color="primary" variant="contained">Add to cart</Button>
            <img
              src="payments.png"
              alt="Our payment methods"
              width="300"
              draggable="false"
            />
          </div>
        </Box>
      </Modal>

      <Card sx={{ maxWidth: 320 }} className='product-list__item'>
        <div onClick={handleOpen} className="product-list__upper-part-modal">
          <CardMedia
            component="img"
            alt={props.item.title}
            height="220"
            image={props.item.image}
          />
          <CardContent className='product-list__item--content'>
            <Typography gutterBottom variant="span" component="div" className='product-list__item--title'>
              {props.item.title}
            </Typography>
            <div className='product-list__rating-price'>
              <Rating
                name="simple-controlled"
                value={props.item.rating.rate}
                size="small"
                precision={0.5}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
              <Typography gutterBottom variant="span" component="div" className='product-list__item--price'>
                $ {props.item.price}
              </Typography>
            </div>
          </CardContent>
        </div>
        <CardActions className='product-list__item--cta'>
          <BasicButtonGroup />
          <Button size="small" color="primary" variant="outlined">Add to cart</Button>
        </CardActions>
      </Card>
    </>
  );
}