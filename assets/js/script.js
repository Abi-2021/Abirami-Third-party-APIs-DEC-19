$(document).ready(function () {
    const getTodaysDate = function () {
        $('#currentDay').text(moment().format('dddd, MMMM Do YYYY H:mm:ss a'));
    };
    setInterval(getTodaysDate, 1000);
});

const getCurrentHour = () => {
    return moment().format('HH');
};

var hourEle = $('.hour');
var textAreaEle = $('textarea');

// Retrieve data from local storage
const schedulerData = JSON.parse(localStorage.getItem('scheduler')) || {};

const buildRowBlock = () => {
    const timeBlockEle = $('<div>', { class: 'time-block' });
    const rowBlockEle = $('<div>', { class: 'row' });
    const firstColEle = $('<div>', { class: 'col-1 pr-0' });
    const middleColEle = $('<div>', { class: 'col-10 px-0' });
    const lastColEle = $('<div>', { class: 'col-1 pl-0' });
    hourEle = $('<div>', { class: 'hour' });
    firstColEle.append(hourEle);
    textAreaEle = $('<textarea>', { type: 'text' });
    middleColEle.append(textAreaEle);
    const saveBtnEle = $('<button>', { class: 'saveBtn' });
    const saveBtnIconEle = $('<i>', { class: 'fas fa-save' });
    saveBtnEle.append(saveBtnIconEle);
    lastColEle.append(saveBtnEle);
    rowBlockEle.append(firstColEle, middleColEle, lastColEle);
    timeBlockEle.append(rowBlockEle);
    $('.container').append(timeBlockEle);
};

// Build Scheduler

for (var i = 0; i < 24; i++) {
    buildRowBlock();
    var schedularkey;
    const currentHour = getCurrentHour();
    if (i < 12) {
        schedularkey = i + 'AM';
        hourEle.text(i + 'AM');
    } else {
        schedularkey = (i % 12) + 'PM';
        hourEle.text((i % 12) + 'PM');
    }

    if (currentHour > i) {
        textAreaEle.addClass('past');
    } else if (currentHour == i) {
        textAreaEle.addClass('present');
    } else {
        textAreaEle.addClass('future');
    }

    if (schedulerData[schedularkey]) {
        textAreaEle.val(schedulerData[schedularkey]);
    }
}

$('.saveBtn').on('click', function (event) {
    event.preventDefault();
    const data = $(this).parent().siblings().children('textarea').val();
    const hour = $(this).parent().siblings().children('.hour').text();
    const obj = { [hour]: data };
    const schedulerData = JSON.parse(localStorage.getItem('scheduler')) || {};
    if (schedulerData) {
        localStorage.setItem(
            'scheduler',
            JSON.stringify({ ...schedulerData, ...obj })
        );
    } else {
        localStorage.setItem('scheduler', JSON.stringify(obj));
    }
});
