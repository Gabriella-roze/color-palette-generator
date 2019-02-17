/*
-- RGB (as in colorRGB = rgb(232, 50, 133))
   The RGB color model is an additive color model 
   in which red, green and blue light are added together 
   in various ways to reproduce a broad array of colors.

-- HEX (used in defaultColor = "#E83285")
   A color hex code is a way of specifying color 
   using hexadecimal values. The code itself is a hex triplet, 
   which represents three separate values 
   that specify the levels of the component colors. 
   The code starts with a pound sign (#) and is followed 
   by six hex values or three hex value pairs (for example, #AFD645).

-- HSL (as in colorHSL = hsl(332, 80%, 55%)
   HSL is another color model, and anything that can be shown in RGB 
   can also be represented in HSL. 
   HSL is a more intuitive and human way of understanding color 
   as compared with RGB, which is more technical in the way colors 
   are produced.
*/

// Select color boxes for the future editing 
const colBase = document.getElementById("col-base");
const colLeft1 = document.getElementById("col-left1");
const colLeft2 = document.getElementById("col-left2");
const colRight1 = document.getElementById("col-right1");
const colRight2 = document.getElementById("col-right2");
//  Select harmony style picker
const harmStyle = document.getElementById("color-harmony-style");

//  Define color picker and set default color in HEX and RGB
let colorPicker;
let defaultColor = "#E83285";
let colorRGB = 'rgb(232, 50, 133)';

// Initialize init() on load
window.addEventListener("load", init);

function init() {
   // initializes all basic functions that need to run once page loads
   // Call strRGBtoNumRGB() to get take a string of rgb and convert it to an array of numbers [r, g, b]
   strRGBtoNumRGB(colorRGB);
   // Define the color input
   colorPicker = document.getElementById("color-picker");
   // Get the RGB string from the backgrpund color property and set it to defaultColot to store it for later
   colBase.style.backgroundColor = defaultColor
   colorPicker.value = defaultColor;
   // Add event listener to color input to set the base color of the middle color box
   colorPicker.addEventListener("input", setBaseColor);
   // Call selectHarmStyle() and pass harmony style value from the input and a color in HSL
   selectHarmStyle(harmStyle.value, colorConverterRGBtoHSL(colorRGB));
}

function setBaseColor(color) {
   // This func sets base color of the main (middle) box taking reference from the color input
   colBase.style.backgroundColor = color.target.value;
   // Save the color from HEX to RGB
   colorRGB = colBase.style.backgroundColor;
   // Split the RGB string into an array of [r, g, b]
   let splitRGBNum = strRGBtoNumRGB(colorRGB);
   // call colorConverterRGBtoHSL() to convert RGB into HSL
   colorConverterRGBtoHSL(splitRGBNum);
   // Call selectHarmStyle() to rerender the colors of other color boxes
   selectHarmStyle(harmStyle.value, colorConverterRGBtoHSL(colorRGB));
}

function strRGBtoNumRGB(string) {
   // This func takes a string of RGB converts it into an array of numbers and returns [r, g, b]
   let splitRGB = string.replace("rgb(", "").replace(")", "").replace(/,/gi, "").split(" ");
   let splitRGBNum = [];
   splitRGB.forEach(str => { 
      splitRGBNum.push(parseInt(str, 10));
   });
   return splitRGBNum;
}

function selectHarmStyle(style, colorHSL) {
   // This func rerenders colors depending on the harmony style selected
   // Firstly it checks if the style has a defined and expected value
   style = style.value ? style.value : style;
   // Then it checks if the color input is in correct format, if not, it calls a function to fix it
   if (!colorHSL) {
      colorHSL = colorConverterRGBtoHSL(colorRGB);
   }
   // Finally it checks which style has been selected and calls certain 
   // func to calculate the rest of the color backgrpunds depending on the harmony style selected
   // and passes color in HSL
   if (style === "analogous") {
      calcAnalogPal(colorHSL);

  } else if (style === "monochromatic") {
      calcMonochPal(colorHSL);

  } else if (style === "triad") {
      calcTriPal(colorHSL);

  } else if (style === "complementary") {
      calcComplPal(colorHSL);

  } else if (style === "compound") {
      calcCompoPal(colorHSL);
      
  } else {
      calcShaPal(colorHSL);
  }
};

