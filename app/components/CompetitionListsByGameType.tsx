'use client'
import { useEffect, useState } from "react";
import Translate from "../services/translateFunction";
import CompetitionList from "./CompetitionList";
import { competition } from "../types/competition";

export default function CompetitionListsByGameType({ competitionsPromise }: { competitionsPromise: Promise<competition[]> }) {
    const [comps, setComps] = useState<competition[]>([])
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                setComps(await competitionsPromise);
            } catch {
                setError(true);
            }
        };
        fetchData();
    }, []);

    function getGameTypes(): string[] {
        const gameTypeMap: string[] = new Array;
        comps.forEach((comp: competition) => {
            if (!gameTypeMap.includes(comp.gameType)) {
                gameTypeMap.push(comp.gameType);
            }
        })
        return gameTypeMap;
    }

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
                    getGameTypes().map(gameType =>
                        <div key={gameType} className="basis-1/4">
                            <CompetitionList comps={FilterByGameType(gameType)} title={Translate(gameType)} />
                        </div>
                    )
                }
            </div>
        )
}
