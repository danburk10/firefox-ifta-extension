// Get references to elements
const largeTextEl = document.getElementById("largeText");
const charInputEl = document.getElementById("charInput");
const runButton = document.getElementById("btn1");
const clearButton = document.getElementById("btn2");
//var jsonString;

// --- Event listeners ---
runButton.addEventListener("click", handleRunScript);
clearButton.addEventListener("click", runClearFormOnPage);

// --- Functions ---

async function handleRunScript() {
  const largeText = largeTextEl.value.trim(); //text input (csv/tsv)
  const charInput = charInputEl.value.trim(); //delimiter
  //jsonString = txtJSON(largeText,charInput);
  //console.log(jsonString);


  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  await browser.scripting.executeScript({
    target: { tabId: tab.id },
    func: fillForm(jsonString, dropDowns)
  });
}


// This injects the clearForm() code into the current page
async function runClearFormOnPage() {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  await browser.scripting.executeScript({
    target: { tabId: tab.id },
    func: clearForm
  });
}


function sayHello() {
    console.log("hello");
}

//Automate IFTA Form Completion


//dropdowns is created from the ifta site and the order of the indicies
var dropDowns = [
"",
"AB-ALBERTA",
"AL-ALABAMA",
"AR-ARKANSAS",
"AZ-ARIZONA",
"BC-BRITISH COLUMBIA",
"CA-CALIFORNIA",
"CO-COLORADO",
"CT-CONNECTICUT",
"DE-DELAWARE",
"FL-FLORIDA",
"GA-GEORGIA",
"IA-IOWA",
"ID-IDAHO",
"IL-ILLINOIS",
"IN-INDIANA",
"IN-INDIANA              Surcharge",
"KS-KANSAS",
"KY-KENTUCKY",
"KY-KENTUCKY             Surcharge",
"LA-LOUISIANA",
"MA-MASSACHUSETTS",
"MB-MANITOBA",
"MD-MARYLAND",
"ME-MAINE",
"MI-MICHIGAN",
"MN-MINNESOTA",
"MO-MISSOURI",
"MS-MISSISSIPPI",
"MT-MONTANA",
"NB-NEW BRUNSWICK",
"NC-NORTH CAROLINA",
"ND-NORTH DAKOTA",
"NE-NEBRASKA",
"NH-NEW HAMPSHIRE",
"NJ-NEW JERSEY",
"NL-NEWFOUNDLAND",
"NM-NEW MEXICO",
"NS-NOVA SCOTIA",
"NV-NEVADA",
"NY-NEW YORK",
"OH-OHIO",
"OK-OKLAHOMA",
"ON-ONTARIO",
"OR-OREGON",
"PA-PENNSYLVANIA",
"PE-PRINCE EDWARD ISLAND",
"QC-QUEBEC",
"RI-RHODE ISLAND",
"SC-SOUTH CAROLINA",
"SD-SOUTH DAKOTA",
"SK-SASKATCHEWAN",
"TN-TENNESSEE",
"TX-TEXAS",
"UT-UTAH",
"VA-VIRGINIA",
"VA-VIRGINIA             Surcharge",
"VT-VERMONT",
"WA-WASHINGTON",
"WI-WISCONSIN",
"WV-WEST VIRGINIA",
"WY-WYOMING"]

function txtJSON(data,delimiter=",") {
  const lines = data.split("\n");
  const result = [];
  const headers = lines[0].split(delimiter);

  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentline = lines[i].split(delimiter);

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }

  return result;
}



var jsonString =
[
  {
    "state": "AL-Alabama",
    "gallons": 60,
    "miles": 407
  },
  {
    "state": "AR-Arkansas",
    "gallons": 154,
    "miles": 560
  }
]



function clearForm() {
    //clear all elements from page
    document.querySelectorAll('input[type="text"], textarea').forEach(el => el.value = '');
    document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(el => el.checked = false);
    document.querySelectorAll('select').forEach(el => el.selectedIndex = 0);
}

function fillForm(jsonString, dropDowns) {
	var i = 0;
    console.log("hello fill");
    console.log(jsonString.length);
    console.log(dropDowns.length);
    console.log("string leng ^^^");
	//var elements = document.getElementsByTagName('select');

	formRowOffset = 1;
	for(i=0;i<jsonString.length;i++){
		var state = jsonString[i].state.toUpperCase()
		//var miles = jsonString[i].miles
		//var gallons = jsonString[i].gallons



		//drop down
		//elements[i+1].selectedIndex = dropDowns.indexOf(state)
		document.getElementById(`jurisdiction${i+formRowOffset}`).selectedIndex = dropDowns.indexOf(state)


		//iftaMiles
		document.getElementById(`iftamiles${i+formRowOffset}`).value = jsonString[i].miles

		//taxableMiles
		document.getElementById(`taxablemiles${i+formRowOffset}`).value = jsonString[i].miles

		//purchased gallons
		document.getElementById(`purchasedgallons${i+formRowOffset}`).value = jsonString[i].gallons


		if (state == "IN-INDIANA" ) {
			formRowOffset++
			document.getElementById(`jurisdiction${i+formRowOffset}`).selectedIndex = 16
			document.getElementById(`iftamiles${i+formRowOffset}`).value = 0
			document.getElementById(`taxablemiles${i+formRowOffset}`).value = jsonString[i].miles
			document.getElementById(`purchasedgallons${i+formRowOffset}`).value = 0


		} else if (state == "KY-KENTUCKY") {
			formRowOffset++
			document.getElementById(`jurisdiction${i+formRowOffset}`).selectedIndex = 19
			document.getElementById(`iftamiles${i+formRowOffset}`).value = 0
			document.getElementById(`taxablemiles${i+formRowOffset}`).value = jsonString[i].miles
			document.getElementById(`purchasedgallons${i+formRowOffset}`).value = 0
		} else if (state == "VA-VIRGINIA") {
			formRowOffset++
			document.getElementById(`jurisdiction${i+formRowOffset}`).selectedIndex = 56
			document.getElementById(`iftamiles${i+formRowOffset}`).value = 0
			document.getElementById(`taxablemiles${i+formRowOffset}`).value = jsonString[i].miles
			document.getElementById(`purchasedgallons${i+formRowOffset}`).value = 0

		}

		/*
		if (state == "IN-INDIANA" || state == "KY-KENTUCKY" || state == "VA-VIRGINIA") {
			formRowOffset++
		}
		*/
	}

}

/*
var j = 0;
for (var i = 0; i < fuelState.length+3; i++)
{
    // set index of State
    elements[j].selectedIndex = dropDowns.indexOf(fuelState[i])



}
*/

