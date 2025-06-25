import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import GroupIcon from "@mui/icons-material/Group";
import CommentIcon from "@mui/icons-material/Comment";
import AttachmentIcon from "@mui/icons-material/Attachment";

function TrelloCard({ temporaryHideMedia }) {
	if (temporaryHideMedia) {
		return (
			<Card
				sx={{
					cursor: "pointer",
					boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
					overflow: "unset",
				}}
			>
				<CardContent
					sx={{
						p: 1.5,
						"&:last-child": {
							p: 1.5,
						},
					}}
				>
					<Typography>Card test 01</Typography>
				</CardContent>
			</Card>
		);
	}
	return (
		<Card
			sx={{
				cursor: "pointer",
				boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
				overflow: "unset",
			}}
		>
			<CardMedia
				sx={{ height: 140 }}
				image="https://images2.thanhnien.vn/528068263637045248/2024/1/25/ac36f48cce98a31df72e0a130074f8f7-65a11af821373880-17061562928371143948676.jpg"
				title="green iguana"
			/>
			<CardContent
				sx={{
					p: 1.5,
					"&:last-child": {
						p: 1.5,
					},
				}}
			>
				<Typography>TuanHiepDev MERN Stack</Typography>
			</CardContent>
			<CardActions sx={{ p: "0 4px 8px 4px" }}>
				<Button size="small" startIcon={<GroupIcon />}>
					20
				</Button>
				<Button size="small" startIcon={<CommentIcon />}>
					15
				</Button>
				<Button size="small" startIcon={<AttachmentIcon />}>
					10
				</Button>
			</CardActions>
		</Card>
	);
}

export default TrelloCard;
