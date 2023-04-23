# Steeleye Assignment Front-End

### Q-1 Explain what the simple List component does.
Ans. The following is a React component named "List" that allows users to select items from a list. It contains two sub-components: "WrappedSingleListItem" and "WrappedListComponent". The "WrappedSingleListItem" component is a memoized functional component that renders a single list item element with a background color based on its selection status. It takes four arguments: "index", "isSelected", "onClickHandler", and "text". The "WrappedListComponent" is also a memoized functional component that creates a list of items using the "WrappedSingleListItem" component. It takes an array of objects with "text" and "key" attributes as input. The component uses the "useState" and "useEffect" hooks to keep track of the currently selected item's index. The List component iterates over the array of items and creates a SingleListItem component for each one. It passes relevant props to the SingleListItem component to handle the display and behavior of each item. The List component also manages the state of the selected index using the useState hook, which allows it to keep track of the currently selected item in the list. When a user clicks on an item, the handleClick function updates the selected index based on the user's actions. As a result, the List component provides an interactive and dynamic list of selectable items for users to interact with on the website.

### Q-2 What problems / warnings are there with code?
Ans.
Error 1: The Invalid prop `isSelected` of type string supplied to `WrappedSingleListItem`, expected boolean" error occurs when assigning a string value to the `isSelected` prop, which has been set as a boolean in the propType, causing a type mismatch.
```js
const handleClick = (index) => {
        console.log(index);
        handleItemSelect(index);
        setSelectedIndex === index ? selectedIndex(null) : selectedIndex(index);
        console.log(setSelectedIndex);
    };
```
Error 2: There was an error in declaring the `selectedIndex` variable. The issue was related to a missing dependency in the useEffect hook, specifically `setSelectedIndex`.
```js
const [setSelectedIndex, selectedIndex] = useState();
```

Error 3: The `map()` method was called without proper data being passed from the App component, resulting in the `selectedIndex` variable being set to null by default, which caused an error. To address this, a default prop can be set for the data to ensure that the `map()` method has valid data to work with.
```js
WrappedListComponent.propTypes = {
items: PropTypes.arrayOf(
PropTypes.shape({
text: PropTypes.string.isRequired
})
)
};

WrappedListComponent.defaultProps = {
items: [
{
text: "Attack On Titan",
},
{
text: "Demon Slayer",
},
{
text: "Death Note",
},
{
text: "One Piece",
},
{
text: "Naruto",
},
{
text: "Jujutsu Kaisen",
},
{
text: "My Hero Academia",
},
]
};
```

Error 4: The code has issues with PropTypes usage, specifically the incorrect use of `shapeOf` instead of `shape` to define the shape of an object prop. It is essential to use `shape` to ensure proper validation of PropTypes in the component.
```js
WrappedListComponent.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired
        })
    )
};
```

Error 5: The `onClickHandler` function is being invoked as a regular function, causing the rendered color to always be green as it takes the initial value of the passed index. To fix this issue, `onClickHandler` should be called as an arrow function to receive the updated index value.
```js
onClick={()=>onClickHandler(index)}
```

Error 6: When using React to map through an array and generate a list of elements, it's crucial to assign a unique `key` prop to each item. In the `WrappedListComponent`, adding a `key` prop to the `SingleListItem` component ensures proper rendering and optimization.
```js
<SingleListItem
    key={index}        //added
    text={item.text}    //added
    index={index}
    isSelected={setSelectedIndex === index}   //added
    currBtn={currBtn}              //added
    selectedItems={selectedItems}   //added
    onClickHandler={() => handleClick(index)}
/>
```
### Q-3 Please fix, optimize, and/or modify the component as much as you think is necessary.
Ans. Fixed and optimized the code as per the above errors :

