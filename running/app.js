function b() {

}

$.when($.ready).then(() => {
    raceDate = moment('2024-05-18');
    raceDistance = 21;

    distancePerWeek = [raceDistance * 0.5, raceDistance * 0.75, raceDistance];

    for (let i = 0; i < 17; i++) {
        distancePerWeek.push(distancePerWeek[distancePerWeek.length - 1] / 1.1);
    }

    for (let i = distancePerWeek.length - 1; i >= 0; i--) {
        trainingWeek = raceDate.clone().subtract(i, 'weeks');


        $('table').append(`<tr><td nowrap>${trainingWeek.startOf('isoWeek').format('YYYY-MM-DD')}</td><td>${(distancePerWeek[i] * .8).toFixed(1)}</td><td>${(distancePerWeek[i] * .2).toFixed(1)}</td></tr>`);
    }

    $('table').append(`<tr><td>${raceDate.format('YYYY-MM-DD')}</td><td colspan="2">Tävling!</td></tr>`);

    console.log(distancePerWeek);
});