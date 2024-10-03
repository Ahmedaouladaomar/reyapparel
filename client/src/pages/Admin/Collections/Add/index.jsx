import React, { useState } from 'react';
import useAxios, { POST } from '@/hooks/useAxios';
import CardContainer from '@/components/CardContainer';
import { Anchor, Breadcrumbs, Text } from '@mantine/core';
import { ADMIN, COLLECTIONS } from '@/pages/routes';
import { useForm } from '@mantine/form';


import {
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";
import { storage } from '@/firebase';
import { useNavigate } from 'react-router-dom';
import { isName, isDescription, isImage } from '@/helpers/validators';
import CollectionForm from '../Forms';
import { IconChevronRight } from '@tabler/icons-react';

export default function AddCollection() {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      image: null
    },
    validate: { 
      name: isName, 
      description: isDescription,
      image: isImage 
    },
  });

  const { call } = useAxios(COLLECTIONS, POST, { withNotification: true });
  const [image, setImage] = useState(null);
  const [load, setLoad] = useState(false);

  const uploadFile = async (image) => {
    if (!image) return;

    // creating referance in remote storgae
    const imageRef = ref(storage, `collections/${image.name}`);
    // uploading image
    await uploadBytes(imageRef, image);
    // retrieving image url to store it in db
    const url = await getDownloadURL(imageRef);
    // image URL
    return url;
  };

  const submitForm = async (values) => {
    setLoad(true);
    // upload image
    const url = await uploadFile(image);
    // api call
    let body = { imageURL: url, ...values };
    const res = await call({ body: body });
    const success = res && (res.data && res.data.success);
    !!success && navigate(ADMIN.replace('/*', COLLECTIONS)); 
    setLoad(false);
  }


  return (
    <div className='w-[100%] px-[30px] pt-20'>
        <Breadcrumbs mb={65} separator={<IconChevronRight color="gray" size={16} />} separatorMargin={5}>
            <Text order={5}>Admin</Text>
            <Anchor href={ADMIN.replace('/*', COLLECTIONS)} c='gray'>Collections</Anchor>
            <Text c='gray'>Add</Text>
        </Breadcrumbs>
        <CardContainer>
          <CollectionForm
            setImage={setImage}
            submitForm={submitForm}
            load={load}
          />
        </CardContainer>
    </div>
  )
}
