import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import { TabContent, TabPane, } from 'reactstrap';
import classnames from 'classnames';

const CompleteLink = () =>{
	return(
		<Link to={"#"} className="btn-link text-success float-right" >Completed</Link>
	)
}
const CanceleLink = () =>{
	return(
		<Link to={"#"} className="btn-link text-danger float-right" >Canceled</Link>
	)
}
const PendingLink = () =>{
	return(
		<Link to={"#"} className="btn-link text-light float-right" >Pending</Link>
	)
}
const Downarrow = () =>{
	return(
		<>
			<span>
				<svg width="63" height="63" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect width="63" height="63" rx="14" fill="#625794"/>
					<path d="M37.2692 38.9908L37.2692 38.9908L32.3961 43.8874C32.3934 43.8902 32.3909 43.8927 32.3885 43.895M37.2692 38.9908L32.0389 43.5375L32.3918 43.8917C32.3825 43.9009 32.3749 43.9078 32.3716 43.9107L32.3705 43.9117C32.373 43.9095 32.3796 43.9036 32.3877 43.8957C32.388 43.8955 32.3883 43.8952 32.3885 43.895M37.2692 38.9908C37.8291 38.4281 37.827 37.5179 37.2643 36.9578C36.7016 36.3978 35.7914 36.3999 35.2314 36.9626L35.2313 36.9627L32.8127 39.393M37.2692 38.9908L32.8127 39.393M32.3885 43.895C31.8292 44.4509 30.9226 44.4526 30.3615 43.8946C30.3603 43.8934 30.3591 43.8922 30.3578 43.8909L30.3563 43.8894L30.3442 43.8773L25.4813 38.9908L25.8357 38.6381L25.4813 38.9908C24.9215 38.4282 24.9234 37.518 25.4862 36.9578C26.049 36.3978 26.9591 36.4 27.5191 36.9627L27.5192 36.9627L29.9377 39.393L29.9377 20.75C29.9377 19.9561 30.5813 19.3125 31.3752 19.3125C32.1692 19.3125 32.8127 19.9561 32.8127 20.75L32.8127 39.393M32.3885 43.895C32.39 43.8935 32.3914 43.8921 32.3928 43.8907L32.8127 39.393M30.3577 43.8908C30.3573 43.8903 30.3568 43.8899 30.3564 43.8894L30.3577 43.8908Z" fill="white" stroke="white"/>
				</svg>
			</span>
		</>
	)
}
const Uparrow = () =>{
	return(
		<>
			<span>
				<svg width="63" height="63" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect width="63" height="63" rx="14" fill="#625794"/>
					<path d="M25.4813 24.6343L25.4813 24.6343L30.3544 19.7376C30.3571 19.7348 30.3596 19.7323 30.3619 19.7301M25.4813 24.6343L30.7116 20.0875L30.3587 19.7333C30.368 19.7241 30.3756 19.7172 30.3789 19.7143L30.38 19.7133C30.3775 19.7155 30.3709 19.7214 30.3627 19.7293C30.3625 19.7295 30.3622 19.7298 30.3619 19.7301M25.4813 24.6343C24.9214 25.197 24.9234 26.1071 25.4862 26.6672C26.0489 27.2273 26.9591 27.2251 27.5191 26.6624L27.5192 26.6624L29.9377 24.232M25.4813 24.6343L29.9377 24.232M30.3619 19.7301C30.9212 19.1741 31.8279 19.1724 32.389 19.7304C32.3902 19.7316 32.3914 19.7329 32.3927 19.7341L32.3941 19.7356L32.4062 19.7477L37.2691 24.6342L36.9147 24.9869L37.2692 24.6342C37.829 25.1968 37.8271 26.107 37.2642 26.6672C36.7015 27.2272 35.7914 27.225 35.2314 26.6623L35.2313 26.6623L32.8127 24.232L32.8127 42.875C32.8127 43.6689 32.1692 44.3125 31.3752 44.3125C30.5813 44.3125 29.9377 43.6689 29.9377 42.875L29.9377 24.232M30.3619 19.7301C30.3605 19.7315 30.3591 19.7329 30.3577 19.7343L29.9377 24.232M32.3927 19.7342C32.3932 19.7347 32.3937 19.7351 32.3941 19.7356L32.3927 19.7342Z" fill="white" stroke="white"/>
				</svg>
			</span>
		</>
	)
}

