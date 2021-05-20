# react-use-event-outside

## Installation

Install with [Yarn](https://yarnpkg.com/):

```sh
yarn add @omtanke/react-use-event-outside
```

Or with [NPM](https://www.npmjs.com/):

```sh
npm i @omtanke/react-use-event-outside
```

Import into your component like so:

```javascript
import useEventOutside from '@omtanke/react-use-event-outside';
```

## Usage

```javascript
useEventOutside(REF, EVENT_NAME, FUNCTION);
```
**REF**: Outside which element you want to trigger.

**EVENT_NAME**: You want to listen to the event (Ex: 'mousedown', 'touchstart', etc.).

**FUNCTION**: The function you want to run when triggered.

### Example

[CodeSandbox](https://codesandbox.io/s/useeventoutside-6gfby?file=/src/App.js)

or

```javascript
const App = () => {
    const ref = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    
    const closeMenu = useCallback(() => {
        setIsOpen(false);
    }, []);
    
    useEventOutside(ref, 'mousedown', closeMenu);
    
    return (
        <nav className="dropdown" ref={ref}>
            <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
            {isOpen &&
                <ul className='dropdown-menu'>
                    <li className='dropdown-item'>Item</li>
                    <li className='dropdown-item'>Item</li>
                </ul>    
            }
        </nav>
    );
};
```