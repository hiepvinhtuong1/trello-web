import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import {
	DndContext,
	PointerSensor,
	useSensor,
	useSensors,
	DragOverlay,
	defaultDropAnimationSideEffects,
	closestCorners,
	pointerWithin,
	rectIntersection,
	getFirstCollision,
} from "@dnd-kit/core";
import { MouseSensor, TouchSensor } from "~/customLibraries/DndKitSensors";
import { mapOrder } from "~/utils/sort";
import { generatePlaceholderCard } from "~/utils/formatters";

import { useEffect, useRef, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { cloneDeep, isEmpty } from "lodash";
import Column from "./ListColumns/Column/Column";
import TrelloCard from "./ListColumns/Column/ListCards/Card/Card";
import { useCallback } from "react";

const ACTIVE_DRAG_ITEM_TYPE = {
	COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
	CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

function BoardContent({ board, createNewColumn, createNewCard }) {
	const pointerSensor = useSensor(PointerSensor, {
		// Require the mouse to move by 10 pixels before activating
		activationConstraint: {
			distance: 10,
		},
	});

	const mouseSensor = useSensor(MouseSensor, {
		// Require the mouse to move by 10 pixels before activating
		activationConstraint: {
			distance: 10,
		},
	});

	// Nhấn giữ 250ms và dung sai của cảm ứng 500px thì mới kích hoạt event
	const touchSensor = useSensor(TouchSensor, {
		// Require the mouse to move by 10 pixels before activating
		activationConstraint: {
			delay: 250,
			tolerance: 500,
		},
	});

	// const mySensors = useSensors(pointerSensor);
	// ưu tiên sử dụng kết hợp 2 loại sensors là mouse và touch để có tải nghiệm trên mobile tốt nhất, không bị bug
	const mySensors = useSensors(mouseSensor, touchSensor);

	const [orderedColumns, setOrderedColumns] = useState([]);

	// Cùng một thời điểm chỉ có một column hoặc card được kéo thả
	const [activeDragItemId, setActiveDragItemId] = useState(null);
	const [activeDragItemType, setActiveDragItemType] = useState(null);
	const [activeDragItemData, setActiveDragItemData] = useState(null);
	const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
		useState(null);
	//Điểm va chạm cuối cùng (xử lý thuật toán phát hiện va chạm, video37)
	const lastOverId = useRef(null);

	useEffect(() => {
		setOrderedColumns(
			mapOrder(board?.columns, board?.columnOrderIds, "_id")
		);
	}, [board]);

	const findColumnByCardId = (cardId) => {
		// Đoạn này lưu ý, nên dùng c.cards thay vì c.cardOrderIds bởi vì ở bước handleDragOver chúng ta sẽ
		// làm dữ liêu cho cards hoàn chỉnh rồi mới tạo ra cardOrderIds mới
		return orderedColumns.find((column) =>
			column.cards.map((card) => card._id)?.includes(cardId)
		);
	};

	// Function chung xử lí việc cập nhật lại state trong trường hợp di chuyển giữa các columns khác nhau
	const moveCardBetweenDifferentColumns = (
		overColumn,
		overCardId,
		active,
		over,
		activeColumn,
		activeDraggingCardID,
		activeDraggingCardData
	) => {
		setOrderedColumns((prevColumns) => {
			// Tìm vị trí (index) của cái overCard trong colum đích (nơi activeCard sắp được thả)
			const overCardIndex = overColumn?.cards?.findIndex(
				(card) => card._id === overCardId
			);

			let newCardIndex;
			const isBelowOverItem =
				active.rect.current.translated &&
				active.rect.current.translated.top >
					over.rect.top + over.rect.height;
			const modifier = isBelowOverItem ? 1 : 0;
			newCardIndex =
				overCardIndex >= 0
					? overCardIndex + modifier
					: overColumn?.cards?.length + 1;

			// Clone mảng OrderedColumnsState cũ ra một cái mới để xử lý data rồi return - cập nhật lại OrderedColumnsState mới
			const nextColumns = cloneDeep(prevColumns);
			const nextActiveColumn = nextColumns.find(
				(column) => column._id === activeColumn._id
			);
			const nextOverColumn = nextColumns.find(
				(column) => column._id === overColumn._id
			);

			if (nextActiveColumn) {
				//Xóa card ở cái column active (cũng có thể hiểu là column cũ, cái lúc mà kéo card ra khỏi nó để sang column khác)
				nextActiveColumn.cards = nextActiveColumn?.cards.filter(
					(card) => card._id !== activeDraggingCardID
				);

				// thêm Placeholder Card nếu Column rỗng: bị kéo hết Card đi, không còn cái nào nữa
				if (isEmpty(nextActiveColumn?.cards)) {
					console.log("card cuoosi cung bi keo di");
					nextActiveColumn.cards = [
						generatePlaceholderCard(nextActiveColumn),
					];
				}

				// Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
				nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
					(card) => card._id
				);
			}

			if (nextOverColumn) {
				// Kiểm tra xem card đang kéo nó có tồn tại ở overColumn chưa, nếu có thì phải xóa nó trước
				nextOverColumn.cards = nextOverColumn?.cards.filter(
					(card) => card._id !== activeDraggingCardID
				);

				const rebuild_activeDraggingCardData = {
					...activeDraggingCardData,
					columnId: nextOverColumn._id,
				};
				// Thêm card đang kéo vào overColumn theo vị trí index mới
				nextOverColumn.cards = nextOverColumn.cards.toSpliced(
					newCardIndex,
					0,
					rebuild_activeDraggingCardData
				);

				// xóa Placeholder Card đi nếu nó đang tồn tại
				nextOverColumn.cards = nextOverColumn.cards.filter(
					(card) => !card?.FE_PlaceholderCard
				);

				// Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
				nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
					(card) => card._id
				);
			}
			console.log("nextColumns: ", nextColumns);
			return nextColumns;
		});
	};

	//Trigger khi bắt đầu kéo một phần tử => hành động
	const handleDragStart = (event) => {
		setActiveDragItemId(event?.active?.id);
		setActiveDragItemType(
			event?.active?.data?.current?.columnId
				? ACTIVE_DRAG_ITEM_TYPE.CARD
				: ACTIVE_DRAG_ITEM_TYPE.COLUMN
		);
		setActiveDragItemData(event?.active?.data?.current);

		//Nếu là kéo card thì mới set oldColumn
		if (event?.active?.data?.current?.columnId) {
			setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id));
		}
	};

	// Trigger trong quá trình kéo(drag) một phần tử
	const handleDragOver = (event) => {
		// Không làm gì thêm nếu đang kéo Column
		if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;

		// Còn nếu kéo card thì xử lý thêm để có thể kéo card qua lại giữa các columns
		const { active, over } = event;

		// Cần đảm bảo nuế không tồn tại active hoặc over(khi kéo ra khỏi phạm vi container) thì không làm gì
		if (!active || !over) return;

		//activeDraggingCardID: Là cái card đang được kéo
		const {
			id: activeDraggingCardID,
			data: { current: activeDraggingCardData },
		} = active;

		//overCardId: là cái card đang tương tác trên hoạc dưới so với cái card được kéo ở trên
		const { id: overCardId } = over;

		//Tìm 2 cái columns theo cardId
		const activeColumn = findColumnByCardId(activeDraggingCardID);
		const overColumn = findColumnByCardId(overCardId);

		// Nếu không tồn 1 trong 2 column thì không làm gì hết
		if (!activeColumn || !overColumn) return;

		// Xử lý logic ở đây chỉ khi kéo card qua 2 colum khác nhau,
		// còn nếu kéo card trong chính column ban đầu của nó thì không làm gì
		// Vì ở đây đang là đoạn xử lý lúc kéo (handleDragOver),
		// còn xử lí xong xuôi thì nó lại là vấn đề khác ở (handleDragEnd)
		if (activeColumn._id !== overColumn._id) {
			moveCardBetweenDifferentColumns(
				overColumn,
				overCardId,
				active,
				over,
				activeColumn,
				activeDraggingCardID,
				activeDraggingCardData
			);
		}
	};

	//Trigger khi kết thúc hành động  kéo một phần tử => hành động thả (drop)
	const handleDragEnd = (event) => {
		const { active, over } = event;

		if (!over || !active) return;

		// Xử lý kéo thả Card
		if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
			//activeDraggingCardID: Là cái card đang được kéo
			const {
				id: activeDraggingCardID,
				data: { current: activeDraggingCardData },
			} = active;

			//overCardId: là cái card đang tương tác trên hoạc dưới so với cái card được kéo ở trên
			const { id: overCardId } = over;
			//Tìm 2 cái columns theo cardId
			const activeColumn = findColumnByCardId(activeDraggingCardID);
			const overColumn = findColumnByCardId(overCardId);

			// Nếu không tồn 1 trong 2 column thì không làm gì hết
			if (!activeColumn || !overColumn) return;

			if (oldColumnWhenDraggingCard._id !== overColumn._id) {
				// Hành động kéo thả card ở 2 colum khác nhau

				moveCardBetweenDifferentColumns(
					overColumn,
					overCardId,
					active,
					over,
					activeColumn,
					activeDraggingCardID,
					activeDraggingCardData
				);
			} else {
				// Hành động kéo thả card trong cùng một column

				// Lấy vị trí cũ từ thằng oldColumnWhenDraggingCard
				const oldCardIndex =
					oldColumnWhenDraggingCard?.cards?.findIndex(
						(c) => c._id === activeDragItemId
					);

				// Lấy vị trí mới từ thằng over
				const newCardIndex = overColumn?.cards?.findIndex(
					(c) => c._id === overCardId
				);
				// dùng arrayMove của thằng dnd-kit để sắp xếp lại mảng Columns ban đầu
				const dndOrderedCards = arrayMove(
					oldColumnWhenDraggingCard?.cards,
					oldCardIndex,
					newCardIndex
				);

				setOrderedColumns((prevColumns) => {
					// Clone mảng OrderedColumnsState cũ ra một cái mới để xử lý data rồi return - cập nhật lại OrderedColumnsState mới
					const nextColumns = cloneDeep(prevColumns);

					// Tìm tới cái Column mà chúng ta đang thả
					const targetColumn = nextColumns.find(
						(column) => column._id === overColumn._id
					);

					// cập nhật lại 2 giá trị mới là card và cardOrrderIds trong cái targetColumn
					targetColumn.cards = dndOrderedCards;
					targetColumn.cardOrderIds = dndOrderedCards.map(
						(card) => card._id
					);

					// Trả về giá trị state mới chuẩn vị trí
					return nextColumns;
				});
			}
		}

		//Xử lý kéo thả Columns
		if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
			// Nếu vị trí sau khi kéo thả khác với vị trị ban đầu
			if (active.id !== over.id) {
				// Lấy vị trí cũ từ thằng active
				const oldColumnIndex = orderedColumns.findIndex(
					(c) => c._id === active.id
				);

				// Lấy vị trí mới từ thằng over
				const newColumnIndex = orderedColumns.findIndex(
					(c) => c._id === over.id
				);

				// dùng arrayMove của thằng dnd-kit để sắp xếp lại mảng Columns ban đầu
				const dndOrderedColumn = arrayMove(
					orderedColumns,
					oldColumnIndex,
					newColumnIndex
				);
				const dndOrderedColumnIds = dndOrderedColumn.map((c) => c._id);

				// cập nhật lại state coulumns ban đầu sau khi đã kéo thả
				setOrderedColumns(dndOrderedColumn);
			}
		}

		setActiveDragItemId(null);
		setActiveDragItemType(null);
		setActiveDragItemData(null);
		setOldColumnWhenDraggingCard(null);
	};

	const customDropAnimation = {
		sideEffects: defaultDropAnimationSideEffects({
			styles: {
				active: {
					opacity: "0.5",
				},
			},
		}),
	};

	// custom lại thuật toán phát hiện va chạm, tối ưu cho việc kéo thả card giữa nhiều columns
	const collisionDetectionStrategy = useCallback(
		(args) => {
			// Trường hợp kéo column thì dùng thuật toán closetColumn
			if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
				return closestCorners({ ...args });
			}

			//Tìm các điểm giao nhau, va chạm - intersections với con trỏ
			const pointerIntersections = pointerWithin(args);

			if (!pointerIntersections?.length) return;

			const intersections =
				pointerIntersections?.length > 0
					? pointerIntersections
					: rectIntersection(args);

			// Tìm overId đầu tiên trong đám intersections ở trên
			let overId = getFirstCollision(intersections, "id");
			if (overId) {
				// Nếu over là column thfi sẽ tìm tới cái cardId gần nhất bên trong khu vực
				// va chạm đó dựa vào thuật toán phát hiện va chạm closeCenter hoặc closeCorners đều được

				const checkColumn = orderedColumns.find(
					(column) => column._id === overId
				);

				if (checkColumn) {
					overId = closestCorners({
						...args,
						droppableContainers: args.droppableContainers.filter(
							(container) => {
								return (
									container.id !== overId &&
									checkColumn?.cardOrderIds?.includes(
										container.id
									)[0]?.id
								);
							}
						),
					});
				}

				lastOverId.current = overId;
				return [{ id: overId }];
			}

			return lastOverId.current ? [{ id: lastOverId.current }] : [];
		},
		[activeDragItemType, orderedColumns]
	);
	return (
		<DndContext
			onDragStart={handleDragStart}
			onDragOver={handleDragOver}
			onDragEnd={handleDragEnd}
			sensors={mySensors}
			//Thuật toán phát hiện va chạm(nếu không có nó thì card với cover lớn sẽ không kéo qua COlumn được vì
			// lúc này nó đang bị confilict giữa card và column)
			collisionDetection={collisionDetectionStrategy}
		>
			<Box
				sx={{
					bgcolor: (theme) =>
						theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
					with: "100%",
					height: (theme) => theme.trello.boardContentHeight,
					padding: "10px 0",
				}}
			>
				<ListColumns
					columns={orderedColumns}
					createNewColumn={createNewColumn}
					createNewCard={createNewCard}
				/>
				<DragOverlay dropAnimation={customDropAnimation}>
					{!activeDragItemType && null}
					{activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
						<Column column={activeDragItemData} />
					)}
					{activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
						<TrelloCard card={activeDragItemData} />
					)}
				</DragOverlay>
			</Box>
		</DndContext>
	);
}

export default BoardContent;
