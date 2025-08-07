import Box from "@mui/material/Box";
import Column from "./Column/Column";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import {
	SortableContext,
	horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { toast } from "react-toastify";

function ListColumns({ columns }) {
	const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
	const toggleOpenNewColumnForm = () => {
		setOpenNewColumnForm(!openNewColumnForm);
	};

	const [newColumnTitle, setNewColumnTitle] = useState("");

	const addNewColumn = () => {
		if (!newColumnTitle.trim()) {
			toast.error("Please enter a column title");
			return;
		}
		console.log(newColumnTitle);

		// Đóng trạng thái thêm column mới và clear input
		toggleOpenNewColumnForm();
	};
	return (
		<SortableContext
			items={columns?.map((c) => c._id)}
			strategy={horizontalListSortingStrategy}
		>
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
				{!openNewColumnForm ? (
					<Box
						onClick={toggleOpenNewColumnForm}
						sx={{
							minWidth: "250px",
							maxWidth: "250px",
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
				) : (
					<Box
						sx={{
							minWidth: "250px",
							maxWidth: "250px",
							mx: 2,
							p: 1,
							borderRadius: "6px",
							height: "fit-content",
							bgcolor: "#ffffff3d",
							display: "flex",
							flexDirection: "column",
							gap: 1,
						}}
					>
						<TextField
							label="Enter column title ..."
							type="text"
							size="small"
							variant="outlined"
							autoFocus
							value={newColumnTitle}
							onChange={(e) => setNewColumnTitle(e.target.value)}
							sx={{
								"& label": {
									color: "white",
								},
								"& input": {
									color: "white",
								},
								"& label.Mui-focused": {
									color: "white",
								},
								"& .MuiOutlinedInput-root": {
									"& fieldset": {
										borderColor: "white",
									},
									"&:hover fieldset": {
										borderColor: "white",
									},
									"&.Mui-focused fieldset": {
										borderColor: "white",
									},
								},
							}}
						/>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<Button
								onClick={addNewColumn}
								variant="contained"
								color="success"
								size="small"
								sx={{
									boxShadow: "none",
									border: "0.5px solid ",
									borderColor: (theme) =>
										theme.palette.success.main,
									"&:hover": {
										bgcolor: (theme) =>
											theme.palette.success.main,
									},
								}}
							>
								Add Column
							</Button>
							<CloseIcon
								onClick={toggleOpenNewColumnForm}
								fontSize="small"
								sx={{
									color: "white",
									cursor: "pointer",
									"&:hover": {
										color: (theme) =>
											theme.palette.warning.light,
									},
								}}
							/>
						</Box>
					</Box>
				)}
			</Box>
		</SortableContext>
	);
}

export default ListColumns;
