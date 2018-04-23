function calculate() {

    var balance = parseInt(document.getElementById("balance").value);
    var monthly = parseInt(document.getElementById("monthly").value);
    var interest = parseInt(document.getElementById("interest").value);
    var compound = parseInt(document.getElementById("compound").value);
    var year = parseInt(document.getElementById("year").value);
    
    var r = interest / 100;    
    var A = balance;
    var s = 0;
	var d = 0;

	//For calendar
	How_Many_Times = year * 12;
	
	var BottomLabel = ["0"];
    var ActualAmount = ["0"];

    //Cleaning Table and adding header
	$("#table").show();
    $(tbody).empty();

	//Checking for Yearly, Semiannually, Quarterly, & Monthly.
    if (compound == 12){
		//Main Loop (Read Carefully)
        for (count = 1; count != year + 1; count++) {
            s = A;
            A = (A * r) + parseInt(A);
			d = monthly * 12;
            A += d;
            
            //Table Injection
            $(tbody).append("<tr>" + "<td>" + count
                + "</td>" + "<td>" + addCommas(s.toFixed(2))
                + "</td>" + "<td>" + addCommas((A - s - d).toFixed(2))
                + "</td>" + "<td>" + addCommas(d.toFixed(2))
                + "</td>" + "<td>" + addCommas(A.toFixed(2))
                + "</td>" + "</tr>");
	
			//Adding to array for graph
			BottomLabel.push("Year " + count);
			ActualAmount.push(A);
    	}
    } else if (compound == 6) {
        for (count = 1; count != (year * 2) + 1; count++) {
            s = A;
            A = (A * (r / 2)) + parseInt(A);
            d = monthly * 6
            A += d;

            //Table Injection
            $(tbody).append("<tr>" + "<td>" + count
                + "</td>" + "<td>" + addCommas(s.toFixed(2))
                + "</td>" + "<td>" + addCommas((A - s -  d).toFixed(2))
                + "</td>" + "<td>" + addCommas(d.toFixed(2))
                + "</td>" + "<td>" + addCommas(A.toFixed(2))
                + "</td>" + "</tr>");
	
			//Adding to array for graph
			BottomLabel.push("Semiannually " + count);
			ActualAmount.push(A);
    	}	
    } else if (compound == 3) {
        for (count = 1; count != (year * 4) + 1; count++) {
            s = A;
        	A = (A * (r/4)) + parseInt(A);
            d = monthly * 3;
            A += d;

            //Table Injection
            $(tbody).append("<tr>" + "<td>" + count
                + "</td>" + "<td>" + addCommas(s.toFixed(2))
                + "</td>" + "<td>" + addCommas((A - s - d).toFixed(2))
                + "</td>" + "<td>" + addCommas(d.toFixed(2))
                + "</td>" + "<td>" + addCommas(A.toFixed(2))
                + "</td>" + "</tr>");
	
			//Adding to array for graph
			BottomLabel.push("Quarter " + count);
			ActualAmount.push(A);
    	}
    } else if (compound == 1) {
        for (count = 1; count != (year * 12) + 1; count++) {
            s = A;
        	A = (A * (r/12)) + parseInt(A);
            d = monthly * 1;
            A += d;

            //Table Injection
            $(tbody).append("<tr>" + "<td>" + count
                + "</td>" + "<td>" + addCommas(s.toFixed(2))
                + "</td>" + "<td>" + addCommas((A - s - d).toFixed(2))
                + "</td>" + "<td>" + addCommas(d.toFixed(2))
                + "</td>" + "<td>" + addCommas(A.toFixed(2))
                + "</td>" + "</tr>");
	
			//Adding to array for graph
			BottomLabel.push("Month " + count);
			ActualAmount.push(A);
			}		
	} else {
		document.getElementById("total").value = "Compounding can be only 12 (Yearly), 3 (Quarterly), & 1 (Monthly)";
		//break;
	}
	
	//Writing to main Total
	document.getElementById("total").value = "$" + addCommas(A.toFixed(2));
	
	//Graphing
	var ctx = document.getElementById('mainChart').getContext('2d');
	var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: BottomLabel,
        datasets: [{
            label: "Your Interest Earning",
            backgroundColor: 'rgb(70,130,180)',
            borderColor: 'rgb(70,130,180)',
            data: ActualAmount,
        }]
    },

    // Configuration options go here
    options: {}
	});
	//Graphing END
}

