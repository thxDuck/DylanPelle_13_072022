import styles from "../../styles/loader.css";

const createBars = (color) => {
	const barsArray = [...Array(12)];
	return barsArray.map((_, index) => {
		return (
			<div key={index}>
				<div className="div-after" style={{ background: color }}></div>
			</div>
		);
	});
};

const Loader = ({ color = "#7f58af" }) => {
	const bars = createBars(color);
	return (
		<div className="loading">
			<div className="lds-spinner">{bars}</div>;
		</div>
	);
};

export default Loader;
