import directusClient from "@/utils/directusClient";
import { AuthorList } from "@/utils/types";
import { addBookSchema, AddBookType } from "@/utils/zodSchema";
import { createItem } from "@directus/sdk";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CardBody,
  Divider,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

type ListPropsType = {
  list: AuthorList;
};

const BookForm = ({ list }: ListPropsType) => {
  const { push } = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<AddBookType>({
    resolver: zodResolver(addBookSchema),

    mode: "all",
  });

  const addBookFn = async (fData: AddBookType) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log(fData);

    const createdBook = await directusClient.request(
      createItem("books", {
        name: fData.name,
        price: parseInt(fData.price),
        bookAuther: {
          id: fData.bookAuther,
        },
      })
    );

    console.log("Book Created Sucssfully!");

    console.log(createdBook);

    reset();

    push("/");
  };

  return (
    <>
      <form onSubmit={handleSubmit(addBookFn)} noValidate>
        <div className="flex justify-center items-center h-screen">
          <Card>
            <CardBody>
              <div className="flex flex-col gap-6 min-w-[360px]">
                <div className="text-center text-3xl font-bold">Add Book</div>

                <Divider />

                <Input
                  isRequired
                  label="Book Name"
                  color={isValid ? "success" : "primary"}
                  variant="bordered"
                  {...register("name")}
                  errorMessage={errors.name?.message}
                  isInvalid={errors.name?.message ? true : false}
                />

                <Input
                  isRequired
                  label="Book Price"
                  type="number"
                  color={isValid ? "success" : "primary"}
                  variant="bordered"
                  {...register("price")}
                  errorMessage={errors.price?.message}
                  isInvalid={errors.price?.message ? true : false}
                />

                <Select
                  isRequired
                  label="Book Author"
                  color={isValid ? "success" : "primary"}
                  variant="bordered"
                  {...register("bookAuther")}
                  errorMessage={errors.bookAuther?.message}
                  isInvalid={errors.bookAuther?.message ? true : false}
                >
                  {list.map((item) => {
                    return <SelectItem key={item.id}>{item.name}</SelectItem>;
                  })}
                </Select>

                <Divider />

                <Button
                  isDisabled={isSubmitting}
                  isLoading={isSubmitting}
                  type="submit"
                  size="lg"
                  color="primary"
                  variant="shadow"
                >
                  {isSubmitting ? "" : "Submit"}
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </form>
    </>
  );
};

export default BookForm;
