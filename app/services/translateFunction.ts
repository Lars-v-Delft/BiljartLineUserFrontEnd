export default function Translate(english: string): string {
    let translations = new Map<string, string>();

    translations.set("STRAIGHT_RAIL", "Libre");
    translations.set("BALKLINE", "Kaderspel");
    translations.set("ONE_CUSHION", "Bandstoten");
    translations.set("THREE_CUSHION", "Driebanden")

    if (translations.has(english))
        return translations.get(english) as string;
    else
        return english;
}