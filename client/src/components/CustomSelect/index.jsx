import React, { useEffect, useState } from 'react'
import useAxios, { GET } from '../../hooks/useAxios'
import { Select } from '@mantine/core';

export default function CustomSelect({ url, placeholder, label, formInput, initialData }) {
    const { response, call } = useAxios(url,  GET);
    const [data, setData] = useState([]);
    
    // api call
    useEffect(() => {
        call();
    },[])

    // retrieving data 
    useEffect(() => {
      if(response){
        let data = response.data?.rows.map((item) => { 
          return { 
            value: `${item.id}`, 
            label: item.name 
          } 
        });
        setData(data);
      }
    },[response])

  return (
    <Select
      label={label}
      placeholder={placeholder}
      data={data}
      defaultSearchValue={initialData}
      searchable
      clearable
      {...formInput}
    />
  )
}
