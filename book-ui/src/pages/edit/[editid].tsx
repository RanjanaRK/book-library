import directusClient from "@/utils/directusClient";
import { editBookSchema, EditBookType } from "@/utils/zodSchema";
import { readItem, updateItem, updateItems } from "@directus/sdk";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, Divider, Input } from "@nextui-org/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const editid = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const queryId = router.query.editid as string;

  const { data } = useQuery({
    queryKey: ["getbook"],
    queryFn: async () => {
      // await new Promise((r) => setTimeout(r, 500));

      const allBook = await directusClient.request(readItem("books", queryId));

      return allBook;
    },
  });
  console.log(data);

  const { register, handleSubmit } = useForm<EditBookType>({
    resolver: zodResolver(editBookSchema),
  });

  const editHandleData = async (fdata: EditBookType) => {
    await directusClient.request(
      updateItem("books", queryId, { name: fdata.name, price: fdata.price })
    );

    // console.log(updateBook, "update success");

    toast("has been updated");

    router.push("/");
    queryClient.invalidateQueries();
  };

  return (
    <>
      <div className="">
        <form onSubmit={handleSubmit(editHandleData)}>
          <div className="flex justify-center items-center h-screen">
            <Card>
              <CardBody>
                <div className="flex flex-col gap-6 min-w-[360px]">
                  <div className="text-center text-3xl font-bold">
                    Update Book
                  </div>

                  <Divider />

                  <Input
                    label="Book Name"
                    {...register("name")}
                    defaultValue={data?.name}
                  />
                  <Input
                    label="Price"
                    {...register("price")}
                    // defaultValue={data?.price}
                  />

                  {/* <div className="">{data?.name}</div> */}
                  <Divider />

                  <Button
                    type="submit"
                    size="lg"
                    color="primary"
                    variant="shadow"
                  >
                    submit
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </form>
      </div>
      <Toaster />
    </>
  );
};

export default editid;
