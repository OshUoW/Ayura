let next = document.querySelector('.next')

next.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').appendChild(items[0])
})


// color picker
function colorPicker() {
    let colorPicker = document.querySelector("#color-picker").value;
    let colorContainer=document.querySelector('.container');
    colorContainer.style.backgroundColor = colorPicker;

}

// Font picker
function fontPicker() {
    let fontPickerValue = document.querySelector("#font-picker").value;
    // Select all elements with .name and .des classes
    let nameElements = document.querySelectorAll(".name");
    let desElements = document.querySelectorAll(".des");

    // Apply the selected font family to all .name elements
    nameElements.forEach(function(element) {
        element.style.fontFamily = fontPickerValue;
    });

    // Apply the selected font family to all .des elements
    desElements.forEach(function(element) {
        element.style.fontFamily = fontPickerValue;
    });
}

// Text color picker
function textColorPicker() {
    let textColor = document.querySelector("#text-color-picker").value;
    // Select all elements with .name and .des classes
    let nameElements = document.querySelectorAll(".name");
    let desElements = document.querySelectorAll(".des");

    // Apply the selected text color to all .name elements
    nameElements.forEach(item=> {
        console.log(item)
        item.style.color = textColor;
    });

    // Apply the selected text color to all .des elements
    desElements.forEach(item=> {
        item.style.color = textColor;
    });
    
}


