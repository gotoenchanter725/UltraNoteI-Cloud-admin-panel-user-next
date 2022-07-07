import React from 'react'
import { Grid, Typography, List, Link, ListItem } from '@material-ui/core'

const FooterMenu = ({ title, footerMenu }) => {
    return (
        <Grid item sm={4}>
            <Grid className="footerMenu">
                <Typography variant="h3">{title}</Typography>
                <List>
                    {footerMenu.map((footer, i) => (
                        <ListItem key={i}>
                            <Link href={footer.link}>{footer.menu}</Link>
                        </ListItem>
                    ))}
                </List>
            </Grid>
        </Grid>
    )
}
export default FooterMenu
