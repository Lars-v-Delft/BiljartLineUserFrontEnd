import { render, screen, waitFor } from '@testing-library/react';
import CompetitionListsByGameType from '@/app/components/CompetitionListsByGameType';
import { competition } from '@/app/types/competition';
import * as competitionService from '@/app/services/competitions';

// we have to use var so its hoisted and jest.mock can use it
var mockCompetitions: competition[] = [{
    id: 1,
    federationId: 1,
    name: 'testName1',
    teamIds: [1, 2],
    gameType: 'testGameType1',
    startDate: new Date("2021-01-01"),
    endDate: new Date("2021-12-31"),
    published: true,
},
{
    id: 2,
    federationId: 1,
    name: 'testName2',
    teamIds: [1, 2],
    gameType: 'testGameType2',
    startDate: new Date("2021-01-01"),
    endDate: new Date("2021-12-31"),
    published: true,
},
{
    id: 3,
    federationId: 1,
    name: 'testName3',
    teamIds: [1, 2],
    gameType: 'testGameType2',
    startDate: new Date("2021-01-01"),
    endDate: new Date("2021-12-31"),
    published: true,
}];

// mock competitionservice
jest.mock('../app/services/competitions', () => ({
    getCompetitionsByFederation: jest.fn().mockImplementation(() => mockCompetitions),
}));
// mock session
jest.mock('next-auth/react', () => ({
    useSession: jest.fn().mockReturnValue({ data: { id: 1 } }),
}));

describe('CompetitionListsByGameType', () => {
    // No longer relevant after performance improvement
    // it('should call competitionService like', async () => {
    //     // Arrange
    //     render(<CompetitionListsByGameType bondId={1} />);

    //     // Assert
    //     await waitFor(() => {
    //         expect(competitionService.getCompetitionsByFederation).toHaveBeenCalledTimes(1);
    //         expect(competitionService.getCompetitionsByFederation).toHaveBeenCalledWith(1, expect.any(String), expect.any(String), false);
    //     });
    // })
    it('should have 2 gameTypes', async () => {
        // Arrange
        const competitionsPromise = Promise.resolve(mockCompetitions);
        render(<CompetitionListsByGameType competitionsPromise={competitionsPromise} />);

        // Act
        await waitFor(() => {
            const gametypeElements = screen.getAllByText(/testGameType\d/);
            // Assert
            expect(gametypeElements).toHaveLength(2);
        });
    })
    it('should have 3 competitions', async () => {
        // Arrange
        const competitionsPromise = Promise.resolve(mockCompetitions);
        render(<CompetitionListsByGameType competitionsPromise={competitionsPromise} />);

        // Act
        await waitFor(() => {
            const competitionElements = screen.getAllByText(/testName\d/);
            // Assert
            expect(competitionElements).toHaveLength(3);
        });
    })
})