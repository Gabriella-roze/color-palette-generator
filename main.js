const colBase = document.getElementById("col-base");
let colorPicker;
let defaultColor = "#E83285";
 
 window.addEventListener("load", init);
 function init() {
    colorPicker = document.getElementById("color-picker");
    colBase.style.backgroundColor = defaultColor
    colorPicker.value = defaultColor;
    colorPicker.addEventListener("input", setBaseColor);
  }

 function setBaseColor(color) {
    colBase.style.backgroundColor = color.target.value;
    console.log(color);
 }