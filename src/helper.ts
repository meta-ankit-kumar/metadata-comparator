import axios from 'axios';

export async function compareSnapshotsWithOpenAI(baseSnapshot: string, targetSnapshot: string, openaiApiKey: string) {
    const url = 'https://api.openai.com/v1/chat/completions';

    const prompt = `Compare the following two JSON snapshots and explain the differences in a human-readable way:

    Base Snapshot:
    ${baseSnapshot}

    Target Snapshot:
    ${targetSnapshot}

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
    const url = 'https://api.openai.com/v1/chat/completions';

    const prompt = `Compare the following the git difference for salesforce org in a human-readable way:

    Git Difference:
    ${gitDifference}

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
