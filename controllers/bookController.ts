import { Book } from "../interface/book.ts";
import { client } from "../databases.ts";

// index
const getAllBook = async ({ response }: { response: any }) => {
  const books: Book[] = await client.query("SELECT * FROM books");

  response.body = {
    success: true,
    data: books,
  };
};

// show
const getOneBook = async ({
  params,
  response,
}: {
  params: any;
  response: any;
}) => {
  let Book: Book = await client.query("SELECT * FROM books WHERE id = ?", [
    params.id,
  ]);

  response.body = {
    success: true,
    data: Book,
  };
};

// create
const postOneBook = async ({
  params,
  request,
  response,
}: {
  params: any;
  request: any;
  response: any;
}) => {
  const result = await request.body();
  const dataBook: Book = result.value;

  await client.query(
    "INSERT INTO books(title, price, description) values(?,?,?)",
    [dataBook.title, dataBook.price, dataBook.description]
  );

  response.body = {
    success: true,
    data: null,
  };
};

// update
const putOneBook = async ({
  params,
  request,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  const result = await request.body();
  const book: Book = result.value;

  await client.query(
    "UPDATE books SET title = ?, description = ?, price = ? where id = ?",
    [book.title, book.description, book.price, params.id]
  );

  response.body = {
    success: true,
    data: null,
  };
};

// delete
const deleteOneBook = async ({
  params,
  response,
}: {
  params: any;
  response: any;
}) => {
  await client.execute("DELETE FROM books WHERE id = ?", [params.id]);

  response.body = {
    success: true,
    data: null,
  };
};

export { getAllBook, getOneBook, postOneBook, putOneBook, deleteOneBook };
