import React, { Component } from 'react'
import { Grid, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

// images 
import blog1 from 'images/landing/blog/img1.jpg'
import blog2 from 'images/landing/blog/img2.jpg'
import blog3 from 'images/landing/blog/img2.jpg'

const blogs = [
    {
        image: blog1,
        title: 'It is a long established fact that a reader most precious.',
        details: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.lapus orase hambela.'
    },
    {
        image: blog2,
        title: 'It is a long established fact that a reader most precious.',
        details: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.lapus orase hambela.'
    },
    {
        image: blog3,
        title: 'It is a long established fact that a reader most precious.',
        details: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.lapus orase hambela.'
    },
]

class LandingPageBlog extends Component {
    render() {
        return (
            <Grid className="landingPageBlogArea" id="blog">
                <Grid
                    container
                    spacing={32}
                    className="container">
                    <Grid item lg={3} xs={12}></Grid>
                    <Grid item lg={6} xs={12}>
                        <Grid className="landingSectionTitle">
                            <h2>Our Latest Article</h2>
                            <p>ICO seemed to float in the middle of an immense dark sphere, whose upper half was strewn with silver.</p>
                        </Grid>
                    </Grid>
                    {blogs.map((blog, i) => (
                        <Grid key={i} item lg={4} sm={6} xs={12}>
                            <Grid className="singleBlog">
                                <Grid className="blogThumb">
                                    <img src={blog.image} alt="image" />
                                </Grid>
                                <Grid className="blogContent">
                                    <h2><Link to="/blog">{blog.title}</Link> </h2>
                                    <p>{blog.details}</p>
                                    <Button>Read More <i className="fa fa-angle-right"></i></Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Grid >
        )
    }
}
export default LandingPageBlog