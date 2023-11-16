export default function weekdayFunction(weekdayId: number): string {
    let weekdayMap = new Map<number, string>();

    weekdayMap.set(1, "Maandag");
    weekdayMap.set(2, "Dinsdag");
    weekdayMap.set(3, "Woensdag");
    weekdayMap.set(4, "Donderdag");
    weekdayMap.set(5, "Vrijdag");
    weekdayMap.set(6, "Zaterdag");
    weekdayMap.set(7, "Zondag");

    if (weekdayMap.has(weekdayId))
        return weekdayMap.get(weekdayId) as string;
    else
        return weekdayId.toString();
}
