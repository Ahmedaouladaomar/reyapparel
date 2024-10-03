import { IconCamera } from '@tabler/icons-react';
import React, { useRef } from 'react';
import classes from './styles.module.css'
import { Button } from '@mantine/core';

export default function CustomFileInput({ className, refVal, onChange }) {
  
  const handleClick = () => {
    refVal?.current?.click();
  }

  return (
    <div className="custom-file-upload">
      <Button color='dark' leftSection={<IconCamera />} onClick={handleClick}>
        upload image
      </Button>
      <input
        className='hidden'
        type='file'
        ref={refVal}
        onChange={(e) => onChange(e.target.files[0])}
      />
    </div>
  )
}
