// From $Display::WIDTH & $Display::HEIGHT on gadget-red
const WIDTH = 1280;
const HEIGHT = 720;
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
let slideNumber = 1;

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
  const left = data.center[0] * viewportWidth - viewportWidth / 2;
  const top = data.center[1] * viewportHeight - viewportHeight / 2;

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
      const dataMatch = item.data.match(
        /center \{(\d+\.\d+) (\d+\.\d+)\} width (\d+\.\d+) height (\d+\.\d+) angle (-?\d+\.\d+)/
      );
      if (dataMatch) {
        result.push({
          center: {
            x: parseFloat(dataMatch[1]),
            y: parseFloat(dataMatch[2]),
          },
          width: parseFloat(dataMatch[3]),
          height: parseFloat(dataMatch[4]),
          angle: parseFloat(dataMatch[5]),
        });
      }
    }
  }

  return result;
}
let displayedSlide = 0;
function loop() {
  if (displayedSlide !== slideNumber) {
    console.log("displaying slide", slideNumber);
    displaySlide(slideNumber - 1); // Adjust for 0-based index
    displayedSlide = slideNumber;
  }
  if (typeof globalMatches !== "undefined") {
    const parsedMatches = parseGlobalMatches(globalMatches);
    if (parsedMatches.length > 0) {
      if (document.querySelector(".folkSlide")) {
        document.querySelector(".folkSlide").remove();
        console.log("removed");
      }

      let newData = parsedMatches[0];
      newData.center = [newData.center.x / WIDTH, newData.center.y / HEIGHT];
      newData.width = newData.width / WIDTH;
      newData.height = newData.height / HEIGHT;
      newData.n = globalMatches[0]["n"];

      createFolkCard(newData);
      globalMatches = undefined;
    }
  }
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

function createElementWithText(tag, text) {
  const element = document.createElement(tag);
  element.innerHTML = text;
  return element;
}

function createImage(path, rotation = 0) {
  let imageContainer = document.createElement("div");
  imageContainer.style.position = "relative";
  imageContainer.style.maxHeight = "100%";
  let image = document.createElement("img");
  image.src = path;
  image.style.height = "80vh";
  // image.style.width = "90%";
  image.style.width = "auto";
  image.style.padding = "10%";
  // image.style.objectFit = "cover";
  // image.style.maxHeight = "100%";

  image.style.padding = "5%";
  image.style.position = "absolute";
  image.style.transform = `rotate(${rotation}deg)`;
  imageContainer.appendChild(image);
  return imageContainer;
}

function createVideo(path, rotation = 0, mute = true) {
  if (document.querySelector("video") === null) {
    let container = document.createElement("div");
    container.style.position = "relative";
    container.style.maxHeight = "100%";
    let video = document.createElement("video");
    // video.src = path;
    video.style.width = "100%";
    video.style.height = "auto";
    video.style.maxHeight = "100vh";
    // video.style.padding = "5%";
    video.style.position = "absolute";
    video.style.transform = `rotate(${rotation}deg)`;
    video.setAttribute("autoplay", true);
    video.setAttribute("loop", true);
    // video.setAttribute("muted", mute);
    video.muted = mute;

    let sourceMP4 = document.createElement("source");
    sourceMP4.type = "video/mp4";
    sourceMP4.src = path;
    video.appendChild(sourceMP4);
    container.appendChild(video);
    console.log(container);
    return container;
  }
}

function displaySlide_old(n = 0) {
  // let container = document.getElementById("folk-container");
  let slide = document.createElement("div");
  containerEl.innerHTML = "";
  switch (n) {
    case 1:
      // slide.innerHTML = '<h1 class="big"></h1>'
      let title = createElementWithText(
        "h1",
        "Folk Computer</br>A Computer For The Real World"
      );
      title.classList.add("big");
      slide.appendChild(title);

      slide.appendChild(createElementWithText("h2", "Andr&eacute;s Cuervo"));

      slide.appendChild(
        createElementWithText(
          "h2",
          "<s>October 4, 2024</s> Septemeber 27, 2024"
        )
      );
      break;
    case 2:
      slide.appendChild(createImage("./assets/laptop_on_desk.png"));
      break;
    case 3:
      slide.appendChild(createImage("./assets/lenovo_thinkpad_clean.png", 3));
      break;
    case 4:
      slide.appendChild(
        createImage("./assets/lenovo_thinkpad_clean.png", 3.56)
      );
      slide.appendChild(createImage("./assets/apple.jpg", -4));
      break;
    case 5:
      slide.appendChild(
        createElementWithText(
          "span",
          "<a href='https://x.com/michael_nielsen/status/1787392849866362938/photo/1'>link to tweet</a>"
        )
      );
      slide.appendChild(createImage("./assets/nielsen.png", -1));
      break;
    case 6:
      slide.appendChild(
        createElementWithText(
          "span",
          "<a href='https://x.com/andy_matuschak/status/1780030794779775146'>link to tweet</a>"
        )
      );
      let andyDiv = document.createElement("div");
      andyDiv.style.paddingLeft = "20%";
      andyDiv.appendChild(createImage("./assets/matuschak.png"));
      slide.appendChild(andyDiv);
      break;
    case 7:
      slide.appendChild(
        createElementWithText(
          "span",
          "<span class=big>Research</span> (<a href='https://en.wikipedia.org/wiki/Research#/media/File:Humanit%C3%A9s_Num%C3%A9riques.JPG'>link</a>)"
        )
      );
      slide.appendChild(createImage("./assets/research.jpg"));
      break;
    case 8:
      slide.appendChild(createImage("./assets/quest.jpg", -2));
      break;
    case 9:
      slide.appendChild(createImage("./assets/quest.jpg", -2));
      slide.appendChild(createImage("./assets/avp.jpg", 2));
      break;
    case 10:
      slide.appendChild(createImage("./assets/mythic.png", -1));
      break;
    case 11:
      slide.appendChild(createImage("./assets/mythic.png", -1));
      slide.appendChild(createImage("./assets/daylight.png", 1));
      break;
    case 12:
      slide.appendChild(createImage("./assets/devices.png"));
      break;
    case 13:
      let bigText = document.createElement("div");
      bigText.style.textAlign = "center";
      bigText.style.paddingTop = "20%";

      bigText.appendChild(
        createElementWithText(
          "h1",
          "<span class=big>1. Spatial computing: useful but intangible</span>"
        )
      );
      slide.appendChild(bigText);
      break;
    case 14:
      let bigText2 = document.createElement("div");
      bigText2.style.textAlign = "center";
      bigText2.style.paddingTop = "20%";

      bigText2.appendChild(
        createElementWithText(
          "h1",
          "<span class=big>1. Spatial computing: useful but intangible</span>"
        )
      );
      bigText2.appendChild(
        createElementWithText(
          "h1",
          "<span class=big>2. Custom computers: tangible but isolated</span>"
        )
      );
      slide.appendChild(bigText2);
      break;
    case 15:
      // slide.appendChild(createImage("./assets/quest.jpg"))
      slide.appendChild(displayDrawnSlides(1));
      break;
    case 16:
      slide.appendChild(displayDrawnSlides(2));
      break;
    case 17:
      slide.appendChild(displayDrawnSlides(3));
      break;
    case 18:
      slide.appendChild(displayDrawnSlides(4));
      break;
    case 19:
      slide.appendChild(displayDrawnSlides(5));
      break;
    case 20:
      slide.appendChild(displayDrawnSlides(6));
      break;
    case 21:
      slide.appendChild(displayDrawnSlides(7));
      break;
    case 22:
      slide.appendChild(displayDrawnSlides(8));
      break;
    case 23:
      slide.appendChild(displayDrawnSlides(9));
      break;
    case 24:
      slide.appendChild(displayDrawnSlides(10));
      break;
    case 25:
      slide.appendChild(displayDrawnSlides(11));
      break;
    case 26:
      slide.appendChild(displayDrawnSlides(12));
      break;
    case 27:
      slide.appendChild(displayDrawnSlides(13));
      break;
    case 28:
      slide.appendChild(displayDrawnSlides(14));
      break;
    case 29:
      slide.appendChild(displayDrawnSlides(15));
      break;
    case 30:
      let padVideo = document.createElement("div");
      padVideo.style.paddingLeft = "32%";
      padVideo.style.marginTop = "-2%";
      let video = createVideo("./assets/printing_a_program_2x.mp4");
      video.playbackRate = 2.2;
      padVideo.appendChild(video);
      slide.appendChild(padVideo);
      break;
    case 31:
      slide.appendChild(createImage("./assets/faries.gif"));
      break;
    case 32:
      let padVideo_ = document.createElement("div");
      padVideo_.style.paddingLeft = "32%";
      padVideo_.style.marginTop = "-2%";
      let video_ = slide.appendChild(createVideo("./assets/editor.mp4"));
      video_.playbackRate = 3;
      padVideo_.appendChild(video_);
      slide.appendChild(padVideo_);
      break;
    case 33:
      slide.appendChild(createImage("./assets/connecting_lines.jpg"));
      break;
    case 34:
      let padVideo2 = document.createElement("div");
      padVideo2.style.paddingLeft = "32%";
      padVideo2.style.marginTop = "-2%";
      let video2 = slide.appendChild(createVideo("./assets/animation.mp4"));
      video2.playbackRate = 3;
      padVideo2.appendChild(video2);
      slide.appendChild(padVideo2);
      break;
    case 35:
      slide.appendChild(createImage("./assets/jacob_text_association.gif"));
      break;
    case 36:
      slide.appendChild(createImage("./assets/capture_deskshot.gif"));
      break;
    case 37:
      slide.appendChild(createVideo("./assets/folk_naveen_opencv_sliders.mp4"));
      break;
    case 38:
      slide.appendChild(createImage("./assets/blob.gif"));
      break;
    case 39:
      slide.appendChild(createImage("./assets/jacob_pointer.gif"));
      break;
    case 40:
      slide.appendChild(
        createVideo("./assets/jessie_recurse_piano.mp4", 0, false)
      );
      break;
    case 41:
      slide.appendChild(createImage("./assets/pilot.png"));
      break;
    case 42:
      slide.appendChild(
        createElementWithText("h3", "folk-arc, Atlanta, Georgia, United States")
      );
      slide.appendChild(
        createElementWithText(
          "h3",
          "folk-enjalot, Atlanta, Georgia, United States"
        )
      );
      slide.appendChild(
        createElementWithText("h3", "folk-opendot, Milan, Lombardy, Italy")
      );
      slide.appendChild(
        createElementWithText("h3", "folk-dpip, Midvale, Utah, United States")
      );
      slide.appendChild(
        createElementWithText(
          "h3",
          "folk-haip, Boston, Massachusetts, United States"
        )
      );
      slide.appendChild(
        createElementWithText("h3", "folk-zeca, São Paulo, Brazil")
      );
      slide.appendChild(
        createElementWithText("h3", "folk-michaud, Toronto, Canada")
      );
      slide.appendChild(createElementWithText("h3", "folk-wwj, Sanya, China"));
      break;
    case 43:
      slide.appendChild(createImage("./assets/future_1.png"));
      break;
    case 44:
      slide.appendChild(createImage("./assets/future_2.png"));
      break;
    case 45:
      slide.appendChild(createImage("./assets/future_3.png"));
      break;
    case 46:
      slide.appendChild(createImage("./assets/future_4.png"));
      break;
    case 47:
      slide.appendChild(createImage("./assets/future_5.png"));
      break;
    case 48:
      slide.appendChild(createImage("./assets/future_6.png"));
      break;
    case 49:
      slide.appendChild(createImage("./assets/future_7.png"));
      break;
    case 50:
      slide.appendChild(createElementWithText("h2", "These Slides"));
      slide.appendChild(createImage("./assets/gadget.jpg"));
      break;
    case 51:
      slide.appendChild(createElementWithText("h1", "Andr&eacute;s Cuervo"));
      slide.appendChild(createElementWithText("h1", "folk.computer/pilot"));
      slide.appendChild(createElementWithText("h1", "Thank you"));
      break;
    case 99:
      // let padVideo2 = document.createElement("div");
      // padVideo2.style.paddingLeft = "32%";
      // padVideo2.style.marginTop = "-2%";
      // let video2 = slide.appendChild(createVideo("./assets/sound_cards.mp4"))
      // video2.playbackRate = 2.2;
      // padVideo2.appendChild(vide2)
      // slide.appendChild(padVideo2)
      break;
    case 100:
      slide.appendChild(displayDrawnSlides(2));
      break;
    default:
      break;
  }
  containerEl.appendChild(slide);
}

function displayDrawnSlides(n = 1) {
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
  return imageContainer;
}

function toggleFullscreen() {
  let elem = document.body;

  if (!document.fullscreenElement) {
    elem.requestFullscreen().catch((err) => {
      alert(
        `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
      );
    });
  } else {
    document.exitFullscreen();
  }
}

const slides = [
  {
    content: () => {
      const slide = document.createElement("div");
      const title = createElementWithText(
        "h1",
        "Folk Computer</br>A Computer For The Real World"
      );
      title.classList.add("big");
      slide.appendChild(title);
      slide.appendChild(createElementWithText("h2", "Andr&eacute;s Cuervo"));
      slide.appendChild(
        createElementWithText("h2", "<s>October 4, 2024</s> September 27, 2024")
      );
      return slide;
    },
  },
  { content: () => createImage("./assets/laptop_on_desk.png") },
  { content: () => createVideo("./assets/anime_twits_1.mp4") }, // Ghibli inspiration
  { content: () => createVideo("./assets/anime_twits_2.mp4") }, // Ghibli inspiration
  { content: () => createVideo("./assets/anime_twits_3.mp4") }, // Ghibli inspiration
  { content: () => createVideo("./assets/anime_twits_4.mp4") }, // Ghibli inspiration
  { content: () => createImage("./assets/laptop_on_desk.png") },
  { content: () => displayDrawnSlides(1) },
  { content: () => displayDrawnSlides(2) },
  { content: () => displayDrawnSlides(3) },
  { content: () => displayDrawnSlides(4) },
  { content: () => displayDrawnSlides(5) },
  { content: () => displayDrawnSlides(6) },
  { content: () => displayDrawnSlides(7) },
  { content: () => displayDrawnSlides(8) },
  { content: () => displayDrawnSlides(9) },
  { content: () => displayDrawnSlides(10) },
  { content: () => displayDrawnSlides(11) },
  { content: () => displayDrawnSlides(12) },
  { content: () => displayDrawnSlides(13) },
  { content: () => displayDrawnSlides(14) },
  { content: () => displayDrawnSlides(15) },
  {
    content: () => {
      const padVideo = document.createElement("div");
      padVideo.style.paddingLeft = "32%";
      padVideo.style.marginTop = "-2%";
      const video = createVideo("./assets/printing_a_program_2x.mp4");
      video.playbackRate = 2.2;
      padVideo.appendChild(video);
      return padVideo;
    },
  },
  { content: () => createImage("./assets/lenovo_thinkpad_clean.png", 3) },
  {
    content: () => {
      const slide = document.createElement("div");
      slide.appendChild(
        createImage("./assets/lenovo_thinkpad_clean.png", 3.56)
      );
      slide.appendChild(createImage("./assets/apple.jpg", -4));
      return slide;
    },
  },
  {
    content: () => {
      const slide = document.createElement("div");
      slide.appendChild(
        createElementWithText(
          "span",
          "<a href='https://x.com/michael_nielsen/status/1787392849866362938/photo/1'>link to tweet</a>"
        )
      );
      slide.appendChild(createImage("./assets/nielsen.png", -1));
      return slide;
    },
  },
  {
    content: () => {
      const slide = document.createElement("div");
      slide.appendChild(
        createElementWithText(
          "span",
          "<a href='https://x.com/andy_matuschak/status/1780030794779775146'>link to tweet</a>"
        )
      );
      const andyDiv = document.createElement("div");
      andyDiv.style.paddingLeft = "20%";
      andyDiv.appendChild(createImage("./assets/matuschak.png"));
      slide.appendChild(andyDiv);
      return slide;
    },
  },
  {
    content: () => {
      const slide = document.createElement("div");
      slide.appendChild(
        createElementWithText(
          "span",
          "<span class=big>Research</span> (<a href='https://en.wikipedia.org/wiki/Research#/media/File:Humanit%C3%A9s_Num%C3%A9riques.JPG'>link</a>)"
        )
      );
      slide.appendChild(createImage("./assets/research.jpg"));
      return slide;
    },
  },
  { content: () => createImage("./assets/quest.jpg", -2) },
  {
    content: () => {
      const slide = document.createElement("div");
      slide.appendChild(createImage("./assets/quest.jpg", -2));
      slide.appendChild(createImage("./assets/avp.jpg", 2));
      return slide;
    },
  },
  { content: () => createImage("./assets/mythic.png", -1) },
  {
    content: () => {
      const slide = document.createElement("div");
      slide.appendChild(createImage("./assets/mythic.png", -1));
      slide.appendChild(createImage("./assets/daylight.png", 1));
      return slide;
    },
  },
  { content: () => createImage("./assets/devices.png") },
  {
    content: () => {
      const bigText = document.createElement("div");
      bigText.style.textAlign = "center";
      bigText.style.paddingTop = "20%";
      bigText.appendChild(
        createElementWithText(
          "h1",
          "<span class=big>1. Spatial computing: useful but intangible</span>"
        )
      );
      return bigText;
    },
  },
  {
    content: () => {
      const bigText2 = document.createElement("div");
      bigText2.style.textAlign = "center";
      bigText2.style.paddingTop = "20%";
      bigText2.appendChild(
        createElementWithText(
          "h1",
          "<span class=big>1. Spatial computing: useful but intangible</span>"
        )
      );
      bigText2.appendChild(
        createElementWithText(
          "h1",
          "<span class=big>2. Custom computers: tangible but isolated</span>"
        )
      );
      return bigText2;
    },
  },
  { content: () => createImage("./assets/faries.gif") },
  {
    content: () => {
      const padVideo_ = document.createElement("div");
      padVideo_.style.paddingLeft = "32%";
      padVideo_.style.marginTop = "-2%";
      const video_ = createVideo("./assets/editor.mp4");
      video_.playbackRate = 3;
      padVideo_.appendChild(video_);
      return padVideo_;
    },
  },
  { content: () => createImage("./assets/connecting_lines.jpg") },
  {
    content: () => {
      const padVideo2 = document.createElement("div");
      padVideo2.style.paddingLeft = "32%";
      padVideo2.style.marginTop = "-2%";
      const video2 = createVideo("./assets/animation.mp4");
      video2.playbackRate = 3;
      padVideo2.appendChild(video2);
      return padVideo2;
    },
  },
  { content: () => createImage("./assets/cnc_2.jpg") },
  { content: () => createImage("./assets/cnc_1.jpg") },
  { content: () => createImage("./assets/omar_cnc.jpg") },
  { content: () => createImage("./assets/jacob_text_association.gif") },
  { content: () => createImage("./assets/capture_deskshot.gif") },
  { content: () => createVideo("./assets/folk_naveen_opencv_sliders.mp4") },
  { content: () => createImage("./assets/blob.gif") },
  { content: () => createImage("./assets/jacob_pointer.gif") },
  { content: () => createVideo("./assets/jessie_recurse_piano.mp4", 0, false) },
  { content: () => createImage("./assets/folk_github.png") },
  { content: () => createImage("./assets/folk_sponsors.png") },
  { content: () => createImage("./assets/pilot.png") },
  {
    content: () => {
      const slide = document.createElement("div");
      slide.appendChild(
        createElementWithText("h3", "folk-arc, Atlanta, Georgia, United States")
      );
      slide.appendChild(
        createElementWithText(
          "h3",
          "folk-enjalot, Atlanta, Georgia, United States"
        )
      );
      slide.appendChild(
        createElementWithText("h3", "folk-opendot, Milan, Lombardy, Italy")
      );
      slide.appendChild(
        createElementWithText("h3", "folk-dpip, Midvale, Utah, United States")
      );
      slide.appendChild(
        createElementWithText(
          "h3",
          "folk-haip, Boston, Massachusetts, United States"
        )
      );
      slide.appendChild(
        createElementWithText("h3", "folk-zeca, São Paulo, Brazil")
      );
      slide.appendChild(
        createElementWithText("h3", "folk-michaud, Toronto, Canada")
      );
      slide.appendChild(createElementWithText("h3", "folk-wwj, Sanya, China"));
      return slide;
    },
  },
  { content: () => createImage("./assets/future_1.png") },
  { content: () => createImage("./assets/future_2.png") },
  { content: () => createImage("./assets/future_3.png") },
  { content: () => createImage("./assets/future_4.png") },
  { content: () => createImage("./assets/future_5.png") },
  { content: () => createImage("./assets/future_6.png") },
  { content: () => createImage("./assets/future_7.png") },
  {
    content: () => {
      const slide = document.createElement("div");
      slide.appendChild(createElementWithText("h2", "These Slides"));
      slide.appendChild(createImage("./assets/gadget.jpg"));
      return slide;
    },
  },
  {
    content: () => {
      const slide = document.createElement("div");
      slide.appendChild(createElementWithText("h2", "[tour of gadget-red]"));
      return slide;
    },
  },
  {
    content: () => {
      const slide = document.createElement("div");
      slide.appendChild(createElementWithText("h1", "Andr&eacute;s Cuervo"));
      slide.appendChild(createElementWithText("h1", "folk.computer/pilot"));
      slide.appendChild(createElementWithText("h1", "Thank you"));
      return slide;
    },
  },
];

function displaySlide(n = 0) {
  containerEl.innerHTML = "";
  if (n >= 0 && n < slides.length) {
    const slide = slides[n].content();
    containerEl.appendChild(slide);
  }
}

document.body.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    slideNumber = Math.min(slideNumber, slides.length);
  } else if (event.key === "ArrowLeft") {
    slideNumber = Math.max(slideNumber, 1);
  } else if (event.key === "f") {
    toggleFullscreen();
  }
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    slideNumber += 1;
    if (slideNumber > slides.length) {
      slideNumber = slides.length;
    }
  } else if (event.key === "ArrowLeft") {
    slideNumber -= 1;
    if (slideNumber < 1) {
      slideNumber = 1;
    }
  } else if (event.key === "9") {
    slideNumber = 36;
  } else if (event.key === "f") {
    toggleFullscreen();
  }
})