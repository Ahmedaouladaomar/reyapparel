import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  FileInput,
  Flex,
  Grid,
  Group,
  NumberInput,
  Pill,
  Space,
  Text,
  TextInput,
} from "@mantine/core";
import {
  isCollection,
  isDescription,
  isName,
  isPrice,
} from "@/helpers/validators";
import CustomSelect from "@/components/CustomSelect";
import { useForm } from "@mantine/form";
import { ADMIN, COLLECTIONS, PRODUCTS } from "@/pages/routes";
import { IconArrowLeft, IconCamera } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import ImageWithClose from "@/components/ImageWithClose";
import SizeForm from "@/components/SizeForm";

const imagesURLFormatter = (imagesURL) => {
  if (!imagesURL || !imagesURL.length) return;
  // formatted array
  return imagesURL.map((url) => {
    return {
      url: url,
      file: null,
      remote: true,
    };
  });
};

export default function ProductForm({
  id,
  name,
  description,
  price,
  collection,
  imageURL,
  imagesURL,
  variants,
  setVariants,
  setImage,
  setImages,
  submitForm,
  load,
}) {
  // navigation
  const navigate = useNavigate();
  // form initial values
  const initialValues = {
    initialValues: {
      name: name || "",
      description: description || "",
      collectionId: collection?.id || "",
      price: price || 0,
    },

    validate: {
      name: isName,
      description: isDescription,
      price: isPrice,
      collectionId: isCollection,
    },
  };
  // form hook
  const form = useForm(initialValues);
  // files object
  const [imagesUpload, setImagesUpload] = useState([]);
  // file URL
  const [previewImage, setPreviewImage] = useState(imageURL || null);
  const [previewImages, setPreviewImages] = useState(
    imagesURLFormatter(imagesURL) || []
  );
  // local file manipulation
  const getLocalFileURL = (file) => URL.createObjectURL(file);

  const isImagesLimit = () => {
    return previewImages.length < 6;
  };

  const removeImage = (file) => {
    let newImages = [];
    for (let f of imagesUpload) {
      if (file == f) continue;
      newImages.push(f);
    }
    setImagesUpload(newImages);
  };

  const removePreviewImage = (value, index) => {
    let newImagesURL = [],
      i = 0;
    for (let element of previewImages) {
      if (i == index) {
        i++;
        continue;
      }
      newImagesURL.push(element);
      i++;
    }
    setPreviewImages(newImagesURL);
    value.file && removeImage(value.file);
  };

  return (
    <>
      <form
        className="text-zinc-500"
        onSubmit={form.onSubmit((values) => {
          // submit
          submitForm({ previewImages, ...values });
        })}
      >
        <Grid>
          <Grid.Col span={3}>
            <TextInput
              placeholder="Name"
              label="Name"
              {...form.getInputProps("name")}
            />
          </Grid.Col>
          <Grid.Col span={3}>
            <TextInput
              placeholder="Description"
              label="Description"
              {...form.getInputProps("description")}
            />
          </Grid.Col>
          <Grid.Col span={3}>
            <CustomSelect
              url={COLLECTIONS}
              label="Collection"
              placeholder="Select"
              initialData={collection?.name}
              formInput={form.getInputProps("collectionId")}
            />
          </Grid.Col>
          <Grid.Col span={3}>
            <NumberInput
              placeholder="Price"
              label="Price"
              {...form.getInputProps("price")}
            />
          </Grid.Col>
        </Grid>

        <Divider label="Media" mt={20} mb={20} />

        <Group className="flex">
          {previewImage ? (
            <div className="flex-1 flex-col items-center gap-2 py-2 bg-zinc-100">
              <ImageWithClose
                height={100}
                width="fit-content"
                src={previewImage}
                onClose={() => {
                  setPreviewImage(null);
                  setImage(null);
                }}
              />
              <Flex w="100%">
                <Text mx="auto" size="sm">
                  Uploaded file
                </Text>
              </Flex>
            </div>
          ) : (
            <FileInput
              className="flex-1"
              placeholder="upload file"
              label="Insert main image"
              w={100}
              mx="auto"
              clearable
              onChange={(file) => {
                if (!file) return;
                setPreviewImage(getLocalFileURL(file));
                setImage(file);
              }}
              leftSection={<IconCamera stroke={1.5} />}
            />
          )}

          <Divider orientation="vertical" />

          {previewImages && previewImages.length && (
            <div className="flex-1 flex-col gap-2 items-center py-2 bg-zinc-100">
              <div className="flex justify-center gap-[20px] m-auto">
                {previewImages.map((value, index) => (
                  <div key={index}>
                    <ImageWithClose
                      height={50}
                      width="fit-content"
                      src={value.url}
                      onClose={() => {
                        removePreviewImage(value, index);
                      }}
                    />
                  </div>
                ))}
              </div>
              <Flex w="100%">
                <Text mx="auto" size="sm">
                  Uploaded files
                </Text>
              </Flex>
            </div>
          )}
          {isImagesLimit() && (
            <FileInput
              className="flex-1"
              placeholder="upload file"
              label="Insert main image"
              w={100}
              mx="auto"
              clearable
              leftSection={<IconCamera stroke={1.5} />}
              onChange={(file) => {
                if (!file) return;
                setPreviewImages([
                  ...previewImages,
                  {
                    url: getLocalFileURL(file),
                    file: file,
                    remote: false,
                  },
                ]);
                setImagesUpload([...imagesUpload, file]);
                setImages([...imagesUpload, file]);
              }}
            />
          )}
        </Group>

        <Space h="md" />

        <Flex direction="column">
          {variants && !!variants.length && (
            <Flex direction="column" gap={10}>
              <Text>Size variants</Text>
              <Pill.Group>
                {variants.map((variant, index) => (
                  <Pill key={index}>
                    <Flex gap={5}>
                      <Text c="gray" fw={300}>
                        {variant.inStock}
                      </Text>
                      <Text c="gray" fw={500}>
                        {variant.value}
                      </Text>
                    </Flex>
                  </Pill>
                ))}
              </Pill.Group>
            </Flex>
          )}
          {!id && (
            <Box my={15}>
              <SizeForm setVariants={setVariants} />
            </Box>
          )}
        </Flex>

        <Space h="md" />

        <Group justify="space-between" mt="md">
          <Button
            variant="outline"
            onClick={() => navigate(ADMIN.replace("/*", PRODUCTS))}
          >
            <IconArrowLeft />
          </Button>
          <Flex gap={10}>
            <Button disabled={load} variant="light" type="reset">
              Reset
            </Button>
            <Button loading={load} type="submit">
              Save
            </Button>
          </Flex>
        </Group>
      </form>
    </>
  );
}
