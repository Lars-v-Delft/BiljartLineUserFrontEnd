import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { competition } from '../../your-competition-model-path'; // Update with the correct path to your competition model

export default async function addCompitition() {
    const [competitionData, setCompetitionData] = useState<competition>({
        id: 0, // You may want to generate unique IDs differently
        federationId: 0, // Initialize with the appropriate value
        name: '',
        gameType: '',
        startDate: new Date(),
        endDate: new Date(),
        published: false,
    });

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // You can add logic to submit the competition data to your backend here
        console.log('Competition data submitted:', competitionData);
        // Redirect to another page after submission
        router.push('/competitions'); // Update with the correct route
    };

    return (
        <div>
            <h1>Add Competition</h1>
            <form onSubmit={handleSubmit}>
                <label>Name:
                    <input
                        type="text"
                        value={competitionData.name}
                        onChange={(e) => setCompetitionData({ ...competitionData, name: e.target.value })}
                    />
                </label>

                <label>Game Type:
                    <input
                        type="text"
                        value={competitionData.gameType}
                        onChange={(e) => setCompetitionData({ ...competitionData, gameType: e.target.value })}
                    />
                </label>

                <label>Start Date:
                    <input
                        type="date"
                        value={competitionData.startDate.toISOString().split('T')[0]}
                        onChange={(e) => setCompetitionData({ ...competitionData, startDate: new Date(e.target.value), })}
                    />
                </label>

                <label>End Date:
                    <input
                        type="date"
                        value={competitionData.endDate.toISOString().split('T')[0]}
                        onChange={(e) => setCompetitionData({ ...competitionData, endDate: new Date(e.target.value), })}
                    />
                </label>

                <label>Published:
                    <input
                        type="checkbox"
                        checked={competitionData.published}
                        onChange={(e) => setCompetitionData({ ...competitionData, published: e.target.checked, })}
                    />
                </label>

                <button type="submit">Add Competition</button>
            </form>
        </div>
    );
}




{/* <form onSubmit={aaa.post("")}>
    <input></input>
    <button type="submit"></button>
</form> */}