const dateArray = new Date().toLocaleDateString("en-US","Asia/Kolkata").split("/");
console.log(dateArray);
const date1 = parseInt(dateArray[1]);
        const month = parseInt(dateArray[0]);;
        const year = parseInt(dateArray[2]);;
        console.log(date1);
        console.log(month);
        console.log(year);
console.log(date1);
