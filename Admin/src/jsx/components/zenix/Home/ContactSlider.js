import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import contacts1 from "../../../../images/contacts/Untitled-1.jpg";
import contacts2 from "../../../../images/contacts/Untitled-2.jpg";
import contacts3 from "../../../../images/contacts/Untitled-3.jpg";
import contacts4 from "../../../../images/contacts/Untitled-4.jpg";
import contacts5 from "../../../../images/contacts/Untitled-5.jpg";

const contactBlog = [
	{image: contacts1,  title: 'Cindy',  mail: '@sam224',},
	{image: contacts2,  title: 'Samuel', mail: '@cindyss',},
	{image: contacts3,  title: 'Olivia', mail: '@davidxc',},
	{image: contacts4,  title: 'Martha', mail: '@marthaa',},
	{image: contacts5,  title: 'David',  mail: '@oliv62',},
	{image: contacts2,  title: 'Samuel', mail: '@cindyss',},
];

const ContactSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1601,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
		{ contactBlog.map((item,index)=>(
			<div className="items" key={index}>
				<div className="text-center">
					<img className="mb-3 rounded" src={item.image} alt="" />
					<h5 className="mb-0"><a className="text-black" href="javascript:void(0);">{item.title}</a></h5>
					<span className="fs-12">{item.mail}</span>
				</div>
			</div>
		))}
    </Slider>
  );
};

export default ContactSlider;
