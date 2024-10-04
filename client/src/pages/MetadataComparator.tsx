import { Button, Container, FormControl, Grid2, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";

const MetadataComparator = (props: any) => {
	const [baseSnapshot, setBaseSnapshot] = useState('');
	const [targetSnapshot, setTargetSnapshot] = useState('');
	const [diff, setDiff] = useState('');
	const ref = React.useRef<HTMLInputElement>(null);

	React.useEffect(() => {
		if (ref.current !== null) {
			ref.current.setAttribute("directory", "");
			ref.current.setAttribute("webkitdirectory", "");
		}
	}, [ref]);


	const handleOldFileSelect = (e: SelectChangeEvent) => {
		setBaseSnapshot(e.target.value);
	}
	const handleNewFileSelect = (e: SelectChangeEvent) => {
		setTargetSnapshot(e.target.value);
	}
	const handleGetDiff = async () => {
		const data = JSON.stringify({
			snapshot1Path: baseSnapshot,
			snapshot2Path: targetSnapshot
		});
		const config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: 'http://localhost:3000/analyse-metadata',
			headers: {
				'Content-Type': 'application/json'
			},
			data: data
		};
		const result = (await axios.request(config)).data.explanation;
		setDiff(result);
	}
	const handleClear = (e: any) => {
		setDiff('Cooking...');
	}

	return <>
		<h1>Metadata comparator</h1>
		{/* <Button
			variant="contained"
			component="label"
		>
			Upload files
			<input onChange={handleInput} ref={ref} id='upload' type="file" multiple hidden />
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

		<Grid2 padding={2}>
			<Button onClick={handleGetDiff}>Get Difference</Button>
			<Button onClick={handleClear}>Clear</Button>
		</Grid2>

		<Container maxWidth='xl'>
			<TextField
				fullWidth
				placeholder="Cooking some response..."
				value={diff}
				multiline
				slotProps={{
					input: {
						readOnly: true,
					},
				}}
			/>
		</Container>
	</>
};

export default MetadataComparator;