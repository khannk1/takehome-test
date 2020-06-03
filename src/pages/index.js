import React, { useState } from "react";
import Layout from "../components/Layout";
import AgGridComponent from "../components/AgGridComponent";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgChartsReact } from "ag-charts-react";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";

const GET_FAMILY_DATA = gql`
	query allFamilies {
		allFamilies {
			id
			data
		}
	}
`;

const index = () => {
	const { loading, data, error } = useQuery(GET_FAMILY_DATA);
	// Ensure data was loaded
	if (loading) return <div>Loading family data...</div>;
	if (error) {
		console.error(error);
		return <div>Something went wrong loading family data.</div>;
	}
	if (data.allFamilies.length <= 0) return <div>No families found. (You'll need to create one with the management script first)</div>;

	// Row data used for the table (will display row data or nothing if data.rows does not exist yet)
	const [rowData, setrowData] = useState(data.allFamilies[data.allFamilies.length - 1].data.rows || []);

	// monthly payment, lump sum payment and interest rate should use this custom styling in tableColumns
	const customStyle = (params) => {
		if (!params.data.edited) return null;

		// You can go off of these params for styling and then set textColour depending on certain criteria
		// Note: by default this changes the colour for ALL cells in the column, so you need to figure out how to target a specific cell
		// hint: maybe something in the params.colDef can link up to the metaData?
		//console.log(params);

		const textColour = "#20ad15";

		return {
			color: textColour,
		};
	};

	// Column definitions for the table
	const tableColumns = [];

	// Default column definitions for the table (applied to all columns)
	const defaultColumnInformation = {
		editable: false,
		sortable: false,
		minWidth: 220,
		flex: 1,
		resizable: false,
		cellClass: "text-center",
	};

	const gridOptions = {
		suppressMovableColumns: true,
	};

	return (
		<Layout>
			<div className="ag-theme-alpine" style={{ height: "600px" }}>
				<AgGridComponent rowData={rowData} columnDefs={tableColumns} defaultColDefs={defaultColumnInformation} gridOptions={gridOptions} />
			</div>
		</Layout>
	);
};

export default index;
