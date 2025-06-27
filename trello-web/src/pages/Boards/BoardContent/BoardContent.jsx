import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import {
	DndContext,
	KeyboardSensor,
	MouseSensor,
	PointerSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { mapOrder } from "~/utils/sort";
import { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
function BoardContent({ board }) {
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

	useEffect(() => {
		setOrderedColumns(
			mapOrder(board?.columns, board?.columnOrderIds, "_id")
		);
	}, [board]);

	const handleDragEnd = (event) => {
		console.log("handleDragEnd: ", event);
		const { active, over } = event;

		if (!over) return;

		// Nếu vị trí sau khi kéo thả khác với vị trị ban đầu
		if (active.id !== over.id) {
			console.log("keotha");
			// Lấy vị trí cũ từ thằng active
			const oldIndex = orderedColumns.findIndex(
				(c) => c._id === active.id
			);

			// Lấy vị trí mới từ thằng over
			const newIndex = orderedColumns.findIndex((c) => c._id === over.id);

			const dndOrderedColumn = arrayMove(
				orderedColumns,
				oldIndex,
				newIndex
			);
			const dndOrderedColumnIds = dndOrderedColumn.map((c) => c._id);
			console.log("dndOrderedColumn", dndOrderedColumn);
			console.log("dndOrderedColumnIds", dndOrderedColumnIds);

			// cập nhật lại state coulumns ban đầu sau khi đã kéo thả
			setOrderedColumns(dndOrderedColumn);
		}
	};
	return (
		<DndContext onDragEnd={handleDragEnd} sensors={mySensors}>
			<Box
				sx={{
					bgcolor: (theme) =>
						theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
					with: "100%",
					height: (theme) => theme.trello.boardContentHeight,
					padding: "10px 0",
				}}
			>
				<ListColumns columns={orderedColumns} />
			</Box>
		</DndContext>
	);
}

export default BoardContent;
