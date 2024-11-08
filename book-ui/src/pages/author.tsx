import directusClient from "@/utils/directusClient";
import { addAuthorSchema, AddAuthorType } from "@/utils/zodSchema";
import { createItem } from "@directus/sdk";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, Divider, Input } from "@nextui-org/react";
import Head from "next/head";
import { useForm } from "react-hook-form";

const author = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<AddAuthorType>({
    resolver: zodResolver(addAuthorSchema),

    mode: "all",
  });

  const addAuthorFn = async (fData: AddAuthorType) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // console.log(fData);

    const createdAuthor = await directusClient.request(
      createItem("authors", fData)
    );

    console.log("Auther Created Sucssfully!");
    console.log(createdAuthor);

    reset();
  };

  return (
    <>
      <Head>
        <title>Add Author | Book Library</title>
      </Head>

      <form onSubmit={handleSubmit(addAuthorFn)} noValidate>
        <div className="flex justify-center items-center h-screen">
          <Card>
            <CardBody>
              <div className="flex flex-col gap-6 min-w-[360px]">
                <div className="text-center text-3xl font-bold">Add Author</div>

                <Divider />

                <Input
                  isRequired
                  label="Auther Name"
                  color={isValid ? "success" : "primary"}
                  variant="bordered"
                  {...register("name")}
                  errorMessage={errors.name?.message}
                  isInvalid={errors.name?.message ? true : false}
                />

                <Input
                  isRequired
                  label="Auther Email"
                  color={isValid ? "success" : "primary"}
                  variant="bordered"
                  {...register("email")}
                  errorMessage={errors.email?.message}
                  isInvalid={errors.email?.message ? true : false}
                />

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

export default author;
