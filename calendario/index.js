var monthName = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
                 "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

var now = new Date();
var day = now.getDate();
var month = now.getMonth();
var currentMonth = month;
var year = now.getFullYear();

initCalendar();
console.log(startDay());

function initCalendar(){
    $("#text_day").text(day);
    $("#text_month").text(monthName[currentMonth]);
    $("#text_month_02").text(monthName[month]);
    $("#text_year").text(year);

    $(".item_day").remove();

    for(let i = startDay(); i>0; i--){
        $(".container_days").append(`<span class = "week_days_item item_day prev_days">${getTotalDays(month-1)-(i-1)}</span>`);
    }

    for (let i=1; i<=getTotalDays(month); i++){
        if (i==day && month==currentMonth){
            $(".container_days").append(`<span class="week_days_item item_day today">${i}</span>`);
        } else {
            $(".container_days").append(`<span class = "week_days_item item_day">${i}</span>`);
        }
    }
};

function getNextMonth(){
    if(month !== 11){
        month++;
    } else {
        year++;
        month = 0;
    }
    initCalendar();
}

function getPrevMonth(){
    if (month !== 0){
        month--;
    } else {
        year--;
        month = 11;
    }
    initCalendar();
}

function startDay (){
    var start = new Date(year, month, 1);
    return start.getDay();
}

function leapYear(){
    return((year % 400 === 0) || (year % 4 === 0) && (year % 100 !== 0));
}

function getTotalDays(m){
    if (m === -1) m = 11;

    var numMonthReal = m +1;

    if (numMonthReal === 1 || numMonthReal === 3 || numMonthReal === 5 || numMonthReal === 7 ||
        numMonthReal === 8 || numMonthReal === 10 || numMonthReal === 12 ){
        return 31;
    } else if (numMonthReal === 4 || numMonthReal === 6 || numMonthReal === 9 || numMonthReal === 11){
        return 30;
    } else {
        return leapYear() ? 29:28;
    }
}

$("#next_month").click(function(){
    getNextMonth();
});

$("#last_month").click(function(){
    getPrevMonth();
});