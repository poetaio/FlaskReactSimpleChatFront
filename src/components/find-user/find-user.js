import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import SelectSearch, {fuzzySearch} from "react-select-search";
import 'react-select-search/style.css';
import "./find-user.css";
import searchIcon from "../../assets/images/search_icon.png";

const FindUser = ({userSelected}) => {
    // const [searchValue, setSearchValue] = useState("");
    // const [redirect, setRedirect] = useState(false);
    const [options, setOptions] = useState([]);
    const [users, setUsers] = useState(null);
    const [inputText, setInputText] = useState("");
    const emptyOption = {
        name: "No users found",
        value: "",
        username: []
    }

    useEffect(() => {
        fetch("/api/users").then(res =>
            res.json()
        ).then(users => setUsers(
            users.map(user => ({
                name: user.name,
                value: user.value,
                username: user.value.split("").map(val => ({
                    value: val,
                    match: false
                }))
            }))
        ));
    }, []);

    function markInclude(option, include) {
        let index = option.value.indexOf(include);
        let length = include.length;
        for (let i = 0; i < option.value.length; ++i) {
            if (i >= index && i < index + length) {
                option.username[i].match = true;
            }
            else 
                option.username[i].match = false;
        }
    }

    function handleSearch(e) {
        let newInputText = e.target.value;
        setInputText(newInputText);
        if (newInputText === "") {
            setOptions([]);
            return;
        }

        let newOptions = users.filter(x => x.value.includes(newInputText));
        newOptions.forEach(option => markInclude(option, newInputText));
        setOptions(newOptions.length === 0 ? [emptyOption] : newOptions);
    }

    return (
        options === null ?
        <div>Loading...</div> :
        <div className="find_user">
            {/* <SelectSearch search
                filterOptions={fuzzySearch}
                emptyMessage="Not found"
                placeholder="Select user"
                options={options}
                onChange={user => {userSelected(user);}}/> */
            }
            <div className="find_user__input_wrapper">
                <input value={inputText} onChange={handleSearch} className="  form-control rounded  find_user__input" type="search" placeholder="Search" aria-label="Search"/>
                <img onClick={handleSearch} className="find_user__input_image" src={searchIcon} alt=""/>
            </div>
            <div className="find_user__options_list">
                {options.map((option, i) => (
                option.name === "" ?
                <div className="find_user__option  find_user__option--not_found" key={i}>No users found</div> :
                <div className="find_user__option" onClick={() => {userSelected(option.value); setOptions([]); setInputText("");}} key={i} >
                    <div className="find_user__option_name">{option.name}</div>
                    <div className="find_user__option_value">
                        {option.username.map((ch, i) => {
                            let cls = ch.match ? "find_user__match" : "";
                            return (
                                <span key={i} className={cls}>{ch.value}</span>
                            )
                        })}
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}

export default FindUser;