```js
import React, { useState, memo } from "react";
import PropTypes from "prop-types";
import "./List.css"

const WrappedSingleListItem = ({ index, isSelected, text, currBtn, onClickHandler, selectedItems }) => {
    if (currBtn === 'single') {
        return (
            <>
                <li
                    style={{ backgroundColor: isSelected ? "orange" : "red", letterSpacing: '0.8', border: '2px solid black', listStyleType: 'none', margin: '5px', height: '35px', textAlign: 'center', fontWeight: 700, cursor: 'pointer' }}
                    onClick={() => onClickHandler(index)} 
                >
                    {text}
                </li>
            </>
        );
    }
    else if (currBtn === 'multiple') {
        return (
            <>
                <li
                    style={{ backgroundColor: selectedItems.includes(index) ? "green" : "red", letterSpacing: '0.8', border: '2px solid black', listStyleType: 'none', margin: '5px', height: '35px', textAlign: 'center', fontWeight: 700, cursor: 'pointer' }}
                    onClick={() => onClickHandler(index)}
                >
                    {text}
                </li>
            </>
        );
    }
    else {
        return (
            <>
                <li
                    style={{ backgroundColor: "red", letterSpacing: '0.8', border: '2px solid blue', margin: '5px', height: '35px', textAlign: 'center', listStyleType: 'none', fontWeight: 700, cursor: 'pointer' }}
                    onClick={() => onClickHandler(index)}
                >
                    {text}
                </li>
            </>
        );
    }
};


WrappedSingleListItem.propTypes = {
    index: PropTypes.number,
    isSelected: PropTypes.bool,
    onClickHandler: PropTypes.func.isRequired,
    selectedItems:PropTypes.array,
    text: PropTypes.string.isRequired
};

const SingleListItem = memo(WrappedSingleListItem);


const WrappedListComponent = ({ items }, props) => {
    const [setSelectedIndex, selectedIndex] = useState();


    const [currBtn, setcurrBtn] = useState('single');


    const onClickSingle = () => {
        setcurrBtn('single');
        console.log("single");

    }
    const onClickMultiple = () => { 
        setcurrBtn('multiple');
        console.log("multiple");
    }
    const onClickClear = () => { 
        setcurrBtn('clear');
        setSelectedItems([]);
        selectedIndex(null);
        console.log(props);
    }


    const [selectedItems, setSelectedItems] = useState([]);
    const handleItemSelect = (itemId) => {
        if (selectedItems.includes(itemId) && currBtn==='multiple') {
            setSelectedItems(selectedItems.filter(id => id !== itemId));
        } else if(currBtn==='multiple'){
            setSelectedItems([...selectedItems, itemId]);
        }
    }

    const handleClick = (index) => {
        console.log(index);
        handleItemSelect(index);
        setSelectedIndex === index ? selectedIndex(null) : selectedIndex(index);
        console.log(setSelectedIndex);
    };

    return (
        <>
        <div id='divmain'>
        <ul style={{ textAlign: "left", marginTop: '40px',paddingRight:'35px'}}>
            {items.map((item, index) => (
                <SingleListItem
                    key={index}        
                    text={item.text}    
                    index={index}
                    isSelected={setSelectedIndex === index}   
                    currBtn={currBtn}              
                    selectedItems={selectedItems}       
                    onClickHandler={() => handleClick(index)}
                />
            ))}
        </ul>
        <div className="container" style={{
            margin: 'auto',
            width: '20%',
            marginRight: '1050px',
            padding: '50px',
            display: 'flex',
            justifyContent: 'space-between'
        }}>

<button type="button" onClick={onClickSingle} id='singleBtn' style={currBtn==='single'?{border:'6px solid black'}:{border:'none'}} class="btn btn-success mx-2">Single</button>
            <button type="button" onClick={onClickMultiple} style={currBtn==='multiple'?{border:'6px solid black'}:{border:'none'}} id='multiBtn'class="btn btn-danger mx-2">Multiple</button>
            <button type="button" onClick={onClickClear} style={currBtn==='clear'?{border:'6px solid black'}:{border:'none'}} id='clearBtn'class="btn btn-warning mx-2">Clear</button>
        </div>
        </div>
        </>
    );
};

WrappedListComponent.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired
        })
    )
};

WrappedListComponent.defaultProps = {
    items: [
        {
          text: "Attack On Titan",
        },
        {
          text: "Demon Slayer",
        },
        {
          text: "Death Note",
        },
        {
          text: "One Piece",
        },
        {
          text: "Naruto",
        },
        {
          text: "Jujutsu Kaisen",
        },
        {
          text: "My Hero Academia",
        },
      ]
};

const List = memo(WrappedListComponent);

export default List;
```
