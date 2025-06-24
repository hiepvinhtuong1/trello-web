import React from "react";
import Box from "@mui/material/Box";
import ModeSelect from "~/components/ModeSelect";
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
import Tooltip from "@mui/material/Tooltip";

function AppBar() {
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
			}}
		>
			<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
				<AppsIcon
					sx={{
						color: "primary.main",
					}}
				/>
				<Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
					<SvgIcon
						component={TrelloIcon}
						inheritViewBox
						sx={{ color: "primary.main" }}
						fontSize="small"
					/>
					<Typography
						variant="span"
						sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
						color={"primary.main"}
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
					<Button variant="outlined" startIcon={<LibraryAddIcon />}>
						Create
					</Button>
				</Box>
			</Box>
			<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
				<TextField
					id="outlined-search"
					label="Search..."
					type="search"
					size="small"
					sx={{ minWidth: "120px" }}
				/>
				<ModeSelect sx={{ color: "" }} />
				<Tooltip title="Notifications">
					<Badge
						color="secondary"
						variant="dot"
						sx={{ cursor: "pointer" }}
					>
						<NotificationsNoneIcon sx={{ color: "primary.main" }} />
					</Badge>
				</Tooltip>
				<Tooltip title="Help" sx={{ cursor: "pointer" }}>
					<HelpOutlineIcon sx={{ color: "primary.main" }} />
				</Tooltip>
				<Profile />
			</Box>
		</Box>
	);
}

export default AppBar;
