import React from "react";

const AccountResume = (props) => {
	const { title, amount, amountDescription, mock } = props;

	return (
		<section className="account">
			<div className="account-content-wrapper">
				<h3 className="account-title">{title}</h3>
				<p className="account-amount">{amount}</p>
				<p className="account-amount-description">{amountDescription}</p>
			</div>
			<div className="account-content-wrapper cta">
				{!mock ? (
					<button className="transaction-button">View transactions</button>
				) : (
					<button className="transaction-button">...</button>
				)}
			</div>
		</section>
	);
};

export default AccountResume;