// Hare are the functions that calculate background colors for the rest of the color boxes 
// depending on the style chosen and then it calls a func to display the color values on color boxes
// by passing calculated color values
function calcAnalogPal(colorHSL) {
   colLeft1.style.background = `hsl(${colorHSL.h + 20}, ${colorHSL.s}%, ${colorHSL.l}%)`;
   colLeft2.style.background = `hsl(${colorHSL.h + 40}, ${colorHSL.s}%, ${colorHSL.l}%)`;
   colRight1.style.background = `hsl(${colorHSL.h - 20}, ${colorHSL.s}%, ${colorHSL.l}%)`;
   colRight2.style.background = `hsl(${colorHSL.h - 40}, ${colorHSL.s}%, ${colorHSL.l}%)`;
   displayColValues(colLeft1.style.background, colLeft2.style.background, colRight1.style.background, colRight2.style.background);
}
function calcMonochPal(colorHSL) {
   colLeft1.style.background = `hsl(${colorHSL.h}, ${colorHSL.s}%, ${colorHSL.l + 20}%)`;
   colLeft2.style.background = `hsl(${colorHSL.h}, ${colorHSL.s}%, ${colorHSL.l + 40}%)`;
   colRight1.style.background = `hsl(${colorHSL.h}, ${colorHSL.s}%, ${colorHSL.l - 20}%)`;
   colRight2.style.background = `hsl(${colorHSL.h}, ${colorHSL.s}%, ${colorHSL.l - 40}%)`;
   displayColValues(colLeft1.style.background, colLeft2.style.background, colRight1.style.background, colRight2.style.background);
}
function calcTriPal(colorHSL) {
   colLeft1.style.background = `hsl(${colorHSL.h + 60}, ${colorHSL.s}%, ${colorHSL.l + 20}%)`;
   colLeft2.style.background = "#ffffff";
   colRight1.style.background = `hsl(${colorHSL.h + 120}, ${colorHSL.s}%, ${colorHSL.l - 20}%)`;
   colRight2.style.background = "#ffffff";
   displayColValues(colLeft1.style.background, colLeft2.style.background, colRight1.style.background, colRight2.style.background);
}
function calcComplPal(colorHSL) {
   colLeft1.style.background = `hsl(${colorHSL.h + 180}, ${colorHSL.s}%, ${colorHSL.l + 20}%)`;
   colLeft2.style.background = "#ffffff";
   colRight1.style.background = "#ffffff";
   colRight2.style.background = "#ffffff";
   displayColValues(colLeft1.style.background, colLeft2.style.background, colRight1.style.background, colRight2.style.background);
}
function calcCompoPal(colorHSL) {
   colLeft1.style.background = `hsl(${colorHSL.h + 180}, ${colorHSL.s}%, ${colorHSL.l + 20}%)`;
   colLeft2.style.background = `hsl(${colorHSL.h + 40}, ${colorHSL.s}%, ${colorHSL.l}%)`;
   colRight1.style.background = `hsl(${colorHSL.h - 20}, ${colorHSL.s}%, ${colorHSL.l}%)`;
   colRight2.style.background = `hsl(${colorHSL.h - 40}, ${colorHSL.s}%, ${colorHSL.l}%)`;
   displayColValues(colLeft1.style.background, colLeft2.style.background, colRight1.style.background, colRight2.style.background);
}
function calcShaPal(colorHSL) {
   colLeft1.style.background = `hsl(${colorHSL.h}, ${colorHSL.s - 10}%, ${colorHSL.l}%)`;
   colLeft2.style.background = `hsl(${colorHSL.h}, ${colorHSL.s - 30}%, ${colorHSL.l}%)`;
   colRight1.style.background = `hsl(${colorHSL.h}, ${colorHSL.s + 10}%, ${colorHSL.l}%)`;
   colRight2.style.background = `hsl(${colorHSL.h}, ${colorHSL.s + 30}%, ${colorHSL.l}%)`;
   displayColValues(colLeft1.style.background, colLeft2.style.background, colRight1.style.background, colRight2.style.background);
}
// ...end

function displayColValues(colLeftOne, colLeftTwo, ColROne, ColRTwo) {
   // Display color values on each color box.
   console.log(colBase.style.backgroundColor);
   colBase.innerHTML = colorRGB;
   colLeft1.innerHTML = colLeftOne;
   colLeft2.innerHTML = colLeftTwo;
   colRight1.innerHTML = ColROne;
   colRight2.innerHTML = ColRTwo;
}

function colorConverterRGBtoHSL(colorRGB) {
   // Gets color in RGB and converts it into HSL and returns an object { h, s, l }
   // Firstly checks if the parameter provided is a string. 
   // If it is, it calls a func to convert it into an array of numbers
   if (typeof colorRGB === 'string') {
      colorRGB = strRGBtoNumRGB(colorRGB);
   }
   // takes the numbers from the param to R G B seperately
   let r = colorRGB[0];
   let g = colorRGB[1];
   let b = colorRGB[2];
   // does the magic math
   r /= 255;
   g /= 255;
   b /= 255;

   let h, s, l;

   const min = Math.min(r,g,b);
   const max = Math.max(r,g,b);

   if( max === min ) {
   h = 0;
   } else
   if (max === r) {
   h = 60 * (0 + (g - b) / (max - min) );
   } else
   if (max === g) {
   h = 60 * (2 + (b - r) / (max - min) );
   } else
   if (max === b) {
   h = 60 * (4 + (r - g) / (max - min) );
   }

   if (h < 0) {h = h + 360; }

   l = (min + max) / 2;

   if (max === 0 || min === 1 ) {
   s = 0;
   } else {
   s = (max - l) / ( Math.min(l,1-l));
   }
   // multiply s and l by 100 to get the value in percent, rather than [0,1]
   s *= 100;
   l *= 100;
   // store the h s l values in an object and return it
   let result = { h, s, l };
   return result;
}