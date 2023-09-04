import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { Badge, Button, IconButton } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useCart } from '../context/cartContext';
import { CartItem } from './CartItem';
import { Product } from '../types/product';

type CartProps = {
    allProducts: Product[]
}

export default function Cart(props: CartProps) {
    const { allProducts } = props;
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const { cartItems, totalQuantity } = useCart();

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: 450, padding: '20px' }}
            role="presentation"
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Button onClick={toggleDrawer(anchor, false)} variant="outlined" color="primary" sx={{ marginBottom: '20px' }}>Close</Button>
            <List>
                {cartItems.map(item => {
                    return <CartItem currentItem={item} allProducts={allProducts} />
                })}
            </List>
            <Divider sx={{ margin: '40px 0' }} />
            <Button variant="contained" color="primary" sx={{ marginTop: '20px' }}>Checkout</Button>
        </Box>
    );

    return (
        <div className="cart">
            {(['right'] as const).map((anchor) => (
                <React.Fragment key={anchor}>
                    <IconButton
                        onClick={toggleDrawer(anchor, true)}
                        size="large"
                        aria-label="new notifications"
                        color="inherit"
                    >
                        <Badge badgeContent={totalQuantity > 0 ? totalQuantity : '0'} color="error">
                            <ShoppingCartOutlinedIcon />
                        </Badge>
                    </IconButton>

                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}