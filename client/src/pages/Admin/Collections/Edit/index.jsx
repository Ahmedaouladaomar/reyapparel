import React, { useEffect, useState, useContext } from 'react';
import useAxios, { GET, PATCH, POST } from '@/hooks/useAxios';
import CardContainer from '@/components/CardContainer';
import PaginatedTable from '@/components/PaginatedTable';
import { Anchor, Breadcrumbs, Button, Divider, FileInput, Grid, Group, Input, Space, Text, TextInput, Title, rem } from '@mantine/core';
import { ADMIN, COLLECTION, COLLECTIONS } from '@/pages/routes';
import { IconArrowBack, IconArrowLeft, IconChevronRight, IconUpload } from '@tabler/icons-react';
import { useForm } from '@mantine/form';


import {
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";
import { storage } from '@/firebase';
import { useNavigate, useParams } from 'react-router-dom';
import CollectionForm from '../Forms';

export default function EditCollection() {
  const navigate = useNavigate();
  const { id } = useParams();
  // custom hooks
  const { call, response } = useAxios(COLLECTION.replace(':id', id), GET);
  const [data, setData] = useState(null)
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
    const res = await call({ 
        newMethod: PATCH, 
        body: body,
        withNotificationOption: true
    });
    const success = res && (res.data && res.data.success);
    !!success && navigate(ADMIN.replace('/*', COLLECTIONS)); 
    setLoad(false);
  }

  // first render
  useEffect(() => {
    call();
  }, [])

  // retrieve data from response
  useEffect(() => {
    response && setData(response.data);
  }, [response])

  return (
    <div className='w-[100%] px-[30px] pt-20'>
        <Breadcrumbs mb={65} separator={<IconChevronRight color="gray" size={16} />} separatorMargin={5}>
            <Text order={5}>Admin</Text>
            <Anchor href={ADMIN.replace('/*', COLLECTIONS)} c='gray'>Collections</Anchor>
            <Text c='gray'>Add</Text>
        </Breadcrumbs>
        <CardContainer>
          {data &&
          <CollectionForm
            {...data}
            setImage={setImage}
            submitForm={submitForm}
            load={load}
          />}
        </CardContainer>
    </div>
  )
}
