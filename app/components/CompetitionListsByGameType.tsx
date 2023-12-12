'use client'
import { useEffect, useState } from "react";
import { getCompetitionsByFederation } from "../services/competitions";
import { getCurrentFormattedDateString } from "../services/dateFunctions";
import Translate from "../services/translateFunction";
import CompetitionList from "./CompetitionList";
import { competition } from "../types/competition";

export default function CompetitionListsByGameType({ bondId }: { bondId: number }) {
    const [comps, setComps] = useState<competition[]>([])
    const [error, setError] = useState(false);

    async function fetchData() {
        try {
            const comps = await getCompetitionsByFederation(bondId, getCurrentFormattedDateString(-30), getCurrentFormattedDateString(60), false);
            setComps(comps);
        } catch {
            setError(true);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    // determine unique gameTypes in array
    const gameTypeMap: string[] = new Array;
    comps.forEach((comp: competition) => {
        if (!gameTypeMap.includes(comp.gameType)) {
            gameTypeMap.push(comp.gameType);
        }
    })

    function FilterByGameType(gameType: string) {
        return comps.filter(comp => comp.gameType == gameType);
    }

    if (error)
        return <h1 className="bg-red-100 text-red-500 p-4 rounded">Competities kunnen niet geladen worden</h1>
    else
        return (
            <div className='flex flex-row'>
                {
                    // add column for each gametype
                    gameTypeMap.map(gameType =>
                        <div key={gameType} className="basis-1/4">
                            <CompetitionList comps={FilterByGameType(gameType)} title={Translate(gameType)} />
                        </div>
                    )
                }
            </div>
        )
}
