import React,{Fragment,useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {ArrowUp,ArrowDown, CoinIcon1, CoinIcon2, CoinIcon3, CoinIcon4	} from "../zenix/Transactions/TableData";
// images
import table1 from "../../../images/table/Untitled-1.jpg";
import table2 from "../../../images/table/Untitled-2.jpg";
import table3 from "../../../images/table/Untitled-3.jpg";
import table4 from "../../../images/table/Untitled-4.jpg";


const Transactions = () => {
	const [data, setData] = useState( document.querySelectorAll("#transaction_table tbody tr"));
	const [activeName, setActiveName] = useState("Newest");
	const sort = 8;
	const activePag = useRef(0);
	const [test, settest] = useState(0);

	  // Active data
	const chageData = (frist, sec) => {
		for (var i = 0; i < data.length; ++i) {
			 if (i >= frist && i < sec) {
				data[i].classList.remove("d-none");
			} else {
				data[i].classList.add("d-none");
			}
		}
	};
	  // use effect
	useEffect(() => {
		setData(document.querySelectorAll("#transaction_table tbody tr"));
	}, [test]);

	// Active pagginarion
		activePag.current === 0 && chageData(0, sort);
	// paggination
		let paggination = Array(Math.ceil(data.length / sort))
			.fill()
			.map((_, i) => i + 1);

	  // Active paggination & chage data
	const onClick = (i) => {
		activePag.current = i;
		chageData(activePag.current * sort, (activePag.current + 1) * sort);
		settest(i);
	};
	return(
		<Fragment>
			<div className="form-head d-flex align-items-center flex-wrap mb-3">
				<h2 className="font-w600 mb-0 text-black">My Wallet</h2>
				<Link to={"#"} className="btn btn-outline-secondary ml-auto"><i className="las la-calendar scale5 mr-2"></i>Filter Periode</Link>
			</div>
			<div className="row">
				<div className="col-xl-12">
					<div className="table-responsive table-hover fs-14">
						<div id="example5_wrapper" className="dataTables_wrapper no-footer">
							<table className="table display mb-4 dataTablesCard short-one card-table text-black dataTable no-footer" id="transaction_table"
								role="grid" aria-describedby="example5_info">
								<thead>
									<tr role="row">
										<th className="sorting_asc">
											<div className="checkbox mr-0 align-self-center">
												<div className="custom-control custom-checkbox ">
													<input type="checkbox" className="custom-control-input" id="checkAll" required/>
													<label className="custom-control-label" htmlFor="checkAll"/>
												</div>
											</div>
										</th>
										<th className="sorting" tabIndex={0} aria-controls="example5" rowSpan={1} colSpan={1} 
											aria-label="Transaction ID: activate to sort column ascending" style={{ width: 124 }}> Transaction ID
										</th>
										<th className="sorting" tabIndex={0} aria-controls="example5" rowSpan={1} colSpan={1} 
											aria-label="Date: activate to sort column ascending" style={{ width: "54.6667px" }}>Date
										</th>
										<th className="sorting" tabIndex={0} aria-controls="example5" rowSpan={1} colSpan={1} 
											aria-label="From: activate to sort column ascending" style={{ width: 62 }}>From
										</th>
										<th className="sorting" tabIndex={0} aria-controls="example5" rowSpan={1} colSpan={1} 
											aria-label="To: activate to sort column ascending" style={{ width: 110 }}> To
										</th>
										<th className="sorting" tabIndex={0} aria-controls="example5" rowSpan={1} colSpan={1} 
											aria-label="Coin: activate to sort column ascending"style={{ width: 94 }}>Coin
										</th>
										<th className="sorting" tabIndex={0} aria-controls="example5" rowSpan={1} colSpan={1} 
											aria-label="Amount: activate to sort column ascending" style={{ width: "58.6667px" }}>Amount
										</th>
										<th className="sorting" tabIndex={0} aria-controls="example5" rowSpan={1} colSpan={1} 
											aria-label="Note: activate to sort column ascending"style={{ width: "143.333px" }}>Note
										</th>
										<th className="sorting" tabIndex={0} aria-controls="example5" rowSpan={1} colSpan={1} 
											aria-label="Status: activate to sort column ascending"style={{ width: "99.6667px" }}>Status
										</th>
									</tr>
								</thead>
								<tbody>
									<tr role="row" className="odd">
										<td className="pr-0 sorting_1"><ArrowUp /></td>
										<td>#12415346563475</td>
										<td>2/5/2020 06:24 AM</td>
										<td>Marquezz</td>
										<td><div className="d-flex align-items-center"><img src={table1} alt="" className="rounded-circle mr-2 width40 height40"/><span>Samuel</span></div></td>
										<td className="wspace-no"><CoinIcon4 /></td>
										<td><span className="text-black font-w600">+$5,553</span></td>
										<td><p className="mb-0 wspace-no"> Lorem ipsum dol</p></td>
										<td><Link to="/transactions" className="btn-link text-danger float-right">CANCELED</Link></td>
									</tr>
									<tr role="row" className="even">
										<td className="pr-0 sorting_1"><ArrowDown /></td>
										<td>#987654123564892</td>
										<td>2/5/2020 06:24 AM</td>
										<td>Marquezz</td>
										<td><div className="d-flex align-items-center"><img src={table2} alt="" className="rounded-circle mr-2 width40 height40"/><span>Cindy</span></div></td>
										<td className="wspace-no"><CoinIcon2 /></td>
										<td><span className="text-black font-w700">-$12,768</span></td>
										<td><p className="mb-0 wspace-no">Lorem ipsum dol</p></td>
										<td><Link to="/transactions" className="btn-link text-success float-right">COMPLETED</Link></td>
									</tr>
									<tr role="row" className="odd">
										<td className="pr-0 sorting_1"><ArrowDown /></td>
										<td>#124153465125511</td>
										<td>2/5/2020 06:24 AM</td>
										<td>Marquezz</td>
										<td><div className="d-flex align-items-center"><img src={table3} alt="" className="rounded-circle mr-2 width40 height40"/><span>Marquezz</span></div></td>
										<td className="wspace-no"><CoinIcon1 /></td>
										<td> <span className="text-black font-w700">-$455</span></td>
										<td><p className="mb-0"> Lorem ipsum dol</p></td>
										<td> <Link to="/transactions" className="btn-link text-success float-right">COMPLETED</Link></td>
									</tr>
									<tr role="row" className="even">
										<td className="pr-0 sorting_1"><ArrowUp /></td>
										<td>#987654123564892</td>
										<td>2/5/2020 06:24 AM</td>
										<td>Marquezz</td>
										<td><div className="d-flex align-items-center"><img src={table1} alt="" className="rounded-circle mr-2 width40 height40" /> <span>David</span></div></td>
										<td className="wspace-no"> <CoinIcon3 /></td>
										<td><span className="text-black font-w700">+$5,553</span></td>
										<td><p className="mb-0">None</p></td>
										<td> <Link to="/transactions" className="btn-link text-light float-right">PENDING</Link></td>
									</tr>
									<tr role="row" className="odd">
										<td className="pr-0 sorting_1"><ArrowDown /></td>
										<td>#12415346563475</td>
										<td>2/5/2020 06:24 AM</td>
										<td>Thomas</td>
										<td><div className="d-flex align-items-center"><img src={table1} alt="" className="rounded-circle mr-2 width40 height40"/><span>Cindy</span></div></td>
										<td className="wspace-no"><CoinIcon4 /></td>
										<td><span className="text-black font-w700">+$5,553</span></td>
										<td><p className="mb-0">Lorem ipsum dol</p></td>
										<td><Link to="/transactions" className="btn-link text-success float-right">COMPLETED</Link></td>
									</tr>
									<tr role="row" className="even">
										<td className="pr-0 sorting_1"><ArrowUp /></td>
										<td>#987654123564892</td>
										<td>2/5/2020 06:24 AM</td>
										<td>Marquezz</td>
										<td><div className="d-flex align-items-center"><img src={table2} alt="" className="rounded-circle mr-2 width40 height40"/><span>Samuel</span></div></td>
										<td className="wspace-no"><CoinIcon2 /></td>
										<td><span className="text-black font-w700">-$12,768</span></td>
										<td><p className="mb-0 ">None</p></td>
										<td><Link to="/transactions" className="btn-link  float-right"> PENDING</Link></td>
									</tr>
									<tr role="row" className="odd">
										<td className="pr-0 sorting_1"><ArrowDown /></td>
										<td>#124153465125511</td>
										<td>2/5/2020 06:24 AM</td>
										<td>Marquezz</td>
										<td><div className="d-flex align-items-center"><img src={table3} alt="" className="rounded-circle mr-2 width40 height40"/><span>Samuel</span></div></td>
										<td className="wspace-no"> <CoinIcon1 /></td>
										<td><span className="text-black font-w700">-$455</span></td>
										<td><p className="mb-0">Lorem ipsum dol</p></td>
										<td><Link to="/transactions" className="btn-link text-danger float-right">CANCELED</Link></td>
									</tr>
									<tr role="row" className="odd">
										<td className="pr-0 sorting_1"><ArrowDown /></td>
										<td>#987654123564892</td>
										<td>2/5/2020 06:24 AM</td>
										<td>Marquezz</td>
										<td><div className="d-flex align-items-center"><img src={table3} alt="" className="rounded-circle mr-2 width40 height40"/><span>David</span></div></td>
										<td className="wspace-no"> <CoinIcon4 /></td>
										<td><span className="text-black font-w700">-$455</span></td>
										<td><p className="mb-0">Lorem ipsum dol</p></td>
										<td><Link to="/transactions" className="btn-link text-light float-right">PENDING</Link></td>
									</tr>
								  
									<tr role="row" className="odd">
										<td className="pr-0 sorting_1"><ArrowUp /></td>
										<td>#12415346563475</td>
										<td>2/5/2020 06:24 AM</td>
										<td>Marquezz</td>
										<td><div className="d-flex align-items-center"><img src={table1} alt="" className="rounded-circle mr-2 width40 height40"/><span>Lucyana</span></div></td>
										<td className="wspace-no"><CoinIcon4 /></td>
										<td><span className="text-black font-w700">+$5,553</span></td>
										<td><p className="mb-0">Lorem ipsum dol</p></td>
										<td><Link to="/transactions" className="btn-link text-success float-right"> COMPLETED</Link></td>
									</tr>
									<tr role="row" className="even">
										<td className="pr-0 sorting_1"><ArrowDown /></td>
										<td>#987654123564892</td>
										<td>2/5/2020 06:24 AM</td>
										<td>Marquezz</td>
										<td><div className="d-flex align-items-center"><img src={table2} alt="" className="rounded-circle mr-2 width40 height40"/><span>Cindy</span></div></td>
										<td className="wspace-no"><CoinIcon3 /></td>
										<td><span className="text-black font-w700">-$12,768</span></td>
										<td><p className="mb-0 text-dark">Lorem ipsum dol</p></td>
										<td><Link to="/transactions" className="btn-link text-success float-right">COMPLETED</Link></td>
									</tr>
									<tr role="row" className="odd">
										<td><ArrowUp /></td>
										<td>#12415346563475</td>
										<td>2/5/2020 06:24 AM</td>
										<td>Marquezz</td>
										<td><div className="d-flex align-items-center"><img src={table1} alt="" className="rounded-circle mr-2 width40 height40"/><span>Lucyana</span></div></td>
										<td className="wspace-no"><CoinIcon4 /></td>
										<td><span className="text-black font-w700">+$5,553</span></td>
										<td><p className="mb-0">Lorem ipsum dol</p></td>
										<td><Link to="/transactions" className="btn-link text-success float-right">COMPLETED</Link></td>
									</tr>
								</tbody>
							</table>
							<div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
								<div className="dataTables_info">
									Showing {activePag.current * sort + 1} to{" "}
									{data.length > (activePag.current + 1) * sort
									? (activePag.current + 1) * sort
									: data.length}{" "}
									of {data.length} entries
								</div>
								<div className="dataTables_paginate paging_simple_numbers" id="example5_paginate">
									<Link className="paginate_button previous disabled" to="/transactions" onClick={() => activePag.current > 0 && onClick(activePag.current - 1)}>
										Previous
									</Link>
									<span>
										{paggination.map((number, i) => (
											<Link key={i} to="/transactions" className={`paginate_button  ${ activePag.current === i ? "current" : ""} `} 
												onClick={() => onClick(i)}style={{ display: "inline-block" }}>{number}
											</Link>
										))}
									</span>
									<Link className="paginate_button next" to="/transactions" onClick={() => activePag.current + 1 < paggination.length && onClick(activePag.current + 1)}>
										Next
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	)
} 
export default Transactions;