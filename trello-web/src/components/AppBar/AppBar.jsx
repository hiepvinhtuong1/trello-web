import { useState } from "react";
import Box from "@mui/material/Box";
import ModeSelect from "~/components/ModeSelect/ModeSelect";
import AppsIcon from "@mui/icons-material/Apps";
import { ReactComponent as TrelloIcon } from "~/assets/trello.svg"; // Adjust the path as necessary
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import Workspaces from "./Menus/Workspaces";
import Recent from "./Menus/Recent";
import Template from "./Menus/Template";
import Starred from "./Menus/Starred";
import Profile from "./Menus/Profile";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Badge from "@mui/material/Badge";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import InputAdornment from "@mui/material/InputAdornment";
function AppBar() {
	const [searchValue, setSearchValue] = useState("");
	return (
		<Box
			sx={{
				with: "100%",
				px: 2,
				height: (theme) => theme.trello.appBarHeight,
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				gap: 2,
				overflowX: "auto",
				bgcolor: (theme) =>
					theme.palette.mode === "dark" ? "#2c3e50" : "#1565c0",
			}}
		>
			<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
				<AppsIcon
					sx={{
						color: "white",
					}}
				/>
				<Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
					<SvgIcon
						component={TrelloIcon}
						inheritViewBox
						sx={{ color: "white" }}
						fontSize="small"
					/>
					<Typography
						variant="span"
						sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
						color={"white"}
					>
						Trello
					</Typography>
				</Box>
				<Box
					sx={{
						display: {
							xs: "none",
							md: "flex",
						},
						gap: 1,
					}}
				>
					<Workspaces />
					<Recent />
					<Starred />
					<Template />

					<Button
						sx={{ color: "white" }}
						startIcon={<LibraryAddIcon />}
					>
						Create
					</Button>
				</Box>
			</Box>
			<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
				<TextField
					id="outlined-search"
					label="Search..."
					type="text"
					size="small"
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon
									sx={{
										color: "white",
									}}
								/>
							</InputAdornment>
						),
						endAdornment: (
							<InputAdornment position="end">
								<CloseIcon
									onClick={() => setSearchValue("")}
									fontSize="small"
									sx={{
										color: "white",
										cursor: "pointer",
										display: searchValue ? "block" : "none",
									}}
								/>
							</InputAdornment>
						),
					}}
					sx={{
						minWidth: "120px",
						maxWidth: "180px",
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
				<ModeSelect sx={{ color: "" }} />
				<Tooltip title="Notifications">
					<Badge
						color="secondary"
						variant="dot"
						sx={{ cursor: "pointer" }}
					>
						<NotificationsNoneIcon sx={{ color: "white" }} />
					</Badge>
				</Tooltip>
				<Tooltip title="Help" sx={{ cursor: "pointer" }}>
					<HelpOutlineIcon sx={{ color: "white" }} />
				</Tooltip>
				<Profile />
			</Box>
		</Box>
	);
}

export default AppBar;
