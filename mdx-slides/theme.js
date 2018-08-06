// example theme.js
import { future } from 'mdx-deck/themes'
import okaidia from 'react-syntax-highlighter/styles/prism/okaidia'

let white = '#eee'

export default {
    ...future,
    colors: {
        text: 'black',
        background: '#2EAFAC',
        link: 'blue',
    },
    h1: {
        textTransform: 'uppercase',
    },
    css: {
        '@media screen and (min-width:64em)': {
            fontSize: '32px',
        }
    },
    prism: {
        style: okaidia,
        stylesheet: 'atomDark'
    }
}
