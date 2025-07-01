import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ContentCut from "@mui/icons-material/ContentCut";
import Cloud from "@mui/icons-material/Cloud";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import AddCardIcon from "@mui/icons-material/AddCard";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import ListCards from "./ListCards/ListCards";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { mapOrder } from "~/utils/sort";

function Column({ column }) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: column._id, data: { ...column } });

	const dndKitColumnStyle = {
		touchAction: "none",
		// Nếu sử dụng dạng CSS.Transform lỗi kiểu strech
		transform: CSS.Translate.toString(transform),
		transition,
		//Chiều cao phải luôn max 100% vì nếu không sẽ lỗi lúc kéo column ngắn qua một column dài thì phải kéo kéo ở khu vực giữa giữa rất khó chịu.
		//Lưu ý lúc này phải kết hợp với {...listeners} năm ở Box chứ không phải ở div ngoài cùng để tránh trường hợp kéo vào vùng xanh
		height: "100%",
		opacity: isDragging ? 0.5 : undefined,
	};

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, "_id");
	return (
		//Phải bọc div ở ngoài cùng vì vấn đề của column khi kéo thả sẽ có bug kiểu flickering
		<div ref={setNodeRef} style={dndKitColumnStyle} {...attributes}>
			{/* Box Column 01 */}
			<Box
				{...listeners}
				sx={{
					minWidth: "300px",
					maxWidth: "300px",
					bgcolor: (theme) =>
						theme.palette.mode === "dark" ? "#333643" : "#ebecf0",
					ml: 2,
					borderRadius: "4px",
					height: "fit-content",
					maxHeight: (theme) =>
						` calc(${
							theme.trello.boardContentHeight
						} - ${theme.spacing(5)} )`,
				}}
			>
				{/* Box Column Header */}
				<Box
					sx={{
						height: (theme) => theme.trello.columnHeaderHeight,
						p: 2,
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<Typography
						variant="h6"
						sx={{
							fontWeight: "bold",
							cursor: "pointer",
							fontSize: "1rem",
						}}
					>
						{column?.title}
					</Typography>
					<Box>
						<Tooltip title="More options">
							<KeyboardArrowDownIcon
								id="basic-column-dropdown"
								aria-controls={
									open
										? "basic-menu-column-dropdown"
										: undefined
								}
								aria-haspopup="true"
								aria-expanded={open ? "true" : undefined}
								onClick={handleClick}
								sx={{
									color: "text.primary",
									cursor: "pointer",
								}}
							/>
						</Tooltip>

						<Menu
							id="basic-menu-column-dropdown"
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							slotProps={{
								list: {
									"aria-labelledby": "basic-column-dropdown",
								},
							}}
						>
							<MenuItem>
								<ListItemIcon>
									<AddCardIcon fontSize="small" />
								</ListItemIcon>
								<ListItemText>Add new card</ListItemText>
							</MenuItem>
							<MenuItem>
								<ListItemIcon>
									<ContentCut fontSize="small" />
								</ListItemIcon>
								<ListItemText>Cut</ListItemText>
							</MenuItem>
							<MenuItem>
								<ListItemIcon>
									<ContentCopy fontSize="small" />
								</ListItemIcon>
								<ListItemText>Cut</ListItemText>
							</MenuItem>
							<MenuItem>
								<ListItemIcon>
									<ContentPaste fontSize="small" />
								</ListItemIcon>
								<ListItemText>Paste</ListItemText>
							</MenuItem>
							<Divider />
							<MenuItem>
								<ListItemIcon>
									<Cloud fontSize="small" />
								</ListItemIcon>
								<ListItemText>Archive this column</ListItemText>
							</MenuItem>
							<MenuItem>
								<ListItemIcon>
									<DeleteIcon fontSize="small" />
								</ListItemIcon>
								<ListItemText>Remove this column</ListItemText>
							</MenuItem>
						</Menu>
					</Box>
				</Box>
				{/* Box Column Header */}

				{/*  List Card */}
				<ListCards cards={orderedCards} />
				{/*  List Card */}

				{/* Box Column Footer */}
				<Box
					sx={{
						height: (theme) => theme.trello.columnFooterHeight,
						p: 2,
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<Tooltip title="Drag to move" sx={{ cursor: "pointer" }}>
						<DragHandleIcon />
					</Tooltip>
					<Button startIcon={<AddCardIcon />}>Add new card</Button>
				</Box>
				{/* Box Column Footer */}
			</Box>
			{/* Box Column 01 */}
		</div>
	);
}

export default Column;
