import React from "react";
import Box from "@mui/material/Box";
import ModeSelect from "../../components/ModeSelect";
function AppBar() {
	return (
		<div>
			<Box
				sx={{
					backgroundColor: "primary.light",
					with: "100%",
					height: (theme) => theme.trelloCustom.appBarHeight,
					display: "flex",
					alignItems: "center",
				}}
			>
				<ModeSelect />
			</Box>
		</div>
	);
}

export default AppBar;
