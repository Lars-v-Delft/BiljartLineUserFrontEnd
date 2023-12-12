export function getCurrentFormattedDateString(dayOffset: number): string {
    const today = new Date();
    const adjustedDay = new Date();
    adjustedDay.setDate(today.getDate() + dayOffset);

    const formattedDate: string = getFormattedDateString(adjustedDay);
    return formattedDate;
}

export function getFormattedDateString(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based, so we add 1
    const year = date.getFullYear();

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}