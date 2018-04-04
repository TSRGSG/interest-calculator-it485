function calculate() {

    var balance = document.getElementById("balance").value;
    var monthly = document.getElementById("monthly").value;
    var interest = document.getElementById("interest").value;
    var compound = document.getElementById("compound").value;
    var year = document.getElementById("year").value;

    var P = parseInt(balance);
    var R = parseInt(interest);
    var n = parseInt(compound);
    var r = R / 100;
    var t = parseInt(year);

    m = monthly;
    var A = parseInt(P);
	
	var BottomLabel = ["0"];;
	var ActualAmount = ["0"];

	//Cleaning List
	$(mainList).empty();

	//Checking for Yearly, Semiannually, Quarterly, & Monthly.
	if (parseInt(n) == 12){
		//Main Loop (Read Carefully)
		for (count = 1; count != t + 1; count++) {
			A = (A * r) + parseInt(A);
			A += parseInt(m) * 12;
		
			//Appending to bottom of thet page
			$(mainList).append("<li>Year " + count + ": $" + addCommas(Math.round(A)) + "</li>");
	
			//Adding to array for graph
			BottomLabel.push("Year " + count);
			ActualAmount.push(A);
		}
	} else if (n == 6) {
		for (count = 1; count != (t * 2)+ 1; count++) {
			A = (A * (r/2)) + parseInt(A);
			A += parseInt(m) * 6;
		
			//Appending to bottom of thet page
			$(mainList).append("<li>Semiannually " + count + ": $" + addCommas(Math.round(A)) + "</li>");
	
			//Adding to array for graph
			BottomLabel.push("Semiannually " + count);
			ActualAmount.push(A);
		}	
	} else if (n == 3) {
		for (count = 1; count != (t * 4) + 1; count++) {
			A = (A * (r/4)) + parseInt(A);
			A += parseInt(m) * 3;
		
			//Appending to bottom of thet page
			$(mainList).append("<li>Quarter " + count + ": $" + addCommas(Math.round(A)) + "</li>");
	
			//Adding to array for graph
			BottomLabel.push("Quarter " + count);
			ActualAmount.push(A);
			}
	} else if (n == 1) {
		for (count = 1; count != (t * 12)+ 1; count++) {
			A = (A * (r/12)) + parseInt(A);
			A += parseInt(m) * 1;
		
			//Appending to bottom of thet page
			$(mainList).append("<li>Month " + count + ": $" + addCommas(Math.round(A)) + "</li>");
	
			//Adding to array for graph
			BottomLabel.push("Month " + count);
			ActualAmount.push(A);
			}		
	} else {
		document.getElementById("total").value = "Compounding can be only 12 (Yearly), 3 (Quarterly), & 1 (Monthly)";
		//break;
	}
	
	//Writing to main Total
    document.getElementById("total").value = "$" + addCommas(Math.round(A));
	
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

function calculateDeposit() {
	var goal = document.getElementById("goal").value;
	var initial = document.getElementById("initial").value;
	var time = document.getElementById("time").value;
	var interest = document.getElementById("interest").value;
	var compound = document.getElementById("compound").value;

	var gl = parseInt(goal);
	var il = parseInt(initial);
	var tm = parseInt(time);
	var rt = parseInt(interest);
	var td = parseInt(compound);


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