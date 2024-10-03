import React, { useEffect, useState } from "react";
import useAxios, { GET, PATCH, POST } from "@/hooks/useAxios";
import CardContainer from "@/components/CardContainer";
import {
  Anchor,
  Breadcrumbs,
  Button,
  Divider,
  FileInput,
  Grid,
  Group,
  NumberInput,
  Space,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { ADMIN, COLLECTIONS, PRODUCT, PRODUCTS } from "@/pages/routes";
import { IconArrowLeft, IconChevronRight, IconUpload } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../Forms";

export default function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  // custom hooks
  const { call, response } = useAxios(PRODUCT.replace(":id", id), GET);
  const [load, setLoad] = useState(false);
  // fields
  const [fields, setFields] = useState(null);
  // files manipulation
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
    let { collectionId, previewImages, ...rest } = values;
    // uploading images
    let imageURL = fields.imageURL;
    image && (imageURL = await uploadFile(image));
    let imagesURL = [];

    for (let item of previewImages) {
      item.remote && imagesURL.push(item.url);
    }

    for (let tempImage of images) {
      let tempUrl = await uploadFile(tempImage);
      imagesURL.push(tempUrl);
    }
    // body data
    let body = {
      imageURL: imageURL,
      imagesURL: imagesURL,
      collectionId: parseInt(collectionId),
      ...rest,
    };
    // api call
    const res = await call({
      newMethod: PATCH,
      body: body,
      withNotificationOption: true,
    });
    const success = res.data && res.data.success;
    !!success && navigate(ADMIN.replace("/*", PRODUCTS));
    setLoad(false);
  };

  // first render
  useEffect(() => {
    call();
  }, []);

  // retrieve data from response
  useEffect(() => {
    if (response && response.data) {
      let data = response.data;
      let { variants, ...rest } = data;
      // set variants
      setVariants(variants);
      // data
      setFields(rest);
    }
  }, [response]);

  return (
    <div className="w-[100%] px-[30px] pt-20">
      <Breadcrumbs mb={65} separator={<IconChevronRight color="gray" size={16} />} separatorMargin={5}>
        <Text order={5}>Admin</Text>
        <Anchor href={ADMIN.replace("/*", PRODUCTS)} c="gray">
          Products
        </Anchor>
        <Text c="gray">Edit</Text>
      </Breadcrumbs>
      <CardContainer>
        {fields && (
          <ProductForm
            {...fields}
            setImage={setImage}
            setImages={setImages}
            variants={variants}
            setVariants={setVariants}
            update={true}
            submitForm={submitForm}
            load={load}
          />
        )}
      </CardContainer>
    </div>
  );
}
