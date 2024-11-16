import DogCard from "@/components/DogCard";
import prisma from "@/lib/db";
import React from "react";

const page = async () => {
  const Alldogs = await prisma.dogsGenerally.findMany({
    include:{
      favourite:true
    }
  });
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 mt-10 w-full gap-5">
      <DogCard
        dogsGenerallyId={""}
        link="https://i.pinimg.com/474x/74/3f/1c/743f1c688f78bd420865b4dff5be27d8.jpg"
        price="#155000"
      />
      <DogCard
        dogsGenerallyId={""}
        link="https://i.pinimg.com/474x/0b/de/a7/0bdea7660ede8465e33968a0ffbadeac.jpg"
        price="#125000"
      />
      <DogCard
        dogsGenerallyId={""}
        link="https://i.pinimg.com/474x/80/e9/50/80e9506d12fc309067f36c70ca7497f2.jpg"
        price="#150000"
      />
      <DogCard
        dogsGenerallyId={""}
        link="https://i.pinimg.com/474x/91/ec/d6/91ecd6b2927ff22c3ac0e01e7cda682e.jpg"
        price="#133000"
      />
      <DogCard
        dogsGenerallyId={""}
        link="https://i.pinimg.com/474x/64/5e/18/645e1849817deadebe26c529ee72476d.jpg"
        price="#127000"
      />
      <DogCard
        dogsGenerallyId={""}
        link="https://i.pinimg.com/474x/27/0b/74/270b74aee79a47f0e608e8d2107f1f03.jpg"
        price="#108000"
      />
      <DogCard
        dogsGenerallyId={""}
        link="https://i.pinimg.com/474x/ec/fd/ef/ecfdefb70086b58e65f74482dc82087e.jpg"
        price="#159000"
      />
      <DogCard
        dogsGenerallyId={""}
        link="https://i.pinimg.com/474x/45/2a/02/452a02420e4669a356a83fec2bdb68f9.jpg"
        price="#112000"
      />
      <DogCard
        dogsGenerallyId={""}
        link="https://i.pinimg.com/474x/08/6b/c4/086bc4fa096e4b20f50d940bf2896d25.jpg"
        price="#123000"
      />
      <DogCard
        dogsGenerallyId={""}
        link="https://i.pinimg.com/474x/04/91/6c/04916c0a5c43b3df52e0fc83ca87ecb8.jpg"
        price="#156000"
      />
      <DogCard
        dogsGenerallyId={""}
        link="https://i.pinimg.com/474x/09/91/37/099137b2c858b742d8de353ed2a82329.jpg"
        price="#195000"
      />
      <DogCard
        dogsGenerallyId={""}
        link="https://i.pinimg.com/474x/bf/b2/5f/bfb25f8d84f71a576c3f39aa92291fed.jpg"
        price="#145000"
      />
      <DogCard
        dogsGenerallyId={""}
        link="https://i.pinimg.com/474x/8e/1a/8e/8e1a8e5c742a7a13fdef46391d5c7f5a.jpg"
        price="#171000"
      />
      <DogCard
        dogsGenerallyId={""}
        link="https://i.pinimg.com/474x/1c/e8/26/1ce82668be179002dc5a156c09f6e4e2.jpg"
        price="#131000"
      />
      <DogCard
        dogsGenerallyId={""}
        link="https://i.pinimg.com/474x/bf/e4/98/bfe498e2f7980346b537137315fbc25b.jpg"
        price="#156000"
      />
      <DogCard
        dogsGenerallyId={""}
        link="https://i.pinimg.com/474x/4a/f5/92/4af5922553e2ccb5f9a2aba15ee998e1.jpg"
        price="#135000"
      />
      <DogCard
        dogsGenerallyId={""}
        link="https://i.pinimg.com/474x/c5/34/09/c534095520b7c0bd2e24a30402713224.jpg"
        price="#181000"
      />
      {Alldogs.map((eachDogs, index) => {
        return (
          <DogCard
            key={index}
            dogsGenerallyId={eachDogs?.id as string}
            link={eachDogs?.image as string}
            price={`#${eachDogs?.price}`}
            fav={eachDogs.favourite.map((favy)=>{return favy})}
          />
        );
      })}
    </div>
  );
};

export default page;
