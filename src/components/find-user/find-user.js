import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
import SelectSearch, {fuzzySearch} from "react-select-search";
import 'react-select-search/style.css';


const FindUser = ({userSelected}) => {
    // const [searchValue, setSearchValue] = useState("");
    // const [redirect, setRedirect] = useState(false);
    const [options, setOptions] = useState(null);

    useEffect(() => {
        fetch("/api/users").then(res =>
            res.json()
        ).then(users => setOptions(users));
    }, []);

    return (
        options === null ?
        <div>Loading</div> :
        <div className="find_user">
            <SelectSearch search
                filterOptions={fuzzySearch}
                emptyMessage="Not found"
                placeholder="Select user"
                options={options}
                onChange={user => {userSelected(user);}}/>
        </div>
    );
}

export default FindUser;
