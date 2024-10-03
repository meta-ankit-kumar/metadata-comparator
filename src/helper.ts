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

    const prompt = `Assume that you have a great working experience on the salesforce technology.
    I'm going to provide you the git diff between two folders. The folders on which this difference is calculated represents salesforce organization metadata. 
    Your task is to understand the file structure and analyse the changes. The idea is to let customer know that if you apply the changes on your Salesforce organization following things are going to be changed.
    Keep in mind you need to only mention what is changed and how it may impact. Don't explain anything else.

    Git Difference:
    ${gitDifference}`;

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
        console.error('Response generation failed', error);
        throw error;
    }
}
