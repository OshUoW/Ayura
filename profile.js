
// Prompt array with properties to store and call data when needed
/* category = The type of information asked by category
prompt = The message to be displayed to the user
metadeta = The part that's to be displayed before displaying the user input in profile summary
answer = The user input
step = To identify which category of prompts it belongs to and display the step title
questionNo = To keep track of which prompt it is to display the step title
required = To mark which prompts are mandatory to answer for the user
skip = To mark which prompts can be skipped by the user
dependsOn = To mark prompts that only display if the user enters a specific answer in another prompt, and to store the parent prompt
showCriteria = The answer of the parent prompt in order for the conditional prompt to display */

// Conditional prompts = Prompts that only show if the user entered "yes" to a parent prompt, and will not show if user entered "no" to parent prompt
// Address prompt will only be displayed if the user said "yes" to purchasing products
// Newsletter email prompt will only be displayed if the user said "yes" to registering for the newsletter service

const promptsArray = [
    {category : "Personal Details", prompt : "What's your name*", metadata : "Name: ", answer: "", step: "1", questionNo : "1", required : ""},
    {category : "Personal Details", prompt : "What's your surname*", metadata : "Surname: ",answer: "", step: "1", questionNo : "2", required : ""},
    {category : "Personal Details", prompt : "How old are you*", metadata : "Age: ",answer: "", step: "1", questionNo : "3", required : ""},
    {category : "Personal Details", prompt : "What is your gender*", metadata : "Gender: ",answer: "", step: "1", questionNo : "4", required : ""},
    {category : "Regarding Us", prompt : "How did you find about our site", metadata : "Found site through: ",answer: "", step: "2", questionNo : "1", skip : 0},
    {category : "Regarding Us", prompt : "Which ayurvedic products would you like", metadata : "Interested in products: ",answer: "", step: "2", questionNo : "2", skip : 0},
    {category : "Regarding Us", prompt : "Do you want to be registered to our newsletter through email?*", metadata : "Newsletter registered: ",answer: "", step: "2", questionNo : "3", required : ""},
    {category : "Regarding Us", prompt : "Will you be interested in making ayurvedic purchases*", metadata : "Interested in making purchases: ",answer: "", step: "2", questionNo : "4", required : ""},
    {category : "Location Information", prompt : "Enter your Address", metadata : "Address: ",answer: "", step: "3", questionNo : "1",required: "", dependsOn : 7, showCriteria : "yes"},
    {category : "Location Information", prompt : "Enter your city", metadata : "City: ",answer: "", step: "3", questionNo : "2", skip : 0},
    {category : "Location Information", prompt : "Enter your zipcode", metadata : "Zipcode: ",answer: "", step: "3", questionNo : "3", skip : 0},
    {category : "Location Information", prompt : "Enter your country", metadata : "Country: ",answer: "", step: "3", questionNo : "4", skip : 0},
    {category : "Contact Details", prompt : "Mobile number", metadata : "Mobile number: ",answer: "", step: "4", questionNo : "1", skip : 0},
    {category : "Contact Details", prompt : "Home number", metadata : "Home number: ",answer: "", step: "4", questionNo : "2", skip : 0},
    {category : "Contact Details", prompt : "Email*", metadata : "Email: ",answer: "", step: "4", questionNo : "3", required : ""},
    {category : "Contact Details", prompt : "Email to receive newsletters*", metadata : "Newsletter email: ",answer: "", step: "4", questionNo : "4", required: "", dependsOn : 6, showCriteria : "yes"}
]

// Assigning html elements to variables
const currentPrompt = document.getElementById('current-prompt');
const userInput = document.getElementById('user-input');
const nextButton = document.getElementById('next-button');
const skipButton = document.getElementById('skip-button');
const previousButton = document.getElementById('previous-button');
const categoryTitle = document.getElementById('category-title');
const errorMessage = document.getElementById('error-message');
const profileSummary = document.getElementById('profile-info');
const progressBar = document.getElementById('progress');

// Counts to keep track of current prompt and latest prompt visited
let currentPromptIndex = 0;
let latestPromptIndex = 0;

// Function to display new prompt
function displayPrompt ()  {
    const currentPromptText = promptsArray[currentPromptIndex].prompt;
    currentPrompt.textContent = currentPromptText;
}

// Function to go back to previous prompt
function previousPrompt () {

    // Assign 0 to skipped prompt to mark it as not skipped if it was initially
    if (promptsArray[currentPromptIndex-1].hasOwnProperty("skip") && promptsArray[currentPromptIndex-1].skip === 1) {
        promptsArray[currentPromptIndex-1].skip = 0;
    }

    // To reduce prompt number again if the current prompt is a conditional prompt that should not be displayed
    if (!currentPromptIndex<=0) {
        if (promptsArray[currentPromptIndex-1].hasOwnProperty("dependsOn") && !showPromptIf(currentPromptIndex-1)) {
            currentPromptIndex--;
        }
        currentPromptIndex--;
        userInput.value = promptsArray[currentPromptIndex].answer;

        // Setting everything to previous prompt data
        updateButtons();
        displayPrompt();
        updateTitle();     
    }     
}

// Function to skip prompts
function skipPrompt () {
    // Displaying an error if it's a mandatory prompt
    if (promptsArray[currentPromptIndex].hasOwnProperty("required")) {
        let message = "The following question cannot be skipped";
        error(message);
    } else { 
        promptsArray[currentPromptIndex].answer = "";
        promptsArray[currentPromptIndex].skip = 1;
        nextPrompt();
    }
}

