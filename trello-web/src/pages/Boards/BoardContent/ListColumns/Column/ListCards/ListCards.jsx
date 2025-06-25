import Box from "@mui/material/Box";
import TrelloCard from "./Card/Card";
function ListCards() {
	return (
		<Box
			sx={{
				p: "0 5px",
				margin: "0 5px",
				display: "flex",
				flexDirection: "column",
				gap: 1,
				overflowX: "hidden",
				overflowY: "auto",
				maxHeight: (theme) => `calc(
					${theme.trello.boardContentHeight} - 
					${theme.trello.COLUMN_HEADER_HEIGHT} - 
					${theme.trello.COLUMN_FOOTER_HEIGHT} - 
					${theme.spacing(5)}
				)`,
				"&::-webkit-scrollbar-thumb": {
					backgroundColor: "#ced0da",
				},
				"&::-webkit-scrollbar-thumb:hover": {
					backgroundColor: "#bfc2cf",
				},
			}}
		>
			<TrelloCard />
			<TrelloCard temporaryHideMedia />
			<TrelloCard temporaryHideMedia />
		</Box>
	);
}

export default ListCards;
