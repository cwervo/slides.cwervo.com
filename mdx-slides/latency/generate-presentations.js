let audiences = [
    { text: 'cloudflare', isCloudflare: true},
    { text: 'ctrl-l', isCloudflare: false},
]

function generateText(audience) {
    return `
export { default as theme } from '../../theme'
import { Image, Appear, Notes } from 'mdx-deck'
import { SplitRight } from 'mdx-deck/layouts'
import PresentButton from '../../PresentButton'

# Latency, Real-Time Software, & ${audience.isCloudflare ? 'Cloudflare' : 'Ctrl-l'}

Note to self: see in Notion @Why build custom hardware for spatial computing? Because computers are not spatial!

---

I'm interested in the question of latency, not for its own sake but for what _experiences_ we might build

---

# A simple example

... image + caption for latency diagram from []()


---

# A complex example

${audience.isCloudflare ? `


![](https://storage.googleapis.com/gweb-cloudblog-publish/images/tpu-3gpcs.max-1200x1200.PNG)
Google developed the TPU to make the experience of developing machine learning 

` :
`We know what a tactile keyboard looks like, and [they're not easy to master](https://en.wikipedia.org/wiki/Chorded_keyboard). [BCI speech](https://news.mit.edu/2018/computer-system-transcribes-words-users-speak-silently-0404) excites me because it creates a tool for telling computers how we speak. Voice control is good, but it's exactly that: command & control, not simple, fluid, general **interaction**.

`}

---

# Something old, something new

Basically talk about how this is an old problem of knowledge reproduction, copying information [a book, an image, a bank balance, a database value](https://cloud.google.com/blog/products/gcp/an-in-depth-look-at-googles-first-tensor-processing-unit-tpu)

---

### Computers we not made for realtime control, they were made for war (Difference Engine, ENIAC, Bletchly Park) & for business (IBM). We've spent the last few decades talking about personal computers, but that's the wrong model. Computers are a tool & [a tool is:](http://worrydream.com/ABriefRantOnTheFutureOfInteractionDesign/) "A tool addresses human needs by amplifying human capabilities."

![](http://worrydream.com/ABriefRantOnTheFutureOfInteractionDesign/Images/Tool1.png)

So, what do we make of this business? Of prying apart clients/servers?

---

# Latency as a function of human control


${audience.isCloudflare ?
''
        :
// ctrl-l
''}

(humans are not computers: we don't have infinite state & such)

--

# beep

---
`
}

const fs = require('fs');

audiences.forEach(audience => {
fs.writeFile(`./${audience.text}/index.mdx`, generateText(audience), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("Done!");
});
})
