document.addEventListener("DOMContentLoaded", () => {
// Helper to parse CSV/TSV input
function txtJSON(data, delimiter = ",") {
  const lines = data.split("\n");
  const result = [];
  const headers = lines[0].split(delimiter);

  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentline = lines[i].split(delimiter);

    for (let j = 0; j < headers.length; j++) {
      let value = currentline[j] ? currentline[j] : "0"; // <-- replace empty with "0"
      obj[headers[j]] = value;
    }

    result.push(obj);
  }

  return result;
}

// Dropdown options
const dropDowns = [
  "", "AB-ALBERTA", "AL-ALABAMA", "AR-ARKANSAS", "AZ-ARIZONA",
  "BC-BRITISH COLUMBIA", "CA-CALIFORNIA", "CO-COLORADO", "CT-CONNECTICUT",
  "DE-DELAWARE", "FL-FLORIDA", "GA-GEORGIA", "IA-IOWA", "ID-IDAHO",
  "IL-ILLINOIS", "IN-INDIANA", "IN-INDIANA              Surcharge",
  "KS-KANSAS", "KY-KENTUCKY", "KY-KENTUCKY             Surcharge",
  "LA-LOUISIANA", "MA-MASSACHUSETTS", "MB-MANITOBA", "MD-MARYLAND",
  "ME-MAINE", "MI-MICHIGAN", "MN-MINNESOTA", "MO-MISSOURI",
  "MS-MISSISSIPPI", "MT-MONTANA", "NB-NEW BRUNSWICK", "NC-NORTH CAROLINA",
  "ND-NORTH DAKOTA", "NE-NEBRASKA", "NH-NEW HAMPSHIRE", "NJ-NEW JERSEY",
  "NL-NEWFOUNDLAND", "NM-NEW MEXICO", "NS-NOVA SCOTIA", "NV-NEVADA",
  "NY-NEW YORK", "OH-OHIO", "OK-OKLAHOMA", "ON-ONTARIO", "OR-OREGON",
  "PA-PENNSYLVANIA", "PE-PRINCE EDWARD ISLAND", "QC-QUEBEC", "RI-RHODE ISLAND",
  "SC-SOUTH CAROLINA", "SD-SOUTH DAKOTA", "SK-SASKATCHEWAN", "TN-TENNESSEE",
  "TX-TEXAS", "UT-UTAH", "VA-VIRGINIA", "VA-VIRGINIA             Surcharge",
  "VT-VERMONT", "WA-WASHINGTON", "WI-WISCONSIN", "WV-WEST VIRGINIA", "WY-WYOMING"
];

// Fill form function (to be injected)
function fillForm(jsonString, dropDowns) {
  var i = 0;
  console.log("Running fillForm");

  let formRowOffset = 1;
  for (i = 0; i < jsonString.length; i++) {
    const state = jsonString[i].state.toUpperCase();

    // Drop down
    document.getElementById(`jurisdiction${i + formRowOffset}`).selectedIndex = dropDowns.indexOf(state);

    // Miles & gallons
    document.getElementById(`iftamiles${i + formRowOffset}`).value = jsonString[i].miles;
    document.getElementById(`taxablemiles${i + formRowOffset}`).value = jsonString[i].miles;
    document.getElementById(`purchasedgallons${i + formRowOffset}`).value = jsonString[i].gallons;

    // Handle special states
    if (state === "IN-INDIANA") {
      formRowOffset++;
      document.getElementById(`jurisdiction${i + formRowOffset}`).selectedIndex = 16;
      document.getElementById(`iftamiles${i + formRowOffset}`).value = 0;
      document.getElementById(`taxablemiles${i + formRowOffset}`).value = jsonString[i].miles;
      document.getElementById(`purchasedgallons${i + formRowOffset}`).value = 0;
    } else if (state === "KY-KENTUCKY") {
      formRowOffset++;
      document.getElementById(`jurisdiction${i + formRowOffset}`).selectedIndex = 19;
      document.getElementById(`iftamiles${i + formRowOffset}`).value = 0;
      document.getElementById(`taxablemiles${i + formRowOffset}`).value = jsonString[i].miles;
      document.getElementById(`purchasedgallons${i + formRowOffset}`).value = 0;
    } else if (state === "VA-VIRGINIA") {
      formRowOffset++;
      document.getElementById(`jurisdiction${i + formRowOffset}`).selectedIndex = 56;
      document.getElementById(`iftamiles${i + formRowOffset}`).value = 0;
      document.getElementById(`taxablemiles${i + formRowOffset}`).value = jsonString[i].miles;
      document.getElementById(`purchasedgallons${i + formRowOffset}`).value = 0;
    }
  }
}

// Clear form function (to be injected)
function clearForm() {
  document.querySelectorAll('input[type="text"], textarea').forEach(el => el.value = '');
  document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(el => el.checked = false);
  document.querySelectorAll('select').forEach(el => el.selectedIndex = 0);
}

// Button: Fill form
  document.getElementById("btn1").addEventListener("click", async () => {
  const largeTextEl = document.getElementById("largeText");
  const charInputEl = document.getElementById("charInput");
  const largeText = largeTextEl.value.trim(); //text input
  const charInput = charInputEl.value.trim(); //delimiter
  const jsonString = txtJSON(largeText, charInput);

  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });

  // Inject fillForm with parameters into the active tab
  await browser.scripting.executeScript({
    target: { tabId: tab.id },
    func: fillForm,
    args: [jsonString, dropDowns]
  });
});

// Button: Clear form
document.getElementById("btn2").addEventListener("click", async () => {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });

  await browser.scripting.executeScript({
    target: { tabId: tab.id },
    func: clearForm
  });
});
});
