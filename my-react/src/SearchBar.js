import React from "react";

class SearchBar extends React.Component {
	render() {
		return (
			<div className="SearchBar">
				<input type="text" />
				<p><input type="checkbox" />Only show products in stock</p>
			</div>
		)
	}
}

export default SearchBar;