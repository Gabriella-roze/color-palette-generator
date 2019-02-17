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
const colBase = document.getElementById("col-base");
const colLeft1 = document.getElementById("col-left1");
const colLeft2 = document.getElementById("col-left2");
const colRight1 = document.getElementById("col-right1");
const colRight2 = document.getElementById("col-right2");
const harmStyle = document.getElementById("color-harmony-style");

let colorPicker;
let defaultColor = "#E83285";
let colorRGB = 'rgb(232, 50, 133)';

window.addEventListener("load", init);
selectHarmStyle(harmStyle.value, colorConverterRGBtoHSL(colorRGB));

function init() {
   strRGBtoNumRGB(colorRGB);
   colorPicker = document.getElementById("color-picker");
   colBase.style.backgroundColor = defaultColor
   colorPicker.value = defaultColor;
   colorPicker.addEventListener("input", setBaseColor);
}

function setBaseColor(color) {
   colBase.style.backgroundColor = color.target.value;
   colorRGB = colBase.style.backgroundColor;
   let splitRGBNum = strRGBtoNumRGB(colorRGB);
   colorConverterRGBtoHSL(splitRGBNum);
   selectHarmStyle(harmStyle.value, colorConverterRGBtoHSL(colorRGB));
}

function strRGBtoNumRGB(string) {
   let splitRGB = string.replace("rgb(", "").replace(")", "").replace(/,/gi, "").split(" ");
   let splitRGBNum = [];
   splitRGB.forEach(str => { 
      splitRGBNum.push(parseInt(str, 10));
   });
   return splitRGBNum;
}

function selectHarmStyle(style, colorHSL) {
   style = style.value ? style.value : style;
   if (!colorHSL) {
      colorHSL = colorConverterRGBtoHSL(colorRGB);
   }
   if (style === "analogous") {
      console.log("analogous --")
      calcAnalogPal(colorHSL);

  } else if (style === "monochromatic") {
      console.log("monochromatic --");
      calcMonochPal(colorHSL);

  } else if (style === "triad") {
      console.log("triad --");
      calcTriPal(colorHSL);

  } else if (style === "complementary") {
      console.log("complementary --");
      calcComplPal(colorHSL);

  } else if (style === "compound") {
      console.log("compound --");
      calcCompoPal(colorHSL);
      
  } else {
      console.log("shades --");
      calcShaPal(colorHSL);
  }
};

function calcAnalogPal(colorHSL) {
   // console.log("-->analogous: ", colorHSL);
   colLeft1.style.background = `hsl(${colorHSL.h + 20}, ${colorHSL.s}%, ${colorHSL.l}%)`;
   colLeft2.style.background = `hsl(${colorHSL.h + 40}, ${colorHSL.s}%, ${colorHSL.l}%)`;
   colRight1.style.background = `hsl(${colorHSL.h - 20}, ${colorHSL.s}%, ${colorHSL.l}%)`;
   colRight2.style.background = `hsl(${colorHSL.h - 40}, ${colorHSL.s}%, ${colorHSL.l}%)`;
   displayColValues(colLeft1.style.background, colLeft2.style.background, colRight1.style.background, colRight2.style.background);
}

function calcMonochPal(colorHSL) {
   // console.log("-->analogous: ", colorHSL);
   colLeft1.style.background = `hsl(${colorHSL.h}, ${colorHSL.s}%, ${colorHSL.l + 20}%)`;
   colLeft2.style.background = `hsl(${colorHSL.h}, ${colorHSL.s}%, ${colorHSL.l + 40}%)`;
   colRight1.style.background = `hsl(${colorHSL.h}, ${colorHSL.s}%, ${colorHSL.l - 20}%)`;
   colRight2.style.background = `hsl(${colorHSL.h}, ${colorHSL.s}%, ${colorHSL.l - 40}%)`;
   displayColValues(colLeft1.style.background, colLeft2.style.background, colRight1.style.background, colRight2.style.background);
}

function calcTriPal(colorHSL) {
   // console.log("-->analogous: ", colorHSL);
   colLeft1.style.background = `hsl(${colorHSL.h + 60}, ${colorHSL.s}%, ${colorHSL.l + 20}%)`;
   colLeft2.style.background = "#ffffff";
   colRight1.style.background = `hsl(${colorHSL.h + 120}, ${colorHSL.s}%, ${colorHSL.l - 20}%)`;
   colRight2.style.background = "#ffffff";
   displayColValues(colLeft1.style.background, colLeft2.style.background, colRight1.style.background, colRight2.style.background);
}

function calcComplPal(colorHSL) {
   // console.log("-->analogous: ", colorHSL);
   colLeft1.style.background = `hsl(${colorHSL.h + 180}, ${colorHSL.s}%, ${colorHSL.l + 20}%)`;
   colLeft2.style.background = "#ffffff";
   colRight1.style.background = "#ffffff";
   colRight2.style.background = "#ffffff";
   displayColValues(colLeft1.style.background, colLeft2.style.background, colRight1.style.background, colRight2.style.background);
}

function calcCompoPal(colorHSL) {
   // console.log("-->analogous: ", colorHSL);
   colLeft1.style.background = `hsl(${colorHSL.h + 180}, ${colorHSL.s}%, ${colorHSL.l + 20}%)`;
   colLeft2.style.background = `hsl(${colorHSL.h + 40}, ${colorHSL.s}%, ${colorHSL.l}%)`;
   colRight1.style.background = `hsl(${colorHSL.h - 20}, ${colorHSL.s}%, ${colorHSL.l}%)`;
   colRight2.style.background = `hsl(${colorHSL.h - 40}, ${colorHSL.s}%, ${colorHSL.l}%)`;
   displayColValues(colLeft1.style.background, colLeft2.style.background, colRight1.style.background, colRight2.style.background);
}

function calcShaPal(colorHSL) {
   // console.log("-->analogous: ", colorHSL);
   colLeft1.style.background = `hsl(${colorHSL.h}, ${colorHSL.s - 10}%, ${colorHSL.l}%)`;
   colLeft2.style.background = `hsl(${colorHSL.h}, ${colorHSL.s - 30}%, ${colorHSL.l}%)`;
   colRight1.style.background = `hsl(${colorHSL.h}, ${colorHSL.s + 10}%, ${colorHSL.l}%)`;
   colRight2.style.background = `hsl(${colorHSL.h}, ${colorHSL.s + 30}%, ${colorHSL.l}%)`;
   displayColValues(colLeft1.style.background, colLeft2.style.background, colRight1.style.background, colRight2.style.background);
}

function displayColValues(colLeftOne, colLeftTwo, ColROne, ColRTwo) {
   // Display color's values in on each color box.
   console.log(colBase.style.backgroundColor);
   colBase.innerHTML = colorRGB;
   colLeft1.innerHTML = colLeftOne;
   colLeft2.innerHTML = colLeftTwo;
   colRight1.innerHTML = ColROne;
   colRight2.innerHTML = ColRTwo;
}

function colorConverterRGBtoHSL(colorRGB) {
   if (typeof colorRGB === 'string') {
      colorRGB = strRGBtoNumRGB(colorRGB);
   }

   let r = colorRGB[0];
   let g = colorRGB[1];
   let b = colorRGB[2];

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

   let result = { h, s, l };
   
   return result;
}