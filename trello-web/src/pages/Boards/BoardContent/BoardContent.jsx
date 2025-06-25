import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
function BoardContent() {
	return (
		<div>
			<Box
				sx={{
					bgcolor: (theme) =>
						theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
					with: "100%",
					height: (theme) => theme.trello.boardContentHeight,
					padding: "10px 0",
				}}
			>
				<ListColumns />
			</Box>
		</div>
	);
}

export default BoardContent;
