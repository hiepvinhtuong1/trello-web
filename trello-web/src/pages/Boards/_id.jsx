import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import {
	fetchBoardDetailsAPI,
	createNewColumnAPI,
	createNewCardAPI,
	updateBoardDetailsAPI,
	updateColumnDetailsAPI,
	moveCardToDifferentColumnAPI,
} from "~/apis";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { generatePlaceholderCard } from "~/utils/formatters";
import { mapOrder } from "~/utils/sort";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
function Board() {
	const [board, setBoard] = useState(null);
	useEffect(() => {
		const boardId = "68969d1ab185bde35adf80c4";
		fetchBoardDetailsAPI(boardId).then((board) => {
			board.columns = mapOrder(
				board?.columns,
				board?.columnOrderIds,
				"_id"
			);

			board.columns.forEach((column) => {
				if (isEmpty(column.cards)) {
					column.cards = [generatePlaceholderCard(column)];
					column.cardOrderIds = [generatePlaceholderCard(column)._id];
					mapOrder(column?.cards, column?.cardOrderIds, "_id");
				}
			});
			setBoard(board);
		});
	}, []);

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
			if (columnToUpdate.cards.some((card) => card.FE_PlaceholderCard)) {
				columnToUpdate.cards = [cardCreated];
				columnToUpdate.cardOrderIds = [cardCreated._id


























































































































































































































































					webkitURL 
				];
			}
			columnToUpdate.cards.push(cardCreated);
			columnToUpdate.cardOrderIds.push(cardCreated._id);
		}
		setBoard(newBoard);
	};

	/**
	 * Func này có nhiệm vụ gọi API và xử lí khi kéo thả Column xong xuôi
	 * Chỉ cần gọi API để cập nhật mảng cardOrderIds của Column chứa nó (thay đổi vị trí trong mảng)
	 */
	const movieColumns = (dndOrderedColumns) => {
		//update cho chuẩn dữ liệu state board
		const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
		const newBoard = {
			...board,
		};
		newBoard.columns = dndOrderedColumns;
		newBoard.columnOrderIds = dndOrderedColumnsIds;

		setBoard(newBoard);

		//Gọi API update Board
		updateBoardDetailsAPI(newBoard._id, {
			columnOrderIds: newBoard.columnOrderIds,
		});
	};

	/**
	 * Khi di chuyển card trong cùng một column
	 * Chỉ cần gọi API để cập nhật mảng cardOrderIds của Column chứa nó (thay đổi vị trí trong mảng)
	 */
	const movieCardsInSameColumn = (
		dndOrderedCards,
		cardOrderIds,
		columnId
	) => {
		//update cho chuẩn dữ liệu state board
		const newBoard = {
			...board,
		};
		const columnToUpdate = newBoard.columns.find(
			(column) => column._id === columnId
		);
		if (columnToUpdate) {
			columnToUpdate.cards = dndOrderedCards;
			columnToUpdate.cardOrderIds = cardOrderIds;
		}
		setBoard(newBoard);

		// Gọi API
		updateColumnDetailsAPI(columnId, {
			cardOrderIds: cardOrderIds,
		});
	};

	/**
	 * Khi di chuyển card sang Column khác:
	 * B1: Cập nhật mảng cardOrderIds của Column ban đầu chứa nó (Hiểu đơn giản là xóa thằng card ra khỏi column đó)
	 * B2: Cập nhật mảng cardOrderIds của Column tiếp theo chưa nó (Hiểu đơn giản là thêm card vào column đó)
	 * B3: Cập nhật lại columnId của thằng card
	 */
	const moveCardToDifferentColumn = (
		currentCardId,
		prevColumnId,
		nextColumnId,
		dndOrderedColumns
	) => {
		//update lại cho chuẩn dữ liệu state board
		const dndOrderedColumnIds = dndOrderedColumns.map((c) => c._id);
		const newBoard = {
			...board,
		};
		newBoard.columns = dndOrderedColumns;
		newBoard.dndOrderedColumnIds = dndOrderedColumnIds;
		setBoard(newBoard);

		let prevCardOrderIds = dndOrderedColumns.find(
			(column) => column._id === prevColumnId
		)?.cardOrderIds;
		// Xử lí khi kéo card cuối cùng ra khỏi column
		if (prevCardOrderIds[0].includes("placeholder-card"))
			prevCardOrderIds = [];
		//Gọi API để xử lí
		moveCardToDifferentColumnAPI({
			currentCardId,
			prevColumnId,
			prevCardOrderIds: prevCardOrderIds,
			nextColumnId,
			nextCardOrderIds: dndOrderedColumns.find(
				(column) => column._id === nextColumnId
			)?.cardOrderIds,
		});
	};

	if (!board) {
		return (
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: 2,
					width: "100vw",
					height: "100vh",
				}}
			>
				<CircularProgress />
				<Typography>Loading Board ...</Typography>
			</Box>
		);
	}

	return (
		<Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
			<AppBar />
			<BoardBar board={board} />
			<BoardContent
				board={board}
				createNewColumn={createNewColumn}
				createNewCard={createNewCard}
				movieColumns={movieColumns}
				movieCardsInSameColumn={movieCardsInSameColumn}
				moveCardToDifferentColumn={moveCardToDifferentColumn}
			/>
		</Container>
	);
}

export default Board;
