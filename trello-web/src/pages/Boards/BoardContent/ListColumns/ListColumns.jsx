import Box from "@mui/material/Box";
import Column from "./Column/Column";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
function ListColumns({ columns }) {
	return (
		<Box
			sx={{
				color: "inherit",
				width: "100%",
				height: "100%",
				overflowY: "hidden",
				overflowX: "auto",
				display: "flex",
				"&::-webkit-scrollbar-track": {
					m: 2,
				},
			}}
		>
			{columns?.map((column) => {
				return <Column key={column._id} column={column} />;
			})}

			{/* Add new column */}
			<Box
				sx={{
					minWidth: "200px",
					maxWidth: "200px",
					mx: 2,
					borderRadius: "6px",
					height: "fit-content",
					bgcolor: "#ffffff3d",
				}}
			>
				<Button
					sx={{
						color: "white",
						width: "100%",
						justifyContent: "flex-start",
						pl: 2.5,
						py: 1,
					}}
					startIcon={<AddBoxIcon />}
				>
					Add new column
				</Button>
			</Box>
		</Box>
	);
}

export default ListColumns;
