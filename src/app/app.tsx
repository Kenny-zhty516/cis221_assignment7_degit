import { Book, BookList } from "components/organisms/book-list";
import { ChangeEvent, MouseEvent, useState } from "react";
import { useFetch } from "hooks/use-fetch";

interface SearchResponse {
  numFound: number;
  docs: Book[];
}

function App() {
  const [bookName, setBookName] = useState("");
  // const [books, setBooks] = useState<Book[]>([]); // New state for storing books
  // const [loading, setLoading] = useState(false);
  // const [hasResult, setHasResult] = useState(false);1

  const [fetchUri, setFetchUri] = useState("");

  const { loading, books, hasData, booksCount } =
    useFetch<SearchResponse>(fetchUri);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBookName(e.target.value);
  };
  const handleClick = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    // setHasResult(false);
    // setLoading(true);
    // const response = await fetch(
    //   "https://openlibrary.org/search.json?q=Learning React"
    // );
    // const data = await response.json();

    // // Ensure data.docs is defined before updating state
    // // setBooks(data.docs || []);
    // setBooks(data.docs);
    // // setHasResult(!!data.docs);

    // window.console.log(data);
    // setLoading(false);
    // setHasResult(true);
    // setBooksCount(data.numFound);

    setFetchUri(`https://openlibrary.org/search.json?q=${bookName}`);
  };
  return (
    <div
      className="flex min-h-[60vh] flex-col items-center justify-start gap-4
  mt-20 text-center"
    >
      {" "}
      <div>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Book Name"
          required
          value={bookName}
          onChange={handleInputChange}
        />{" "}
      </div>
      <button
        type="button"
        onClick={handleClick}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Search Books
      </button>
      {loading ? <div>Loading ...</div> : ""}
      {hasData ? <div>Found {booksCount} books</div> : ""}
      {/* Display the BookList component with the fetched books */}
      {<BookList books={books} />}
    </div>
  );
}
export default App;
