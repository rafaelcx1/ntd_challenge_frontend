export const formatDate = (date: Date | null) => {
    if (!date) {
        return null
    }

    const pad = (number: number) => (number < 10 ? '0' + number : number);

    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}