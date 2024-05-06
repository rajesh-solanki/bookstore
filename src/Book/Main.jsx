import React, { useEffect, useState } from 'react';
import './style.css'

function Main() {
    const [booksBySubjects, setBooksBySubjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const fetchBooks = async () => {
        
                const urls = [
                    "https://openlibrary.org/subjects/thriller.json?details=true",
                    "https://openlibrary.org/subjects/love.json?details=true",
                    "https://openlibrary.org/subjects/kids.json?details=true",
                    "https://openlibrary.org/subjects/romance.json?details=true",
];
                const responses = await Promise.all(urls.map(url => fetch(url)));
                const results = await Promise.all(responses.map(response => response.json()));

                setBooksBySubjects(results);   
        };

        fetchBooks();
    }, []);
    const handleSearch = async () => {
        // https://openlibrary.org/search.json?q=the+lord+of+the+rings
            const response = await fetch(`https://openlibrary.org/search.json?q=${searchTerm}`);
            const searchData = await response.json();
            setBooksBySubjects([searchData])
    };
    return (
        <>
       <div className='search_bar'>
                <input type="text" placeholder='search by book name' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                <button onClick={handleSearch}>Search</button>
            </div>
            {booksBySubjects.map((booksBySubject, index) => (
                <div key={index}>
                    <h3>{booksBySubject?.name}</h3>
                    <div className='main_book'>
                    {booksBySubject?.works?.map((bookInfo, index) => (
                        <div className="book-wrapper" key={index}>
                          {/* <div className="second"> */}
                            <h3>{bookInfo.title}</h3>
                            <div className="image" key={index}>
                                <img src={`http://covers.openlibrary.org/b/id/${bookInfo.cover_id}-M.jpg`} alt="cover_id" />
                            </div>
                          {/* </div> */}
                            <h3>{bookInfo.cover_id}</h3>
                        </div>
                    ))}
                    </div>
                </div>
            ))}
        </>
    );
}

export default Main;