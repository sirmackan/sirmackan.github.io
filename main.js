$(function() {
    $("#price").on("click", function() {
        $("#price").hide();
    });
    
    main();
    window.setInterval(main, 1000);
});

function main() {
    $("#boxes div").each(function() {
        var date = Date.parse($(this).attr("open-at"));
        
        if (date > Date.now()) {
            $(this).html("Öppnar om " + formatTimeUntilDate(date));
        } else {
            $(this).html(fromBase64($(this).attr("active-html")));
            $(this).css('cursor', 'pointer');
            $(this).css('background-color', 'rgba(0, 0, 0, 0.5)');
            
            $(this).off("click").on("click", function() {
                if (prompt("Lösenord") === $(this).attr("password")) {
                    $("#price").html(fromBase64($(this).attr("price-html")));
                    $("#price").show();
                }
            });
        }
    });
}

function formatTimeUntilDate(dateFuture) {
    let diffInSeconds = Math.abs(dateFuture - Date.now()) / 1000;
    
    // calculate days
    const days = Math.floor(diffInSeconds / 86400);
    diffInSeconds -= days * 86400;
    
    // calculate hours
    const hours = Math.floor(diffInSeconds / 3600) % 24;
    diffInSeconds -= hours * 3600;
    
    // calculate minutes
    const minutes = Math.floor(diffInSeconds / 60) % 60;
    diffInSeconds -= minutes * 60;
    
    // calculate seconds
    const seconds = Math.floor(diffInSeconds);
    
    difference = `${days} ` + (days === 1 ? "dag, " : "dagar, ");
    difference += `${hours} ` + (hours === 1 ? "timma, " : "timmar, ");
    difference += `${minutes} ` + (minutes === 1 ? "minut, " : "minuter, ");
    difference += `${seconds} ` + (seconds === 1 ? "sekund" : "sekunder");
    
    return difference;
}

function toBase64(string) {
    return btoa(toBinary(string));
}

function fromBase64(string) {
    return fromBinary(atob(string));
}

function toBinary(string) {
    const codeUnits = new Uint16Array(string.length);
    for (let i = 0; i < codeUnits.length; i++) {
        codeUnits[i] = string.charCodeAt(i);
    }
    return String.fromCharCode(...new Uint8Array(codeUnits.buffer));
}

function fromBinary(binary) {
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < bytes.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return String.fromCharCode(...new Uint16Array(bytes.buffer));
}