import React, { useState } from "react";
import CachedUserData from "./components/Chache Results";
import MasterDetailView from "./components/MasterDetailView";
import DebouncedSearch from "./components/Debouncing Search";
import InfiniteScroll from "./components/InfiniteScrolling";
import Loading from "./components/Loading";
import HandleAPIErrorGracefully from "./components/HandleApi";
import UserPostsDynamic from "./components/Dynamic Data Fetching";
import PaginatedUsers from "./components/PlaginatedApiFetch";
import SearchableAPIData from "./components/SearchableAPIData";
import UserList from "./components/UserList";
import './App.css';

const App = () => {
    const [selectedPage, setSelectedPage] = useState("");

    const handlePageChange = (page) => {
        setSelectedPage(page);
    };

    return (
        <div>
            <h1>Fetch and Display User Data</h1>
            <nav>
                <ul>
                    <li>
                        <button onClick={() => handlePageChange("user-list")}>User List</button>
                    </li>
                    <li>
                        <button onClick={() => handlePageChange("loading")}>Loading</button>
                    </li>
                    <li>
                        <button onClick={() => handlePageChange("handle-api-error")}>Handle API Error</button>
                    </li>
                    <li>
                        <button onClick={() => handlePageChange("user-posts")}>User Posts Dynamic</button>
                    </li>
                    <li>
                        <button onClick={() => handlePageChange("paginated-users")}>Paginated Users</button>
                    </li>
                    <li>
                        <button onClick={() => handlePageChange("searchable-api-data")}>Searchable API Data</button>
                    </li>
                    <li>
                        <button onClick={() => handlePageChange("cached-user-data")}>Cache Results</button>
                    </li>
                    <li>
                        <button onClick={() => handlePageChange("master-detail-view")}>Master Detail View</button>
                    </li>
                    <li>
                        <button onClick={() => handlePageChange("debounced-search")}>Debounced Search</button>
                    </li>
                    <li>
                        <button onClick={() => handlePageChange("infinite-scrolling")}>Infinite Scrolling</button>
                    </li>
                </ul>
            </nav>

            {selectedPage === "user-list" && <UserList />}
            {selectedPage === "loading" && <Loading />}
            {selectedPage === "handle-api-error" && <HandleAPIErrorGracefully />}
            {selectedPage === "user-posts" && <UserPostsDynamic />}
            {selectedPage === "paginated-users" && <PaginatedUsers />}
            {selectedPage === "searchable-api-data" && <SearchableAPIData />}
            {selectedPage === "cached-user-data" && <CachedUserData />}
            {selectedPage === "master-detail-view" && <MasterDetailView />}
            {selectedPage === "debounced-search" && <DebouncedSearch />}
            {selectedPage === "infinite-scrolling" && <InfiniteScroll />}
        </div>
    );
};

export default App;
