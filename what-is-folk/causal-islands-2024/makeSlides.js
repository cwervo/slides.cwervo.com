// From $Display::WIDTH & $Display::HEIGHT on gadget-red
const WIDTH = 1280
const HEIGHT = 720
// From $Display::WIDTH & $Display::HEIGHT on folk0
// const WIDTH = 3840
// const HEIGHT = 2160

// Use the function with your data
// let data = {
//   center: [0.5, 0.5],
//   width: 500,
//   height: 400,
//   angleZ: 160,
// };

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
let containerEl = document.getElementById("folk-container");
// containerEl.innerHTML = html;

function radianToCssDegree(radian) {
    const degree = radian * (180 / Math.PI);
    const roundedDegree = Math.round(degree * 100) / 100;
    return `${roundedDegree}deg`;
}

// Function to create and append a 3D rotated element
function createFolkCard(data) {
  // Create a new div element
  const element = document.createElement("div");
  // Calculate position based on viewport size
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const left = (data.center[0] * viewportWidth) - (viewportWidth / 2);
  const top = (data.center[1] * viewportHeight) - (viewportHeight / 2);

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
  element.style.transform = `perspective(2000px) rotateZ(${deg})`;
  // element.style.transform = `perspective(1000px) rotateZ(180deg)`;
  element.style.transformOrigin = "center center";
  // element.style.transformOrigin = "top left";
  // element.style.transformOrigin = "bottom right";

  // Add some text to the element (optional)
  // element.innerHTML = `<h2>I'm slide #${data.n}</h2>`;
  element.innerHTML = `<h2>I'm slide #${data.n}</h2>`;

  // Append the element to the body
  // document.body.appendChild(element);
  containerEl.appendChild(element);
}

function parseGlobalMatches(globalMatches) {
  const result = [];
  
  for (const key in globalMatches) {
    if (globalMatches.hasOwnProperty(key)) {
      const item = globalMatches[key];
      
      // Parse the 'data' string
      const dataMatch = item.data.match(/center \{(\d+\.\d+) (\d+\.\d+)\} width (\d+\.\d+) height (\d+\.\d+) angle (-?\d+\.\d+)/);
      if (dataMatch) {
        result.push({
          center: {
            x: parseFloat(dataMatch[1]),
            y: parseFloat(dataMatch[2])
          },
          width: parseFloat(dataMatch[3]),
          height: parseFloat(dataMatch[4]),
          angle: parseFloat(dataMatch[5])
        });
      }
    }
  }
  
  return result;
}

function loop() {
  if (typeof globalMatches !== "undefined") {
    const parsedMatches = parseGlobalMatches(globalMatches);
    if (document.querySelector(".folkSlide")) {
      document.querySelector(".folkSlide").remove()
      console.log("removed")
    }

    if (parsedMatches.length > 0) {
        console.log('creating new slide, parsedMatches:', parsedMatches)
        let newData = parsedMatches[0]
        newData.center = [newData.center.x / WIDTH, newData.center.y / HEIGHT]
        newData.width = newData.width / WIDTH
        newData.height = newData.height / HEIGHT
        newData.n = globalMatches[0]['n'];

        createFolkCard(newData)
        globalMatches = undefined
    }
  }
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

function createElementWithText(tag, text) {
  const element = document.createElement(tag);
  element.innerHTML = text;
  return element
}

function displaySlide(n = 0) {
  // let container = document.getElementById("folk-container");
  let slide = document.createElement("div")
  containerEl.innerHTML = ""
  switch (n) {
    case 1:
      // slide.innerHTML = '<h1 class="big"></h1>'
      let title = createElementWithText("h1", "Folk Computer</br>A Computer For The Real World");
      title.classList.add("big");
      slide.appendChild(title)

      slide.appendChild(createElementWithText("h2", "Andr&eacute;s Cuervo"))

      slide.appendChild(createElementWithText("h2", "<s>October 4, 2024</s> Septemeber 27, 2024"))
      break;
    case 2:
      console.log('hello')
      // slide = displayDrawnSlides(15);
      break;
    default:
      break;
  }
  containerEl.appendChild(slide)
}

function displayDrawnSlides(n = 1) {
  // n = number of slides to stack and display
  let imageContainer = document.createElement("div");
  imageContainer.style.position = "relative";

  for (let i = 1; i <= n; i++) {
    let image = document.createElement("img");
    image.src = `./drawings/${i}.png`;
    image.style.width = "100%";
    image.style.height = "auto";
    image.style.position = "absolute";
    imageContainer.appendChild(image);
  }
  // containerEl.appendChild(imageContainer);
  return imageContainer;
}

displaySlide(2)
// displayDrawnSlides(12);