import Link from "next/link";

export default function TeamList({ teams }: { teams: team[] }) {
    return (
        <table className="w-full text-left">
            <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                <tr>
                    <th scope="col" className="px-3 py-3">
                        Team
                    </th>
                </tr>
            </thead>
            <tbody className="text-sm">
                {teams.map((team, index) =>
                    <tr className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} border-b`} key={team.id}>
                        <td scope="row" className="px-3 py-2 font-medium text-gray-900">
                            <Link href="">{team.name}</Link>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>

    )
}