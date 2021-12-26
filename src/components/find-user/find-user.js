import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import SelectSearch, {fuzzySearch} from "react-select-search";
import 'react-select-search/style.css';


const FindUser = () => {
    const [searchValue, setSearchValue] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [options, setOptions] = useState(null);

    useEffect(() => {
        fetch("/api/users").then(res =>
            res.json()
        ).then(users => setOptions(users));
    }, []);

    return (
        redirect ?
        <Navigate to={`/chat?username=${searchValue}`}/> :
        options === null ?
        <div>Loading</div> :
        <div className="find_user">
            <SelectSearch search
                filterOptions={fuzzySearch}
                emptyMessage="Not found"
                placeholder="Select your country"
                options={options}
                onChange={e => {setSearchValue(e); setRedirect(true);}}/>
            {/* <input className="find_user__input" type="text" value={searchValue} onChange={setSearchValue}/>
            <select className="find_user__select">
                <option className="find_user__select_option" value="Vasya">Vasya</option>
                <option className="find_user__select_option" value="Evgen">Evgen</option>
            </select> */}
        </div>
    );
}

export default FindUser;
