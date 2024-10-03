import axios from 'axios';

export async function compareSnapshotsWithOpenAI(baseSnapshot: string, targetSnapshot: string, openaiApiKey: string) {
    const url = 'https://api.openai.com/v1/chat/completions';

    const prompt = `Compare the following two JSON snapshots and explain the differences in a human-readable way:

    Base Snapshot:
    ${JSON.stringify(baseSnapshot)}

    Target Snapshot:
    ${JSON.stringify(targetSnapshot)}

    Provide a concise explanation of the changes.`;

    const data = {
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500,
        temperature: 0.7,
    };

    try {
        const response = await axios.post(url, data, {
            headers: {
                'Authorization': `Bearer ${openaiApiKey}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error comparing snapshots with OpenAI:', error);
        throw error;
    }
}

export async function gitDifferenceWithOpenAI(gitDifference: string, openaiApiKey: string) {
  console.log('In gitDifferenceWithOpenAI');
  
    const url = 'https://api.openai.com/v1/chat/completions';

    const prompt = `Assume you have extensive experience with Salesforce technology and a deep understanding of its metadata structure.
      I will provide a Git diff output that compares the metadata between two snapshots of a Salesforce organization. Your task is to:

      1. Analyze the changes in the file structure and metadata.
      2. Summarize only the differences, describing what has changed and its potential impact on the Salesforce organization. Avoid adding extra explanations or unrelated details.
      3.Ensure that your response covers all the changes fully, even if the diff is large—do not truncate the output.
      Here is the Git diff: ${gitDifference}`;

    const data = {
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 6000,
        temperature: 0.7,
    };

    try {
        const response = await axios.post(url, data, {
            headers: {
                'Authorization': `Bearer ${openaiApiKey}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Response generation failed', error);
        throw error;
    }
}
