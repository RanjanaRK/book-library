import { createDirectus, rest } from "@directus/sdk";

interface Schema {
  authors: Author[];
  books: Book[];
}

export interface Author {
  id: string;
  name?: string;
  email?: string;
}

export interface Book {
  id: string;
  name: string;
  price: number;
  bookAuther: Author;
}

// Client with REST support
const directusClient = createDirectus<Schema>("http://localhost:8055").with(
  rest()
);

export default directusClient;
