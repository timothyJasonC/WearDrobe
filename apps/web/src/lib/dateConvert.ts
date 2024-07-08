export function DateConvert(item:string) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const dateTime = new Date(item)
    const date = dateTime.getDate()
    const month = months[dateTime.getMonth()]
    const year = dateTime.getFullYear()
    const hours = dateTime.getHours()
    const minute = dateTime.getMinutes()
    const formatedDate = {date, month, year, hours,minute}
    return (formatedDate)
}