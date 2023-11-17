import { FixedSizeList, ListChildComponentProps } from "react-window";
import { Book } from ".";

const renderBookRow = ({
  index,
  style,
  data,
}: ListChildComponentProps<Book[]>) => {
  const className = `flex justify-start items-center px-4 ${
    index % 2 === 0 ? "bg-gray-50" : "bg-white"
    /* 
    Please toggle row background color so that even row
    has background color "bg-gray-50", and odd row has "bg-white"
    */
    // ==> ? is Conditional Operator :
    // If the condition index % 2 === 0 is true, the value before the : is used ("bg-gray-50").
    // If the condition is false, the value after the : is used ("bg-white").
  }`;

  const book = data[index];
  window.console.log(`Book ${index}`, book);
  // To get the book's cover image please use the "cover_i" value
  // `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
  return (
    <div className={className} style={style}>
      {/* Display book's cover image and title */}
      <img
        src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
        // alt={`Cover of ${book.title}`}
        // className="mr-1" // Add styling as needed
        width="50" // Add styling as needed
      />
      <span>{book.title}</span>
    </div>
  );
};

interface BookListProps {
  books: Book[];
}

const BookList = ({ books }: BookListProps) => (
  <FixedSizeList
    className="border border-slate-300"
    height={250}
    itemCount={books.length}
    itemSize={35}
    width={300}
    itemData={books}
  >
    {/* 
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore */}
    {renderBookRow}
  </FixedSizeList>
);

// const BookList = (books: Book[]) => (
//   <FixedSizeList
//     className="border border-slate-300"
//     height={250}
//     itemCount={books.length}
//     itemSize={35}
//     width={300}
//     itemData={books}
//   >
//     {/*
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-ignore */}
//     {renderBookRow}
//   </FixedSizeList>
// );

export { BookList };
