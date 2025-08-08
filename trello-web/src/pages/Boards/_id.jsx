import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import {
	fetchBoardDetailsAPI,
	createNewColumnAPI,
	createNewCardAPI,
} from "~/apis";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { generatePlaceholderCard } from "~/utils/formatters";

function Board() {
	const [board, setBoard] = useState(null);
	useEffect(() => {
		const boardId = "689464aff1e067f8c3018e2b";
		fetchBoardDetailsAPI(boardId).then((board) => {
			setBoard(board);
		});
	}, []);

	console.log("Board details:", board);

	//Func này có nhiệm vụ gọi API tạo mới column và làm lại dữ liệu State Board
	const createNewColumn = async (column) => {
		const createdColumn = await createNewColumnAPI({
			boardId: board._id,
			...column,
		});
		if (isEmpty(createdColumn.cards)) {
			createdColumn.cards = [generatePlaceholderCard(createdColumn)];
			createdColumn.cardOrderIds = [
				generatePlaceholderCard(createdColumn)._id,
			];
		}
		// cập nhật lại dữ liệu board sau khi tạo mới column
		const newBoard = {
			...board,
		};
		newBoard.columns.push(createdColumn);
		newBoard.columnOrderIds.push(createdColumn._id);
		setBoard(newBoard);
	};

	//Func này có nhiệm vụ gọi API tạo mới card và làm lại dữ liệu State Board
	const createNewCard = async (card) => {
		const cardCreated = await createNewCardAPI({
			boardId: board._id,
			...card,
		});

		const newBoard = {
			...board,
		};
		const columnToUpdate = newBoard.columns.find(
			(column) => column._id === cardCreated.columnId
		);
		if (columnToUpdate) {
			columnToUpdate.cards.push(cardCreated);
			columnToUpdate.cardOrderIds.push(cardCreated._id);
		}
		setBoard(newBoard);
	};

	return (
		<Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
			<AppBar />
			<BoardBar board={board} />
			<BoardContent
				board={board}
				createNewColumn={createNewColumn}
				createNewCard={createNewCard}
			/>
		</Container>
	);
}

export default Board;
