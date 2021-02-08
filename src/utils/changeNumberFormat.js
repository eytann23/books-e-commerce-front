//change number display format - with commas and two digitis after point
export const changeNumberDisplayFormat=(number)=>{
    let resultNumber=parseFloat(number)
    return resultNumber.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}