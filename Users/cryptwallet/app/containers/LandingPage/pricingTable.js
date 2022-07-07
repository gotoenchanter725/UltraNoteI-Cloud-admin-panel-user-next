import React from 'react'
import Rating from 'react-rating'

import Image from 'components/uiStyle/Images';

import starFull from 'images/star-full.svg';
import starEmty from 'images/star.svg';

import { Grid, Typography, List, ListItem, Button } from '@material-ui/core'

const PricingTable = ({ image, title, rating, ratingCount, pricingList, button }) => {
    return (
        <Grid item sm={6} xs={12}>
            <Grid className="pricingTableWrap">
                <Image src={image} />
                <Typography variant="h3">{title}</Typography>
                <Grid className="ratingStyle">
                    <Rating
                        className="ratingWrap"
                        emptySymbol={<Image src={starEmty} alt="rating" />}
                        fullSymbol={<Image src={starFull} alt="rating" />}
                        initialRating={rating}
                        fractions={5}
                    />
                    <Typography paragraph>{ratingCount}</Typography>
                </Grid>
                <List className="listItem">
                    {pricingList.map((price, i) => (
                        <ListItem key={i}>{price.left} <Typography component="span">{price.right}</Typography></ListItem>
                    ))}
                </List>
                <Button className="downloadBtn">{button}</Button>
            </Grid>
        </Grid>
    )
}
export default PricingTable
