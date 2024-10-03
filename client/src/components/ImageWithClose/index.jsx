import { CloseButton, Image } from '@mantine/core'
import React from 'react'

export default function ImageWithClose({ src, height, width, onClose }) {

  return (
    <div className='relative w-fit h-fit py-[30px] m-auto'>
      <CloseButton size="xs" className='border border-solid border-gray rounded-2xl' c='gray' pos='absolute' right={0} top={0} onClick={onClose}/>
      <Image
        h={height}
        w={width}
        fit='contain'
        mx='auto'
        radius='sm'
        src={src} 
      />
    </div>  
  )
}
