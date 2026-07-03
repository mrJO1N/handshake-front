import { useState } from "react";

export const usePostsPageState = () => {
    const [isCreateOpen, setCreateOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [query, setQuery] = useState(''); //search

    const handleSearch = () => setQuery(searchValue);

    return { query, searchValue, setSearchValue, handleSearch, isCreateOpen, setCreateOpen };
};