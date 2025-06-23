import Box from "@mui/material/Box";
function BoardContent() {
	return (
		<div>
			<Box
				sx={{
					backgroundColor: "primary.main",
					with: "100%",
					height: (theme) =>
						`calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
					display: "flex",
					alignItems: "center",
				}}
			>
				Board content
			</Box>
		</div>
	);
}

export default BoardContent;