//Calendar
var saveAs = saveAs || function (e) { "use strict"; if (typeof e === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) { return } var t = e.document, n = function () { return e.URL || e.webkitURL || e }, r = t.createElementNS("http://www.w3.org/1999/xhtml", "a"), o = "download" in r, a = function (e) { var t = new MouseEvent("click"); e.dispatchEvent(t) }, i = /constructor/i.test(e.HTMLElement) || e.safari, f = /CriOS\/[\d]+/.test(navigator.userAgent), u = function (t) { (e.setImmediate || e.setTimeout)(function () { throw t }, 0) }, s = "application/octet-stream", d = 1e3 * 40, c = function (e) { var t = function () { if (typeof e === "string") { n().revokeObjectURL(e) } else { e.remove() } }; setTimeout(t, d) }, l = function (e, t, n) { t = [].concat(t); var r = t.length; while (r--) { var o = e["on" + t[r]]; if (typeof o === "function") { try { o.call(e, n || e) } catch (a) { u(a) } } } }, p = function (e) { if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)) { return new Blob([String.fromCharCode(65279), e], { type: e.type }) } return e }, v = function (t, u, d) { if (!d) { t = p(t) } var v = this, w = t.type, m = w === s, y, h = function () { l(v, "writestart progress write writeend".split(" ")) }, S = function () { if ((f || m && i) && e.FileReader) { var r = new FileReader; r.onloadend = function () { var t = f ? r.result : r.result.replace(/^data:[^;]*;/, "data:attachment/file;"); var n = e.open(t, "_blank"); if (!n) e.location.href = t; t = undefined; v.readyState = v.DONE; h() }; r.readAsDataURL(t); v.readyState = v.INIT; return } if (!y) { y = n().createObjectURL(t) } if (m) { e.location.href = y } else { var o = e.open(y, "_blank"); if (!o) { e.location.href = y } } v.readyState = v.DONE; h(); c(y) }; v.readyState = v.INIT; if (o) { y = n().createObjectURL(t); setTimeout(function () { r.href = y; r.download = u; a(r); h(); c(y); v.readyState = v.DONE }); return } S() }, w = v.prototype, m = function (e, t, n) { return new v(e, t || e.name || "download", n) }; if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) { return function (e, t, n) { t = t || e.name || "download"; if (!n) { e = p(e) } return navigator.msSaveOrOpenBlob(e, t) } } w.abort = function () { }; w.readyState = w.INIT = 0; w.WRITING = 1; w.DONE = 2; w.error = w.onwritestart = w.onprogress = w.onwrite = w.onabort = w.onerror = w.onwriteend = null; return m }(typeof self !== "undefined" && self || typeof window !== "undefined" && window || this.content); if (typeof module !== "undefined" && module.exports) { module.exports.saveAs = saveAs } else if (typeof define !== "undefined" && define !== null && define.amd !== null) { define("FileSaver.js", function () { return saveAs }) }
var ics = function (e, t) { "use strict"; { if (!(navigator.userAgent.indexOf("MSIE") > -1 && -1 == navigator.userAgent.indexOf("MSIE 10"))) { void 0 === e && (e = "default"), void 0 === t && (t = "Calendar"); var r = -1 !== navigator.appVersion.indexOf("Win") ? "\r\n" : "\n", n = [], i = ["BEGIN:VCALENDAR", "PRODID:" + t, "VERSION:2.0"].join(r), o = r + "END:VCALENDAR", a = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"]; return { events: function () { return n }, calendar: function () { return i + r + n.join(r) + o }, addEvent: function (t, i, o, l, u, s) { if (void 0 === t || void 0 === i || void 0 === o || void 0 === l || void 0 === u) return !1; if (s && !s.rrule) { if ("YEARLY" !== s.freq && "MONTHLY" !== s.freq && "WEEKLY" !== s.freq && "DAILY" !== s.freq) throw "Recurrence rrule frequency must be provided and be one of the following: 'YEARLY', 'MONTHLY', 'WEEKLY', or 'DAILY'"; if (s.until && isNaN(Date.parse(s.until))) throw "Recurrence rrule 'until' must be a valid date string"; if (s.interval && isNaN(parseInt(s.interval))) throw "Recurrence rrule 'interval' must be an integer"; if (s.count && isNaN(parseInt(s.count))) throw "Recurrence rrule 'count' must be an integer"; if (void 0 !== s.byday) { if ("[object Array]" !== Object.prototype.toString.call(s.byday)) throw "Recurrence rrule 'byday' must be an array"; if (s.byday.length > 7) throw "Recurrence rrule 'byday' array must not be longer than the 7 days in a week"; s.byday = s.byday.filter(function (e, t) { return s.byday.indexOf(e) == t }); for (var c in s.byday) if (a.indexOf(s.byday[c]) < 0) throw "Recurrence rrule 'byday' values must include only the following: 'SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'" } } var g = new Date(l), d = new Date(u), f = new Date, S = ("0000" + g.getFullYear().toString()).slice(-4), E = ("00" + (g.getMonth() + 1).toString()).slice(-2), v = ("00" + g.getDate().toString()).slice(-2), y = ("00" + g.getHours().toString()).slice(-2), A = ("00" + g.getMinutes().toString()).slice(-2), T = ("00" + g.getSeconds().toString()).slice(-2), b = ("0000" + d.getFullYear().toString()).slice(-4), D = ("00" + (d.getMonth() + 1).toString()).slice(-2), N = ("00" + d.getDate().toString()).slice(-2), h = ("00" + d.getHours().toString()).slice(-2), I = ("00" + d.getMinutes().toString()).slice(-2), R = ("00" + d.getMinutes().toString()).slice(-2), M = ("0000" + f.getFullYear().toString()).slice(-4), w = ("00" + (f.getMonth() + 1).toString()).slice(-2), L = ("00" + f.getDate().toString()).slice(-2), O = ("00" + f.getHours().toString()).slice(-2), p = ("00" + f.getMinutes().toString()).slice(-2), Y = ("00" + f.getMinutes().toString()).slice(-2), U = "", V = ""; y + A + T + h + I + R != 0 && (U = "T" + y + A + T, V = "T" + h + I + R); var B, C = S + E + v + U, j = b + D + N + V, m = M + w + L + ("T" + O + p + Y); if (s) if (s.rrule) B = s.rrule; else { if (B = "rrule:FREQ=" + s.freq, s.until) { var x = new Date(Date.parse(s.until)).toISOString(); B += ";UNTIL=" + x.substring(0, x.length - 13).replace(/[-]/g, "") + "000000Z" } s.interval && (B += ";INTERVAL=" + s.interval), s.count && (B += ";COUNT=" + s.count), s.byday && s.byday.length > 0 && (B += ";BYDAY=" + s.byday.join(",")) } (new Date).toISOString(); var H = ["BEGIN:VEVENT", "UID:" + n.length + "@" + e, "CLASS:PUBLIC", "DESCRIPTION:" + i, "DTSTAMP;VALUE=DATE-TIME:" + m, "DTSTART;VALUE=DATE-TIME:" + C, "DTEND;VALUE=DATE-TIME:" + j, "LOCATION:" + o, "SUMMARY;LANGUAGE=en-us:" + t, "TRANSP:TRANSPARENT", "END:VEVENT"]; return B && H.splice(4, 0, B), H = H.join(r), n.push(H), H }, download: function (e, t) { if (n.length < 1) return !1; t = void 0 !== t ? t : ".ics", e = void 0 !== e ? e : "calendar"; var a, l = i + r + n.join(r) + o; if (-1 === navigator.userAgent.indexOf("MSIE 10")) a = new Blob([l]); else { var u = new BlobBuilder; u.append(l), a = u.getBlob("text/x-vCalendar;charset=" + document.characterSet) } return saveAs(a, e + t), l }, build: function () { return !(n.length < 1) && i + r + n.join(r) + o } } } console.log("Unsupported Browser") } };

cal = ics();
var How_Many_Times = 0;
var rrule = { freq: "MONTHLY", count: How_Many_Times, interval: 1 };
cal.addEvent('Bank Deposit Day', 'This is a reminder for your banking needs.', 'HAB', today_date(), today_date(), rrule);
//Calendar ENDS

function calculate_loan() {
    var loan = parseInt(document.getElementById("loan").value);
    var interest = parseInt(document.getElementById("interest").value);
    var year = parseInt(document.getElementById("year").value);

	//Adding for calendar
	How_Many_Times = year * 12;

	//Getting some variable needed to find monthly payment
	var i = (interest/100) / 12;
	var n = 12 * year;
	
	//Calculating actual monthly payment amount
	var discount_factor = ((Math.pow((1 + i), n)) - 1) / (i * Math.pow((1 + i), n));
	var payment = loan / discount_factor;

	//Writing to main Monthly
	document.getElementById("monthly").value = "$" + addCommas(payment.toFixed(2));

	//Getting some variable for loop to print the list
	var A = loan;
	var I = 0;
	var P = 0;
	var total_interest = 0;
	var total_payment = 0;

	//Cleaning Table and adding header
	$("#table").show();
	$(tbody).empty();

	//Creating Array for graphing
	var bottom_label = ["Control"];
	var ending_balance = ["0"];
	var cumulative_payment = ["0"];

	//Loop for generating List
	for (var count = 1; count <= n; count++) {
		//Appending Graph
		bottom_label.push(count);

		//Appending Graph
		ending_balance.push(A.toFixed(2))

		//Calculating Interest
		I = A * i;

		//Calculating Principal
		P = payment - I;

		//Calculatin Ending Balance
		A = A - P;

		//Calculating for total interest
		total_interest += I;

		//Appending Graph for total payment
		total_payment += P;
		cumulative_payment.push((total_interest + total_payment).toFixed(2))

		//Table Injection
		$(tbody).append("<tr>" + "<td>" + count 
			+ "</td>" + "<td>" + addCommas(A.toFixed(2))
			+ "</td>" + "<td>" + addCommas(I.toFixed(2))
			+ "</td>" + "<td>" + addCommas(P.toFixed(2))
			+ "</td>" + "<td>" + addCommas(A.toFixed(2))
			+ "</td>" + "<td>" + addCommas(total_interest.toFixed(2))
			+ "</td>" + "</tr>");
	}

	//Graphing TEST
	var densityCanvas = document.getElementById("mainChart");

	var ending_bar = {
		label: 'Ending Balance for the Period',
		data: [0],
		backgroundColor: 'rgba(0, 99, 132, 0.6)',
		borderWidth: 0,
	};
	ending_bar.data = ending_balance;

	var interest_bar = {
		label: 'Cumulative Interest Payment for the Period',
		data: [0],
		backgroundColor: 'rgba(99, 132, 0, 0.6)',
		borderWidth: 0,
	};
	interest_bar.data = cumulative_payment;

	var label_bar = {
		labels: ["Test"],
		datasets: [ending_bar, interest_bar]
	};
	label_bar.labels = bottom_label;

	var chartOptions = {
		scales: {
			xAxes: [{
				barPercentage: 1,
				categoryPercentage: 0.6
			}],
			yAxes: [{}]
		}
	};

	var barChart = new Chart(mainChart, {
		type: 'bar',
		data: label_bar,
		options: chartOptions
	});
	//Graphing END
}

//Calculator foe finding monthly saving to reach certain goal
function calculate_goal() {
	var goal = parseInt(document.getElementById("goal").value);
	var initial = parseInt(document.getElementById("initial").value);
	var year = parseInt(document.getElementById("year").value);
	var interest = parseInt(document.getElementById("interest").value);
	var compound = parseInt(document.getElementById("compound").value);
	
	//Writing to main Total
	document.getElementById("monthly").value = "Hello World";
}

function Sheet(tableID) {
	TableExport(document.getElementsByTagName("table"), {
		headers: true,                              // (Boolean), display table headers (th or td elements) in the <thead>, (default: true)
		footers: true,                              // (Boolean), display table footers (th or td elements) in the <tfoot>, (default: false)
		formats: ['xlsx', 'csv', 'txt'],            // (String[]), filetype(s) for the export, (default: ['xlsx', 'csv', 'txt'])
		filename: 'id',                             // (id, String), filename for the downloaded file, (default: 'id')
		bootstrap: false,                           // (Boolean), style buttons using bootstrap, (default: true)
		exportButtons: true,                        // (Boolean), automatically generate the built-in export buttons for each of the specified formats (default: true)
		position: 'bottom',                         // (top, bottom), position of the caption element relative to table, (default: 'bottom')
		ignoreRows: null,                           // (Number, Number[]), row indices to exclude from the exported file(s) (default: null)
		ignoreCols: null,                           // (Number, Number[]), column indices to exclude from the exported file(s) (default: null)
		trimWhitespace: true                        // (Boolean), remove all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s) (default: false)
	});
}

function today_date() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();

	if (dd < 10) {
		dd = '0' + dd
	}

	if (mm < 10) {
		mm = '0' + mm
	}

	today = mm + '/' + dd + '/' + yyyy;
	return today;
}

//Adding comma to number
function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function test() {
	document.getElementById("test").innerHTML = "YOU CLICKED ME!";
	excel_export(table);
}