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