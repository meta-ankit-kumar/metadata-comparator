import express, { Request, Response } from 'express';
import { compareSnapshotsWithOpenAI, gitDifferenceWithOpenAI } from './helper';
import 'dotenv/config';

const app = express();
app.use(express.json());

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

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
