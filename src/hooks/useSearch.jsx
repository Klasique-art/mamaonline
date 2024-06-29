import { useState } from 'react';

const useSearch = (initialData = []) => {
    const [data, setData] = useState(initialData);
    const [searchQuery, setSearchQuery] = useState("");
    const [resultNotFound, setResultNotFound] = useState(false);

    const handleOnSearch = (text) => {
        setSearchQuery(text);

        if (!text.trim()) {
            setSearchQuery("");
            setResultNotFound(false);
            setData(initialData);
            return;
        }

        const filteredData = initialData.filter(item =>
            item.name.toLowerCase().includes(text.toLowerCase())
        );

        if (filteredData.length) {
            setData(filteredData);
            setResultNotFound(false);
        } else {
            setResultNotFound(true);
        }
    };

    return {
        data,
        setData,
        searchQuery,
        resultNotFound,
        handleOnSearch,
    };
};

export default useSearch;
