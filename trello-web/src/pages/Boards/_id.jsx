import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import { fetchBoardDetailsAPI } from "~/apis";
import { useEffect, useState } from "react";
function Board() {
	const [board, setBoard] = useState(null);
	useEffect(() => {
		const boardId = "68931465acb5b0cbd3d02415";
		fetchBoardDetailsAPI(boardId).then((board) => {
			setBoard(board);
		});
	}, []);
	return (
		<Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
			<AppBar />
			<BoardBar board={board} />
			<BoardContent board={board} />
		</Container>
	);
}

export default Board;
