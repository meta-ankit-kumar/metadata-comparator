import express, { Request, Response } from 'express';
import { compareSnapshotsWithOpenAI, gitDifferenceWithOpenAI } from './helper';
import 'dotenv/config';
import { exec } from 'child_process';
import { promisify } from 'util';
import cors from 'cors';

const execPromise = promisify(exec);

const app = express();
app.use(express.json());
app.use(cors())

app.post('/compare-snapshots', async (req: Request, res: Response): Promise<any> => {
	const { baseSnapshot, targetSnapshot } = req.body;
	
	if (!baseSnapshot || !targetSnapshot) {
		return res.status(400).send({ error: 'Both baseSnapshot and targetSnapshot are required.' });
	}

	try {
		const openaiApiKey = process.env.OPENAI_API_KEY;

		if (!openaiApiKey) {
			return res.status(500).send({ error: 'OpenAI API key is not configured.' });
		}

		const comparisonResult = await compareSnapshotsWithOpenAI(baseSnapshot, targetSnapshot, openaiApiKey);

		return res.json({ explanation: comparisonResult });
	} catch (error) {
		console.error('Error comparing snapshots with OpenAI:', error);
		return res.status(500).send({ error: 'Error processing the request.' });
	}
});

app.post('/compare-git-diff', async (req: Request, res: Response): Promise<any> => {
	const { gitDifference } = req.body;

	if (!gitDifference) {
		return res.status(400).send({ error: 'gitDifference required.' });
	}

	try {
		const openaiApiKey = process.env.OPENAI_API_KEY;

		if (!openaiApiKey) {
			return res.status(500).send({ error: 'OpenAI API key is not configured.' });
		}

		const comparisonResult = await gitDifferenceWithOpenAI(gitDifference, openaiApiKey);

		return res.json({ explanation: comparisonResult });
	} catch (error) {
		console.error('Error comparing snapshots with OpenAI:', error);
		return res.status(500).send({ error: 'Error processing the request.' });
	}
});

app.post('/analyse-metadata', async (req: Request, res: Response): Promise<any> => {
	console.log('req.body', req.body);

	const snapshot1Path = req.body.snapshot1Path;
	const snapshot2Path = req.body.snapshot2Path;

	try {
		const openaiApiKey = process.env.OPENAI_API_KEY;

		if (!openaiApiKey) {
			return res.status(500).send({ error: 'OpenAI API key is not configured.' });
		}

		// Function to handle the `git diff` command and capture stdout
		const runGitDiff = async (): Promise<string> => {
			try {
				const { stdout } = await execPromise(`git diff --no-index ${snapshot1Path} ${snapshot2Path}`);
				return stdout; // Return the diff output
			} catch (error: any) {
				if (error.code === 1) {
					// Exit code 1 means differences were found
					console.log('Differences found:');
					return error.stdout; // Return the stdout which contains differences
				} else {
					// Log any other errors
					console.error(`Error executing git diff: ${error.stderr}`);
					throw new Error('Failed to execute git diff.');
				}
			}
		};

		// Await the result from the git diff
		const stdout1 = await runGitDiff();

		// Process the git diff output using the OpenAI function
		const comparisonResult = await gitDifferenceWithOpenAI(stdout1, openaiApiKey);

		// Send the result back to the client
		return res.json({ explanation: comparisonResult });

	} catch (error) {
		console.error('Error processing the request:', error);
		return res.status(500).send({ error: 'Error processing the request.' });
	}
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
