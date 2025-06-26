import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import BoltIcon from "@mui/icons-material/Bolt";
import FilterListIcon from "@mui/icons-material/FilterList";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { capitalizeFirstLetter } from "~/utils/formatters";
const MENU_STYLES = {
	color: "white",
	backgroundColor: "transparent",
	border: "none",
	padding: "5px",
	borderRadius: "4px",
	".MuiSvgIcon-root": {
		color: "white",
	},
	"&:hover": {
		backgroundColor: "primary.50",
	},
};

function BoardBar({ board }) {
	return (
		<div>
			<Box
				sx={{
					px: 2,
					with: "100%",
					height: (theme) => theme.trello.boardBarHeight,
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					gap: 2,
					overflowX: "auto",
					bgcolor: (theme) =>
						theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
				}}
			>
				<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
					<Chip
						sx={MENU_STYLES}
						icon={<DashboardIcon />}
						label={board?.title}
						clickable
					/>
					<Chip
						sx={MENU_STYLES}
						icon={<VpnLockIcon />}
						label={capitalizeFirstLetter(board?.type)}
						clickable
					/>

					<Chip
						sx={MENU_STYLES}
						icon={<AddToDriveIcon />}
						label="Add To Google Drive"
						clickable
					/>
					<Chip
						sx={MENU_STYLES}
						icon={<BoltIcon />}
						label="Automation"
						clickable
					/>
					<Chip
						sx={MENU_STYLES}
						icon={<FilterListIcon />}
						label="Filters	"
						clickable
					/>
				</Box>
				<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
					<Button
						startIcon={<PersonAddIcon />}
						sx={{
							color: "white",
							borderColor: "white",
							"&:hover": {
								borderColor: "white",
							},
						}}
					>
						Invite
					</Button>
					<AvatarGroup
						max={4}
						sx={{
							gap: "10px",
							"& .MuiAvatar-root": {
								width: 34,
								height: 34,
								fontSize: "0.875rem",
								border: "none",
								color: "white",
								cursor: "pointer",
								"&:first-of-type": {
									bgcolor: "#a4b0be",
								},
							},
						}}
					>
						<Tooltip title="tuanhiepdev">
							<Avatar
								alt="tuanhiepdev"
								src="https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-6/480820435_1696223384640262_7602083508037131633_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=unhI76o5YsMQ7kNvwGquS4x&_nc_oc=AdkNXfTay-ygWNhYcwEolJCT1zA-2K4VnmxUMr9T34JDY9gfHYF3yka26CWgkAeKtjo&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=PjTEWmlI_rm9TmbE14uagA&oh=00_AfMXetLeARu6anJxgur589JfuZNqyWG3il1bpyic6MKdTg&oe=6860268A"
							/>
						</Tooltip>
						<Tooltip title="tuanhiepdev">
							<Avatar
								alt="tuanhiepdev"
								src="https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-6/480820435_1696223384640262_7602083508037131633_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=unhI76o5YsMQ7kNvwGquS4x&_nc_oc=AdkNXfTay-ygWNhYcwEolJCT1zA-2K4VnmxUMr9T34JDY9gfHYF3yka26CWgkAeKtjo&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=PjTEWmlI_rm9TmbE14uagA&oh=00_AfMXetLeARu6anJxgur589JfuZNqyWG3il1bpyic6MKdTg&oe=6860268A"
							/>
						</Tooltip>
						<Tooltip title="tuanhiepdev">
							<Avatar
								alt="tuanhiepdev"
								src="https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-6/480820435_1696223384640262_7602083508037131633_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=unhI76o5YsMQ7kNvwGquS4x&_nc_oc=AdkNXfTay-ygWNhYcwEolJCT1zA-2K4VnmxUMr9T34JDY9gfHYF3yka26CWgkAeKtjo&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=PjTEWmlI_rm9TmbE14uagA&oh=00_AfMXetLeARu6anJxgur589JfuZNqyWG3il1bpyic6MKdTg&oe=6860268A"
							/>
						</Tooltip>
						<Tooltip title="tuanhiepdev">
							<Avatar
								alt="tuanhiepdev"
								src="https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-6/480820435_1696223384640262_7602083508037131633_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=unhI76o5YsMQ7kNvwGquS4x&_nc_oc=AdkNXfTay-ygWNhYcwEolJCT1zA-2K4VnmxUMr9T34JDY9gfHYF3yka26CWgkAeKtjo&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=PjTEWmlI_rm9TmbE14uagA&oh=00_AfMXetLeARu6anJxgur589JfuZNqyWG3il1bpyic6MKdTg&oe=6860268A"
							/>
						</Tooltip>
						<Tooltip title="tuanhiepdev">
							<Avatar
								alt="tuanhiepdev"
								src="https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-6/480820435_1696223384640262_7602083508037131633_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=unhI76o5YsMQ7kNvwGquS4x&_nc_oc=AdkNXfTay-ygWNhYcwEolJCT1zA-2K4VnmxUMr9T34JDY9gfHYF3yka26CWgkAeKtjo&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=PjTEWmlI_rm9TmbE14uagA&oh=00_AfMXetLeARu6anJxgur589JfuZNqyWG3il1bpyic6MKdTg&oe=6860268A"
							/>
						</Tooltip>
						<Tooltip title="tuanhiepdev">
							<Avatar
								alt="tuanhiepdev"
								src="https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-6/480820435_1696223384640262_7602083508037131633_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=unhI76o5YsMQ7kNvwGquS4x&_nc_oc=AdkNXfTay-ygWNhYcwEolJCT1zA-2K4VnmxUMr9T34JDY9gfHYF3yka26CWgkAeKtjo&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=PjTEWmlI_rm9TmbE14uagA&oh=00_AfMXetLeARu6anJxgur589JfuZNqyWG3il1bpyic6MKdTg&oe=6860268A"
							/>
						</Tooltip>
					</AvatarGroup>
				</Box>
			</Box>
		</div>
	);
}

export default BoardBar;
