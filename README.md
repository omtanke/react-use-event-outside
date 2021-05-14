# react-use-event-outside

## Installation

Install with [Yarn](https://yarnpkg.com/):

```sh
yarn add react-use-event-outside
```

Or with [NPM](https://www.npmjs.com/):

```sh
npm i react-use-event-outside
```

Import into your component like so:

```javascript
import useEventOutSide from 'react-use-event-outside';
```

## Usage

```javascript
useEventOutSide(REF, EVENT_NAME, FUNCTION);
```
**REF**: Outside which element you want to trigger.

**EVENT_NAME**: You want to listen to the event (Ex: 'mousedown', 'touchstart', etc.).

**FUNCTION**: The function you want to run when triggered.

```javascript
const App = () => {
    const ref = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    
    const closeMenu = useCallback(() => {
        setIsOpen(false);
    }, []);
    
    useEventOutSide(ref, 'mousedown', closeMenu);
    
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