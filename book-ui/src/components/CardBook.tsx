import directusClient, { Book } from "@/utils/directusClient";
import { deleteItem } from "@directus/sdk";
import { Button, Card, CardBody } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export type InfoPropsType = {
  info: Book;
};

const CardBook = ({ info }: InfoPropsType) => {
  // console.log(info);

  const queryClient = useQueryClient();

  const router = useRouter();

  const deleteItems = async () => {
    await directusClient.request(deleteItem("books", info.id));

    toast("has been deleted");

    queryClient.invalidateQueries({ queryKey: ["getBook"] });
  };

  return (
    <>
      <Card>
        <CardBody className="flex flex-col justify-between ">
          <div className=" text-xl mb-4 ">
            <div className="">
              <span className="font-bold">Book Name:</span> {info.name}
            </div>

            <div className="">
              <span className="font-bold">Price:</span> {info.price}
            </div>

            <div className="">
              <span className="font-bold">Author:</span> {info.bookAuther.name}
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <div className="">
              <Button onPress={() => router.push(`/edit/${info.id}`)}>
                update
              </Button>
            </div>
            <div className="flex justify-end">
              <Button onPress={deleteItems}>delete</Button>
            </div>
          </div>
        </CardBody>
      </Card>
      <Toaster />
    </>
  );
};

export default CardBook;
