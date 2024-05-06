// import React, { useEffect, useState } from 'react';
// import './style.css'

// function Main() {
//     const [booksBySubjects, setBooksBySubjects] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('')

//     useEffect(() => {
//         const fetchBooks = async () => {
        
//                 const urls = [
//                     "https://openlibrary.org/subjects/thriller.json?details=true",
//                     "https://openlibrary.org/subjects/love.json?details=true",
//                     "https://openlibrary.org/subjects/kids.json?details=true",
//                     "https://openlibrary.org/subjects/romance.json?details=true",
// ];
//                 const responses = await Promise.all(urls.map(url => fetch(url)));
//                 const results = await Promise.all(responses.map(response => response.json()));

//                 setBooksBySubjects(results);   
//         };

//         fetchBooks();
//     }, []);
//     const handleSearch = async () => {
//         // https://openlibrary.org/search.json?q=the+lord+of+the+rings
//             const response = await fetch(`https://openlibrary.org/search.json?q=${searchTerm}`);
//             const searchData = await response.json();
//             setBooksBySubjects([searchData])
//     };
//     return (
//         <>
//        <div className='search_bar'>
//                 <input type="text" placeholder='search by book name' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
//                 <button onClick={handleSearch}>Search</button>
//             </div>
//             {booksBySubjects.map((booksBySubject, index) => (
//                 <div key={index}>
//                     <h3>{booksBySubject?.name}</h3>
//                     <div className='main_book'>
//                     {booksBySubject?.works?.map((bookInfo, index) => (
//                         <div className="book-wrapper" key={index}>
//                           {/* <div className="second"> */}
//                             <h3>{bookInfo.title}</h3>
//                             <div className="image" key={index}>
//                                 <img src={`http://covers.openlibrary.org/b/id/${bookInfo.cover_id}-M.jpg`} alt="cover_id" />
//                             </div>
//                           {/* </div> */}
//                             <h3>{bookInfo.cover_id}</h3>
//                         </div>
//                     ))}
//                     </div>
//                 </div>
//             ))}
//         </>
//     );
// }

// export default Main;

import React, { useEffect, useState } from 'react';
import './style.css';

function Main() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [booksBySubjects, setBooksBySubjects] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                if (searchTerm.trim() === '') {
                    setSearchResults([]);
                } else {
                    // Construct the search URL with the title query parameter
                    const searchUrl = `https://openlibrary.org/search.json?title=${encodeURIComponent(searchTerm)}`;

                    // Fetch data from the search URL
                    const response = await fetch(searchUrl);
                    const result = await response.json();

                    // Update the search results state with the fetched data
                    setSearchResults(result.docs);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchBooks();
    }, [searchTerm]);

    useEffect(() => {
        const fetchBooksBySubjects = async () => {
            try {
                const urls = [
                    "https://openlibrary.org/subjects/thriller.json?details=true",
                    "https://openlibrary.org/subjects/love.json?details=true",
                    "https://openlibrary.org/subjects/kids.json?details=true",
                    "https://openlibrary.org/subjects/romance.json?details=true",
                ];

                const responses = await Promise.all(urls.map(url => fetch(url)));
                const results = await Promise.all(responses.map(response => response.json()));

                setBooksBySubjects(results);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchBooksBySubjects();
    }, []);

    // Function to handle search input change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by book title"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            {searchResults.map((book, index) => (
                <div className="book-wrapper" key={index}>
                    <h3>{book.title}</h3>
                    <p>Author(s): {book.author_name ? book.author_name.join(', ') : 'Unknown'}</p>
                    <div className="image">
                        {book.cover_i && <img src={`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt={book.title} />}
                    </div>
                </div>
            ))}
            {/* Display books by subjects */}
            {booksBySubjects.map((subject, index) => (
                <div key={index}>
                    <h3>{subject.name}</h3>
                    {subject.works.map((bookInfo, index) => (
                        <div className="book-wrapper" key={index}>
                            <h3>{bookInfo.title}</h3>
                            <div className="image">
                                {bookInfo.cover_id && <img src={`http://covers.openlibrary.org/b/id/${bookInfo.cover_id}-M.jpg`} alt={bookInfo.title} />}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
}

export default Main;