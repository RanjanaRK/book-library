import BookForm from "@/components/BookForm";
import directusClient from "@/utils/directusClient";
import { readItems } from "@directus/sdk";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";

const book = () => {
  const { data, isLoading, isFetching, isFetched, isSuccess } = useQuery({
    queryKey: ["getAuthor"],

    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 2000));

      const allAuthors = await directusClient.request(readItems("authors"));

      return allAuthors;
    },
  });

  if (isLoading || isFetching) {
    return (
      <>
        <div className="">Loadding....</div>
      </>
    );
  }

  if (isFetched && isSuccess) {
    return (
      <>
        <Head>
          <title>Add Book | Book Library</title>
        </Head>

        <BookForm list={data} />
      </>
    );
  }
};

export default book;
