// From $Display::WIDTH & $Display::HEIGHT on gadget-red
// const WIDTH = 1280
// const HEIGHT = 720
// From $Display::WIDTH & $Display::HEIGHT on folk0
const WIDTH = 3840
const HEIGHT = 2160

// Use the function with your data
let data = {
  center: [0.5, 0.5],
  width: 500,
  height: 400,
  angleZ: 160,
};

let matches = watchAndReport(
  tcl`${folkname} displays slide /n/ with data /data/`,
  programListEl
);

let html =
  "<h2>A Computer Can Be A Lamp</h2>\
<p>hellllooo</p>\
<p>It's a lamp that can do math.</p>";
html += "";

// Parse whatever the current data program is and display it
// let programListEl = document.getElementById('folk-container');
let el = document.getElementById("folk-container");
console.log("el", el);
el.innerHTML = html;

function radianToCssDegree(radian) {
    console.log('radian: ', radian)
    // Convert radian to degree
    const degree = radian * (180 / Math.PI);
    
    // Round to 2 decimal places
    const roundedDegree = Math.round(degree * 100) / 100;
    
    // Return the CSS-ready string
    return `${roundedDegree}deg`;
}

// Function to create and append a 3D rotated element
function create3DElement(data) {
  // Create a new div element
  const element = document.createElement("div");

  // Calculate position based on viewport size
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const left = data.center[0] * viewportWidth - data.width / 2;
  const top = data.center[1] * viewportHeight - data.height / 2;

  // Set the element's style
  element.style.position = "absolute";
  element.classList.add("folkSlide");
  element.style.left = `${left}px`;
  element.style.top = `${top}px`;
  element.style.width = `${data.width * viewportWidth}px`;
  element.style.height = `${data.height * viewportHeight}px`;
  element.style.backgroundColor = "papayawhip"; // You can change this color
  element.style.color = "MidnightBlue"; // You can change this color
  element.style.border = "1px solid black";

  // Apply 3D transformation
  // TODO: Uhhhhhh, angle is undefined??? hmmmm
  let deg = radianToCssDegree(data.angle);
  console.log('deg: ', data.angle)
  element.style.transform = `perspective(1000px) rotateX(${deg}deg)`;
  element.style.transformOrigin = "center center";

  // Add some text to the element (optional)
  element.innerHTML = `<h2>I'm slide #${data.n}</h2>`;

  // Append the element to the body
  document.body.appendChild(element);
}

// // Function to create element and update on window resize
// function createAndUpdateElement() {
//   // Remove existing element if any
//   const existingElement = document.querySelector("div");
//   if (existingElement) {
//     existingElement.remove();
//   }

//   // Create new element
//   create3DElement(data);
// }

// // Initial creation
// createAndUpdateElement();
// // Update on window resize
// window.addEventListener("resize", createAndUpdateElement);

function parseGlobalMatches(globalMatches) {
  const result = [];
  
  for (const key in globalMatches) {
    if (globalMatches.hasOwnProperty(key)) {
      const item = globalMatches[key];
      
      // Parse the 'data' string
      const dataMatch = item.data.match(/center \{(\d+\.\d+) (\d+\.\d+)\} width (\d+\.\d+) height (\d+\.\d+)/);
      
      if (dataMatch) {
        result.push({
          center: {
            x: parseFloat(dataMatch[1]),
            y: parseFloat(dataMatch[2])
          },
          width: parseFloat(dataMatch[3]),
          height: parseFloat(dataMatch[4])
        });
      }
    }
  }
  
  return result;
}

function repeatOften() {
    console.log('....')
  if (typeof globalMatches !== "undefined") {
    const parsedMatches = parseGlobalMatches(globalMatches);
        // console.log('parsedMatches: ', parsedMatches)
    if (parsedMatches.length > 0) {
        // console.log(JSON.stringify(parsedMatches, null, 2));
        let newData = parsedMatches[0]
        newData.center = [newData.center.x / WIDTH, newData.center.y / HEIGHT]
        newData.width = newData.width / WIDTH
        newData.height = newData.height / HEIGHT
        newData.n = globalMatches[0]['n'];
        newData.angle = globalMatches[0]['angle'];

        // newData.angleZ = 0
        console.table(globalMatches[0].data)
        if (document.querySelector(".folkSlide")) {
            document.querySelector(".folkSlide").remove()
        }
        create3DElement(newData)
    }
  }
//   console.log("repeating");
  // Do whatever
  requestAnimationFrame(repeatOften);
}
requestAnimationFrame(repeatOften);

/*
# Folk program:
Wish $this displays slide 1 with data {center: [x, y], width: w, height: h}
Wish $this displays slide 2 with data {center: [x, y], width: w, height: h}
Wish $this displays html "<h2>helllooooo</h2>"
*/

/*
# Prototype Folk code to integrate with the above:
- ./slides.folk
*/