const activityBlog= [
	{arrow: <Uparrow />, 	title: 'Topup',		 price: '+$5,553', result: <CompleteLink /> },
	{arrow: <Downarrow />, 	title: 'Withdraw',   price: '-$6,342', result: <PendingLink />  },
	{arrow: <Downarrow />, 	title: 'Withdraw',   price: '-$912',   result: <CanceleLink />  },
	{arrow: <Uparrow />, 	title: 'Topup',      price: '+$7,762', result: <CompleteLink /> },
	{arrow: <Uparrow />, 	title: 'Topup',      price: '+$5,553', result: <CompleteLink /> },
	{arrow: <Downarrow />,  title: 'Withdraw',   price: '-$912',   result: <CanceleLink />  },
];
const activityBlog2= [
	{arrow: <Downarrow />, 	title: 'Withdraw',   price: '-$912',   result: <PendingLink /> },
	{arrow: <Downarrow />, 	title: 'Withdraw',   price: '-$6,342', result: <CanceleLink /> },
	{arrow: <Uparrow />, 	title: 'Topup',		 price: '+$5,553', result: <CompleteLink /> },
	{arrow: <Uparrow />, 	title: 'Topup',      price: '+$7,762', result: <CompleteLink /> },
	{arrow: <Uparrow />, 	title: 'Topup',      price: '+$5,553', result: <CompleteLink /> },
];
const activityBlog3= [
	{arrow: <Uparrow />, 	title: 'Topup',		 price: '+$7,762', result: <CompleteLink /> },
	{arrow: <Downarrow />, 	title: 'Withdraw',   price: '-$6,342', result: <CanceleLink /> },
	{arrow: <Uparrow />, 	title: 'Topup',      price: '+$5,553', result: <CompleteLink /> },
	{arrow: <Downarrow />, 	title: 'Withdraw',   price: '-$912',   result: <PendingLink /> },
];

const WalletTab = ({activeMenu }) => {
	const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
	return(
		<>
			<div className="card">
				<div className="card-header pb-2 d-block d-sm-flex flex-wrap border-0">
					<div className="mb-3">
						<h4 className="fs-20 text-black">{activeMenu}</h4>
						<p className="mb-0 fs-12">Lorem ipsum dolor sit amet, consectetur</p>
					</div>
					<div className="card-action card-tabs mb-3 style-1">
						<ul className="nav nav-tabs" role="tablist">
							<li className="nav-item"><Link to ={"#"} className= {classnames({ active : activeTab === '1'}) + ' nav-link'} onClick={() => { toggle('1'); }}>Monthly</Link></li>
							<li className="nav-item"><Link to ={"#"} className= {classnames({ active : activeTab === '2'}) + ' nav-link'} onClick={() => { toggle('2'); }}>Weekly</Link></li>
							<li className="nav-item"><Link to ={"#"} className= {classnames({ active : activeTab === '3'}) + ' nav-link'} onClick={() => { toggle('3'); }}>Today</Link></li>
						</ul>
					</div>
				</div>
				<div className="card-body tab-content p-0">
					<div className="tab-pane active show fade" id="monthly">
						<TabContent activeTab={activeTab}>
							<TabPane tabId="1">
								<div className="table-responsive">
									<table className="table shadow-hover card-table border-no tbl-btn short-one">
										<tbody>
											{activityBlog.map((data,index)=>(
												<tr key={index}>
													<td>{data.arrow}</td>
													<td><span className="font-w600 text-black">{data.title}</span></td>
													<td><span className="text-black">06:24:45 AM</span></td>
													<td><span className="font-w600 text-black">{data.price}</span></td>
													<td>{data.result}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</TabPane>
							<TabPane tabId="2">	
								<div className="table-responsive">
									<table className="table shadow-hover card-table border-no tbl-btn short-one">
										<tbody>
											{activityBlog2.map((data,index)=>(
												<tr key={index}>
													<td>{data.arrow}</td>
													<td><span className="font-w600 text-black">{data.title}</span></td>
													<td><span className="text-black">06:24:45 AM</span></td>
													<td><span className="font-w600 text-black">{data.price}</span></td>
													<td>{data.result}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</TabPane>	
							<TabPane tabId="3">
								<div className="table-responsive">
									<table className="table shadow-hover card-table border-no tbl-btn short-one">
										<tbody>
											{activityBlog3.map((data,index)=>(
												<tr key={index}>
													<td>{data.arrow}</td>
													<td><span className="font-w600 text-black">{data.title}</span></td>
													<td><span className="text-black">06:24:45 AM</span></td>
													<td><span className="font-w600 text-black">{data.price}</span></td>
													<td>{data.result}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</TabPane>
						</TabContent>
					</div>	
				</div>
				<div className="card-footer border-0 p-0 caret mt-1">
					<Link to={"./coin-details"} className="btn-link"><i className="fa fa-caret-down" aria-hidden="true"></i></Link>
				</div>
			</div>
		</>
	)
}
export default WalletTab;