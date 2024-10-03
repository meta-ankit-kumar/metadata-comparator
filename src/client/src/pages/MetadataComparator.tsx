import { Button, FormControl, Grid, Grid2, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

const MetadataComparator = (props: any) => {
	const [oldFile, setOldFile] = useState('');
	const [newFile, setNewFile] = useState('');

	const handleOldFileSelect = (e:SelectChangeEvent) => {
		setOldFile(e.target.value);
	}
	const handleNewFileSelect = (e:SelectChangeEvent) => {
		setNewFile(e.target.value);
	}

	return <>
		<h1>Metadata comparator</h1>
		{/* <Button
			variant="contained"
			component="label"
			// onClick={handleInput}
		>
			Upload files
			<input id='upload' type="file" hidden />
		</Button> */}
		<Grid2 container spacing={2} justifyContent={'center'}>
			<Grid2 size={8}>
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">Origin</InputLabel>
					<Select
						labelId="label-old-file"
						id="demo-simple-select"
						label="Age"
						onChange={handleOldFileSelect}
					>
						<MenuItem value={'md_snapshot_1'}>md_snapshot_1</MenuItem>
						<MenuItem value={'md_snapshot_2'}>md_snapshot_2</MenuItem>
						<MenuItem value={'md_snapshot_3'}>md_snapshot_3</MenuItem>
					</Select>
				</FormControl>
			</Grid2>
			<Grid2 size={8}>
				<FormControl fullWidth>
					<InputLabel id="">New</InputLabel>
					<Select
						labelId="label-new-file"
						label="New"
						onChange={handleNewFileSelect}
					>
						<MenuItem value={'md_snapshot_1'}>md_snapshot_1</MenuItem>
						<MenuItem value={'md_snapshot_2'}>md_snapshot_2</MenuItem>
						<MenuItem value={'md_snapshot_3'}>md_snapshot_3</MenuItem>
					</Select>
				</FormControl>
			</Grid2>
		</Grid2>

		<Button></Button>

	</>
};

export default MetadataComparator;