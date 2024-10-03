import express,  {Request, Response} from 'express';
import { compareSnapshotsWithOpenAI } from './helper';
import 'dotenv/config';

const app = express();
app.use(express.json());

app.post('/compare-snapshots', async (req: Request, res: Response): Promise<any> => {
    const { baseSnapshot, targetSnapshot } = req.body;
  
    if (!baseSnapshot || !targetSnapshot) {
      return res.status(400).send({ error: 'Both baseSnapshot and targetSnapshot are required.' });
    }
  
    try {
      // Call the helper function to get the comparison result from OpenAI
      const comparisonResult = await compareSnapshotsWithOpenAI(baseSnapshot, targetSnapshot);
  
      // Store the comparison result in the database (optional, for training)
      return res.json({ explanation: comparisonResult });
    } catch (error) {
      console.error('Error comparing snapshots with OpenAI:', error);
      return res.status(500).send({ error: 'Error processing the request.' });
    }
  });

  const PORT = 3000; // You can set any number here
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });