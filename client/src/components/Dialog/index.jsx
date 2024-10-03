import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Space, Divider, Flex, Box } from "@mantine/core";

export default function Dialog({
  title,
  content,
  onClick,
  confirmAction,
  size,
  color,
  variant,
  label,
  trigger,
  withCloseButton,
  fullScreen,
  mx,
  px,
  py,
  fw,
  width,
  loading,
  disabled,
}) {
  // drawer hook
  const [opened, { open, close }] = useDisclosure(false);

  const onConfirm = async () => {
    await confirmAction();
    // closing dialog
    close();
  };

  return (
    <Box w={width}>
      <Modal
        opened={opened}
        onClose={close}
        fullScreen={fullScreen || false}
        withCloseButton={withCloseButton || false}
        title={title}
        centered
      >
        <Modal.Body>{content}</Modal.Body>
        {confirmAction && (
          <>
            <Space h="md" />
            <Divider />
            <Space h="md" />
            <Flex justify="space-between">
              <Button onClick={onConfirm}>Confirm</Button>
              <Button color="red" onClick={close}>
                Cancel
              </Button>
            </Flex>
          </>
        )}
      </Modal>

      <Button
        children={label}
        w="100%"
        mx={mx}
        px={px}
        py={py}
        fw={fw || "normal"}
        size={size}
        color={color}
        variant={variant}
        onClick={onClick || open}
        loading={loading}
        disabled={disabled}
      />
    </Box>
  );
}
