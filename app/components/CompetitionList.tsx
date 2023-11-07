import Link from "next/link";

export default function CompetitionList({ comps, title }: { comps: competition[], title: string }) {
    return (
        <div>
            <ul className="mx-2 border rounded-lg border-gray-600">
                <li className="text-center text-lg font-semibold py-2 bg-gray-700 text-white  rounded-t-lg">{title}</li>
                {comps.map(comp =>
                    <li key={comp.id} className="px-4 py-2 border-t border-gray-600">
                        <Link className="text-purple-950 font-medium underline" href={`${comp.federationId}/competities/${comp.id}`}>{comp.name}</Link> <br />
                        <p className="text-sm font-normal">{comp.startDate.toLocaleDateString()}</p>
                    </li>
                )}
            </ul>
        </div>
    )
}