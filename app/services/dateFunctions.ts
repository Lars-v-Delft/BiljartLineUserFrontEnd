export function getISODate(dayOffset: number) {
    const today = new Date();
    const adjustedDay = new Date();
    adjustedDay.setDate(today.getDate() + dayOffset);

    const day = adjustedDay.getDate().toString().padStart(2, '0');
    const month = (adjustedDay.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based, so we add 1
    const year = adjustedDay.getFullYear();

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}