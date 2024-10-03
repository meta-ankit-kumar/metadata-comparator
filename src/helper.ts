import axios from "axios";

export async function compareSnapshotsWithOpenAI(baseSnapshot: object, targetSnapshot: object) {
    const openAiApiKey = process.env.OPENAI_API_KEY;
  
    const prompt = `
      Compare the following two JSON snapshots and explain the differences in a human-readable way:
      
      Base Snapshot:
      ${JSON.stringify(baseSnapshot, null, 2)}
  
      Target Snapshot:
      ${JSON.stringify(targetSnapshot, null, 2)}
  
      Provide a concise explanation of the changes.
    `;
  
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'gpt-3.5-turbo', // or 'gpt-4' if desired
        prompt,
        max_tokens: 500,
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${openAiApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );
  
    return response.data.choices[0].text.trim();
  }