import React, { useState } from "react";
import useAxios, { POST } from "@/hooks/useAxios";
import CardContainer from "@/components/CardContainer";
import {
  Anchor,
  Breadcrumbs,
  Divider,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { ADMIN, PRODUCTS } from "@/pages/routes";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase";
import { useNavigate } from "react-router-dom";
import ProductForm from "../Forms";
import { IconChevronRight } from "@tabler/icons-react";

export default function AddProduct() {
  const navigate = useNavigate();
  // custom hooks
  const { call } = useAxios(PRODUCTS, POST, { withNotification: true });
  const [load, setLoad] = useState(false);
  // files
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  // product variants
  const [variants, setVariants] = useState([]);

  const uploadFile = async (image) => {
    if (!image) return;
    // creating referance in remote storgae
    const imageRef = ref(storage, `products/${image.name}`);
    await uploadBytes(imageRef, image);
    const url = await getDownloadURL(imageRef);
    return url;
  };

  const submitForm = async (values) => {
    setLoad(true);
    // uploading images
    let imageURL = await uploadFile(image);
    let imagesURL = [];
    for (let tempImage of images) {
      let tempUrl = await uploadFile(tempImage);
      imagesURL.push(tempUrl);
    }
    // body data
    let { collectionId, ...rest } = values;
    let body = {
      imageURL: imageURL,
      imagesURL: imagesURL,
      variants: variants,
      collectionId: parseInt(collectionId),
      ...rest,
    };
    // api call
    const res = await call({ body: body });
    const success = res && res.data && res.data.success;
    !!success && navigate(ADMIN.replace("/*", PRODUCTS));
    setLoad(false);
  };

  return (
    <div className="w-[100%] px-[30px] pt-20">
      <Breadcrumbs mb={65} separator={<IconChevronRight color="gray" size={16} />} separatorMargin={5}>
        <Text order={5}>Admin</Text>
        <Anchor href={ADMIN.replace("/*", PRODUCTS)} c="gray">
          Products
        </Anchor>
        <Text c="gray">Add</Text>
      </Breadcrumbs>
      <CardContainer>
        <ProductForm
          setImage={setImage}
          setImages={setImages}
          variants={variants}
          setVariants={setVariants}
          submitForm={submitForm}
          load={load}
        />
      </CardContainer>
    </div>
  );
}
