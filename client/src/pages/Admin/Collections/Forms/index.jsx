import React, { useState } from 'react';
import { Button, Divider, FileInput, Flex, Grid, Group, TextInput } from '@mantine/core';
import { ADMIN, COLLECTIONS } from '@/pages/routes';
import { IconArrowLeft, IconCamera } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { isName, isDescription } from '@/helpers/validators';
import ImageWithClose from '@/components/ImageWithClose';

export default function CollectionForm({ 
    name, 
    description, 
    imageURL, 
    setImage, 
    submitForm, 
    load 
}) {
    // navigation
    const navigate = useNavigate();

    const initialValues = {
        initialValues: {
            name: name || '',
            description: description || ''
        },

        validate: {
            name: isName,
            description: isDescription,
        },
    };

  // form hook
  const form = useForm(initialValues);
  // file URL
  const [previewImage, setPreviewImage] = useState(imageURL || null);
  // local file manipulation
  const getLocalFileURL = (file) => URL.createObjectURL(file);

  console.log(name, description)

  return (
    <>
        <form className='text-zinc-500' onSubmit={form.onSubmit((values) => submitForm(values))}>
            <Grid>
                <Grid.Col span={6}>
                <TextInput 
                    placeholder='Name'
                    label='Name'
                    {...form.getInputProps('name')}
                />
                </Grid.Col>
                <Grid.Col span={6}>
                <TextInput 
                    placeholder='Description'
                    label='Description'
                    {...form.getInputProps('description')}
                />
                </Grid.Col>
            </Grid>

            <Divider label="Media" mt={20} mb={20} />
          
            <Group className='flex'>
                {previewImage
                ?
                <div className='flex-1'>
                <ImageWithClose
                    height={100}
                    width='fit-content'
                    src={previewImage}
                    onClose={() => {
                        setPreviewImage(null);
                        setImage(null);
                    }}
                />
                </div>
                :
                <FileInput
                className='flex-1'
                placeholder='upload file'
                label='Insert main image'
                w={200}
                mx='auto'
                clearable
                onChange={(file) => {
                    if(!file) return;
                    setPreviewImage(getLocalFileURL(file));
                    setImage(file);
                }}
                leftSection={<IconCamera stroke={1.5} />}
                />}
            </Group>

            <Group justify="space-between" mt="md">
                <Button variant='outline' onClick={() => navigate(ADMIN.replace('/*', COLLECTIONS))}>
                    <IconArrowLeft />
                </Button>
                <Flex gap={10}>
                    <Button disabled={load} variant='light' type='reset'>Reset</Button>
                    <Button loading={load} type='submit'>Save</Button>
                </Flex>
            </Group>
        </form>
    </>
  )
}
