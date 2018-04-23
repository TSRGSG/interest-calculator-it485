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
	
	var BottomLabel = ["0"];
    var ActualAmount = ["0"];

    //Cleaning Table and adding header
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

    //Generating Excel Table to download
    //excel_export(table);
}


function calculate_loan() {
    var loan = parseInt(document.getElementById("loan").value);
    var interest = parseInt(document.getElementById("interest").value);
    var year = parseInt(document.getElementById("year").value);

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

	//Generating Excel Table to download
    //excel_export(table);
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

function excel_export(tableID) {
	$(tableID).tableExport({
		headers: true,                              // (Boolean), display table headers (th or td elements) in the <thead>, (default: true)
		footers: true,                              // (Boolean), display table footers (th or td elements) in the <tfoot>, (default: false)
		formats: ['xlsx', 'csv', 'txt'],            // (String[]), filetype(s) for the export, (default: ['xlsx', 'csv', 'txt'])
		filename: 'id',                             // (id, String), filename for the downloaded file, (default: 'id')
		bootstrap: false,                           // (Boolean), style buttons using bootstrap, (default: true)
		exportButtons: true,                        // (Boolean), automatically generate the built-in export buttons for each of the specified formats (default: true)
		position: 'top',                            // (top, bottom), position of the caption element relative to table, (default: 'bottom')
		ignoreRows: null,                           // (Number, Number[]), row indices to exclude from the exported file(s) (default: null)
		ignoreCols: null,                           // (Number, Number[]), column indices to exclude from the exported file(s) (default: null)
		trimWhitespace: true                        // (Boolean), remove all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s) (default: false)
	});

	table.update({
		filename: "tableID"     // pass in a new set of properties
	});
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