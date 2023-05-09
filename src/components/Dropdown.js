import React, {useState, useEffect, useRef} from "react";
import "./Dropdown.css";

export function Dropdown({ 
    placeHolder, 
    options, 
    selected, 
    onSelectedChange 
}) {
    const [showMenu, setShowMenu] = useState(false);
    const inputRef = useRef();

    useEffect(() => {
        const handler = (e) => {
            if (inputRef.current && !inputRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };
        window.addEventListener("click", handler);

        return () => {
            window.removeEventListener("click", handler);
        };
    }, [showMenu]);

    const handleInputClick = () => {
        setShowMenu(!showMenu);
    };

    const getDisplay = () => {
        if (selected) {
            return selected.label;
        };
        return placeHolder;
    };

    const onItemClick = (option) => {
        onSelectedChange(option);
    };

    const isSelected = (option) => {
        if (!selected) {
            return false;
        };

        return selected.value === option.value;
    };

    return (
        <div className="dropdown-container">
            <div ref={inputRef} onClick={handleInputClick} className="dropdown-input">
                <div className="dropdown-selected-value">{getDisplay()}</div>
            </div>
            {showMenu && (<div className="dropdown-menu">
                {options.map((option) => {
                    return (
                        <div 
                            onClick={() => onItemClick(option)}
                            key={option.value} 
                            className={`dropdown-item ${isSelected(option) && "selected"}`}
                        >
                            {option.label}
                        </div>
                    )
                })}
            </div>)}
        </div>
    );
};