import BookSkeleton from "@/components/BookSkeleton";
import CardBook from "@/components/CardBook";
import directusClient from "@/utils/directusClient";
import { readItems } from "@directus/sdk";
import { useQuery } from "@tanstack/react-query";

const index = () => {
  const { data, isLoading, isFetching, isFetched, isSuccess } = useQuery({
    queryKey: ["getBook"],

    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 2000));

      const allBooks = await directusClient.request(
        readItems("books", {
          fields: ["*", { bookAuther: ["*"] }],
        })
      );

      return allBooks;
    },
    refetchOnWindowFocus: false,
  });

  if (isFetching || isLoading) {
    return (
      <>
        <div className="container mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-3 gap-8 my-8">
          <BookSkeleton />
          <BookSkeleton />
          <BookSkeleton />
        </div>
      </>
    );
  }

  if (isFetched && isSuccess) {
    return (
      <>
        <div className="container mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-3 gap-8 my-8">
          {data.map((item) => {
            return <CardBook key={item.id} info={item} />;
          })}
        </div>
      </>
    );
  }
};

export default index;
