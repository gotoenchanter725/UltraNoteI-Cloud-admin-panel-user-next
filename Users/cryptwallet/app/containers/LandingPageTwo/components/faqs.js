import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemButton
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import faq from 'images/landing/faq.png'

const faqs = [
    {
        id: '1',
        title: '01. What are the advantages of purchasing a website template?',
        text: 'The major advantage is price: You get a high quality design for just $20-$70. You don’t have to hire a web designer or web design studio. Second advantage is time frame: It usually takes 5-15 days for a good '
    },
    {
        id: '2',
        title: '02. What are the advantages of purchasing a website template?',
        text: 'The major advantage is price: You get a high quality design for just $20-$70. You don’t have to hire a web designer or web design studio. Second advantage is time frame: It usually takes 5-15 days for a good '
    },
    {
        id: '3',
        title: '03. What are the advantages of purchasing a website template?',
        text: 'The major advantage is price: You get a high quality design for just $20-$70. You don’t have to hire a web designer or web design studio. Second advantage is time frame: It usually takes 5-15 days for a good '
    },
    {
        id: '4',
        title: '04. What are the advantages of purchasing a website template?',
        text: 'The major advantage is price: You get a high quality design for just $20-$70. You don’t have to hire a web designer or web design studio. Second advantage is time frame: It usually takes 5-15 days for a good '
    },
]

class LandingPageFaq extends Component {
    render() {
        return (
            <Grid className="landingPageFaqArea" >
                <Grid
                    container
                    spacing={32}
                    className="container">
                    <Grid item lg={3}></Grid>
                    <Grid item lg={6}>
                        <Grid className="landingSectionTitle">
                            <h2>Frequently Asked Question</h2>
                            <p>ICO seemed to float in the middle of an immense dark sphere, whose upper half was strewn with silver.</p>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid className="faqWrapper">
                            <Grid
                                container
                                alignItems="center"
                                spacing={32}>
                                <Grid item lg={6} xs={12}>
                                    <Accordion
                                        preExpanded={['1']}>
                                        {faqs.map((faq, i) => (
                                            <AccordionItem
                                                uuid={faq.id}
                                                key={i}>
                                                <AccordionItemHeading
                                                >
                                                    <AccordionItemButton>
                                                        {faq.title}
                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                <AccordionItemPanel>
                                                    <p>{faq.text}</p>
                                                </AccordionItemPanel>
                                            </AccordionItem>
                                        ))}

                                    </Accordion>
                                </Grid>
                                <Grid item lg={6} xs={12}>
                                    <Grid className="faqImage">
                                        <img src={faq} alt="" />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid >
        )
    }
}
export default LandingPageFaq