// Function to check if the conditional prompt can be shown
function showPromptIf (currentPromptIndex) {
    let dependIndex = promptsArray[currentPromptIndex].dependsOn;
    if (promptsArray[dependIndex].answer === promptsArray[currentPromptIndex].showCriteria) {
        return true;
    } else {return false;}
}

// Function to print an error message
function error (message) {
    const newInput = message;
    errorMessage.innerHTML = newInput;
}

// Function to update the progress bar
function progress () {
    let width = ~~(((latestPromptIndex)/16)*100) + "%";
    progressBar.style.width = width;
    progressBar.innerHTML = width;
}

// Function to update the title
function updateTitle () {
    const title = "Step " + promptsArray[currentPromptIndex].step + " " + promptsArray[currentPromptIndex].category 
    + " | Question " + promptsArray[currentPromptIndex].questionNo + "/" + "4";
    categoryTitle.innerHTML = title;
}

//Function to update profile summary
function updateProfile () {
    profileSummary.innerHTML = '';
    promptsArray[currentPromptIndex].answer = userInput.value;
    for (let i = 0; i <= latestPromptIndex; i++) {
        const newInput = promptsArray[i].metadata + promptsArray[i].answer;
        const newParagraph = document.createElement('p');
        newParagraph.textContent = newInput;
        profileSummary.appendChild(newParagraph);
    }
}

// Function to change the next button to finish if the user is at the last prompt, and back if the user goes to a previous prompt
function updateButtons() {
    if (currentPromptIndex>=15) {
        nextButton.innerHTML = 'Finish';
        nextButton.style.backgroundColor = 'red';
        skipButton.style.backgroundColor = '#ddd';
    } else {
        nextButton.innerHTML = 'Next';
        nextButton.style.backgroundColor = '#04AA6D';
        skipButton.style.backgroundColor = '#04AA6D';
    }
}

// Function to go to next prompt
function nextPrompt () {  
    
    errorMessage.innerHTML = '';
    // Checking if the prompt is skippable
    if (!(promptsArray[currentPromptIndex].hasOwnProperty("skip") && promptsArray[currentPromptIndex].skip === 1)) {
        if (userInput.value.trim() === "") { // Check if the user input is empty()
            let message = "The following field is required. Please enter an input";
            error(message);
            return;
        }
        if (currentPromptIndex===6 || currentPromptIndex===7) { //Restricting allowed answers for parent prompts of mandatory prompts (yes/no)
            userInput.value = userInput.value.trim();
            userInput.value = userInput.value.toLowerCase();
            if (!(userInput.value === "yes" || userInput.value === "no")) {
                let message = "Please enter either yes or no";
                error(message);
                return;
            }
        }
        // Checking if the user input is a number for prompts that need numerical inputs
        if (currentPromptIndex===2 || currentPromptIndex===12 || currentPromptIndex===13) {
            userInput.value = userInput.value.trim();
            if (isNaN(Number(userInput.value))) {
                let message = "Please enter a number";
                error(message);
                return;
            }
            if (currentPromptIndex===12 || currentPromptIndex===13) { // Checking if there's 10 digits if it's a mobile number
                if (!(userInput.value.length === 10)) {
                    let message = "Please enter a phone number (10 digits)";
                    error(message);
                    return;
                }
            }
        }
        updateProfile();
        updateButtons();

        // Manually setting the progress bar if the user is at the last prompt
        if (currentPromptIndex===15) {
            latestPromptIndex = currentPromptIndex;
            progressBar.style.width = "100%";
            progressBar.innerHTML = "100%";
            return;
        }
    }

    // Filling input field with answers user has entered before if the user goes to previous prompts
    if (currentPromptIndex<latestPromptIndex) {
        userInput.value = promptsArray[currentPromptIndex+1].answer;
    } else {
        userInput.value = '';
    }
    
    currentPromptIndex++;

    // Checking if the conditional prompt can be shown
    if (promptsArray[currentPromptIndex].hasOwnProperty("dependsOn") && !showPromptIf(currentPromptIndex)) {
        if (currentPromptIndex===15) { //Manually updating data to prevent counts going above the array length
            latestPromptIndex = currentPromptIndex;
            updateButtons();
            updateTitle();
            progressBar.style.width = "100%";
            progressBar.innerHTML = "100%";
            userInput.value = promptsArray[14].answer;
            return;
        }
        currentPromptIndex++;
        if ((currentPromptIndex-2)==latestPromptIndex) {
            latestPromptIndex++;
        }
    }

    if ((currentPromptIndex-1)==latestPromptIndex) {
        latestPromptIndex++;
    }

    progress();
    updateTitle();

    // Updating if the current prompt index is within array bounds
    if (currentPromptIndex < promptsArray.length) {
        displayPrompt();
        updateProfile();
    }
}

updateTitle();
displayPrompt();

nextButton.addEventListener('click', () => {
    if (nextButton.innerHTML === 'Finish') { //Redirecting the user back to Home page if he is done with the user profile
        window.location.href = 'home.html';
    } else {
        nextPrompt();
    }
});

skipButton.addEventListener('click', (skipPrompt));

previousButton.addEventListener('click', (previousPrompt));

