flatpickr("#birthdate", {
    dateFormat: "d-m-Y"  // Day-Month-Year format
});
ids = {
    "1":"one",
    "2":"two",
    "3":"three",
    "4":"four",
    "5":"five",
    "6":"six",
    "7":"seven",
    "8":"eight",
    "9":"nine",
}
mahadasha = {
    "1":"sun",
    "2":"moon",
    "4":"Jup",
    "5":"sun",
    "6":"sun",
    "7":"sun",
    "8":"sun",
    "9":"sun"
}
function load(){
    const currentYear = new Date().getFullYear();
    document.getElementById("inputyear").value = currentYear;

    // Retrieve the date string from localStorage
    var getdat = localStorage.getItem('birthdate');

    if (getdat !== null) {
        document.getElementById("birthdate")._flatpickr.setDate(getdat);
        document.getElementById("mainbutton").click();
    }
}
function formatDateDDMMYYYY(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}
function root(){
    var num = String(document.getElementById("birthdate").value);
    num = num.split("-");
    num = num[0];
    if(Number(num)>9){
        num = addn(num);
        //console.log(num)
        return Number(num);
    }else{
        //console.log(num)
        return Number(num);
    }
}
function dest(){
    var numb = String(document.getElementById("birthdate").value);
    numb = numb.split("-");
    //numb = numb.split("");
    return addn(add(numb[0])+add(numb[1])+add(numb[2]));
}

function basic(){
    clear();
    const currentYears = Number(document.getElementById("inputyear").value);
    document.getElementById("info").innerHTML = "Root: "+root().toString()+" Destiny: "+dest().toString();
    document.getElementById(ids[root().toString()]).innerHTML = document.getElementById(ids[root().toString()]).innerHTML+root().toString();
    document.getElementById(ids[dest().toString()]).innerHTML = document.getElementById(ids[dest().toString()]).innerHTML+dest().toString();
    //console.log(document.getElementById("birthdate").value);
    var numb = String(document.getElementById("birthdate").value);//.replace("0","");
    //console.log(numb);
    numb = numb.split("-");
    //console.log(numb);
    var year = numb[2].split("");
    year = [year[2],year[3]];
    //console.log(year)
    for(i=0;i<year.length;i++){
        if(year[i]!="0"){
            document.getElementById(ids[year[i]]).innerHTML = document.getElementById(ids[year[i]]).innerHTML+year[i];
        //console.log(year);
        }
    }
    month = numb[1].split("");
    for(i=0;i<month.length;i++){
        if(month[i]!="0"){
            document.getElementById(ids[month[i]]).innerHTML = document.getElementById(ids[month[i]]).innerHTML+month[i];
        //console.log(month);
        }
    }
    if(root() != Number(numb[0])&&Number(numb[0])/root()!=10){
        day = numb[0].split("");
        //console.log(Number(numb[0]));
        for(i=0;i<day.length;i++){
            if(day[i]!="0"){
                document.getElementById(ids[day[i]]).innerHTML = document.getElementById(ids[day[i]]).innerHTML+day[i];
            //console.log(day);
            }
        }
    }

    cloneTablesWithMahadashaAndDay(currentYears, currentYears+20, Number(numb[2]), root(), String(document.getElementById("birthdate").value).split("-"))
    //console.log(year);
    localStorage.setItem('birthdate', document.getElementById('birthdate').value); //save data

}
function add(num){
    var numb = num.toString().split('').map(function(item) {
        return parseInt(item, 10);
    });
    numb = numb.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return numb
}
function addn(nums){
    var numb = nums.toString().split('').map(function(item) {
        return parseInt(item, 10);
    });
    numb = numb.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
   if(numb>9){
    var numb = numb.toString().split("")
    .reduce((sum, digit) =>
        sum + parseInt(digit), 0);
    return numb
   }else{
    return numb
   }
}
function clear(){
    document.getElementById("one").innerHTML = "&nbsp;";
    document.getElementById("two").innerHTML = "&nbsp;";
    document.getElementById("three").innerHTML = "&nbsp;";
    document.getElementById("four").innerHTML = "&nbsp;";
    document.getElementById("five").innerHTML = "&nbsp;";
    document.getElementById("six").innerHTML = "&nbsp;";
    document.getElementById("seven").innerHTML = "&nbsp;";
    document.getElementById("eight").innerHTML = "&nbsp;";
    document.getElementById("nine").innerHTML = "&nbsp;";
    document.getElementById("tableContainer").innerHTML = "";
}
function maha(){
    var numb = String(document.getElementById("birthdate").value);
    numb = numb.split("-");
    year = Number(numb[2]);
    for(i=1;i<=45;i++){

    }
}
function test(){
    console.log(calculateMahadashaByYear(2024,2030,2025,2069));
}