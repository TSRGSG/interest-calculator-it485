function calculate() {

    var balance = parseInt(document.getElementById("balance").value);
    var monthly = parseInt(document.getElementById("monthly").value);
    var interest = parseInt(document.getElementById("interest").value);
    var compound = parseInt(document.getElementById("compound").value);
    var year = parseInt(document.getElementById("year").value);
    
    var r = interest / 100;    
    var A = balance;
	
	var BottomLabel = ["0"];;
	var ActualAmount = ["0"];

	//Cleaning List
	$(mainList).empty();

	//Checking for Yearly, Semiannually, Quarterly, & Monthly.
    if (compound == 12){
		//Main Loop (Read Carefully)
        for (count = 1; count != year + 1; count++) {
        	A = (A * r) + parseInt(A);
            A += monthly * 12;
		
			//Appending to bottom of thet page
			$(mainList).append("<li>Year " + count + ": $" + addCommas(A.toFixed(2)) + "</li>");
	
			//Adding to array for graph
			BottomLabel.push("Year " + count);
			ActualAmount.push(A);
    	}
    } else if (compound == 6) {
        for (count = 1; count != (year * 2)+ 1; count++) {
        	A = (A * (r/2)) + parseInt(A);
            A += monthly * 6;
		
			//Appending to bottom of thet page
			$(mainList).append("<li>Semiannually " + count + ": $" + addCommas(A.toFixed(2)) + "</li>");
	
			//Adding to array for graph
			BottomLabel.push("Semiannually " + count);
			ActualAmount.push(A);
    	}	
    } else if (compound == 3) {
        for (count = 1; count != (year * 4) + 1; count++) {
        	A = (A * (r/4)) + parseInt(A);
            A += monthly * 3;
		
			//Appending to bottom of thet page
			$(mainList).append("<li>Quarter " + count + ": $" + addCommas(A.toFixed(2)) + "</li>");
	
			//Adding to array for graph
			BottomLabel.push("Quarter " + count);
			ActualAmount.push(A);
    	}
    } else if (compound == 1) {
        for (count = 1; count != (year * 12)+ 1; count++) {
        	A = (A * (r/12)) + parseInt(A);
            A += monthly * 1;
		
			//Appending to bottom of thet page
			$(mainList).append("<li>Month " + count + ": $" + addCommas(A.toFixed(2)) + "</li>");
	
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

	//Cleaning List
	$(period_list).empty();
	$(starting_balance_list).empty();
	$(interest_list).empty();
	$(principal_list).empty();
	$(ending_balance_list).empty();
	$(total_interest_list).empty();

	//Adding Headers to list
	$(period_list).append("<li>Month</li>");
	$(starting_balance_list).append("<li>Starting Balance</li>");
	$(interest_list).append("<li>Interest</li>");
	$(principal_list).append("<li>Principal</li>");
	$(ending_balance_list).append("<li>Ending Balance</li>");
	$(total_interest_list).append("<li>Total Interest</li>");


	//Loop for generating List
	for (var count = 1; count <= n; count++) {
		//Appending to period of the page
		$(period_list).append("<li>" + count + "</li>");

		//Appending to starting balance of the page
		$(starting_balance_list).append("<li>" + addCommas(A.toFixed(2)) + "</li>");

		//Calculating Interest
		I = A * i;
		//Appending to interest list of the page
		$(interest_list).append("<li>" + addCommas(I.toFixed(2)) + "</li>");

		//Calculating Principal
		P = payment - I;
		//Appending to principal list of the page
		$(principal_list).append("<li>" + addCommas(P.toFixed(2)) + "</li>");

		//Calculatin Ending Balance
		A = A - P;
		//Appending to ending balance list of the page
		$(ending_balance_list).append("<li>" + addCommas(A.toFixed(2)) + "</li>");

		//Calculating for total interest
		total_interest += I;
		//Appending to ending balance list of the page
		$(total_interest_list).append("<li>" + addCommas(total_interest.toFixed(2)) + "</li>");
	}

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