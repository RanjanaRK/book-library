import { Card, CardBody, Skeleton } from "@nextui-org/react";

const BookSkeleton = () => {
  return (
    <>
      <Card>
        <CardBody>
          <div className="grid grid-cols-3 gap-2 text-xl">
            <div className="text-end">Book Name:</div>
            <Skeleton className="col-span-2">
              <div className="font-bold">next</div>
            </Skeleton>
            <div className="text-end">Price:</div>
            <Skeleton className="col-span-2">
              <div className="font-bold">5000</div>
            </Skeleton>
            <div className="text-end">Author:</div>
            <Skeleton className="col-span-2">
              <div className="font-bold">saikat sir</div>
            </Skeleton>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default BookSkeleton;
