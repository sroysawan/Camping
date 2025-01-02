import {  editLandmarkAction, fetchLandmarkById } from '@/actions/action'
import MapLandmarkClient  from '@/components/camp/MapLandmarkClient'
import { SubmitButton } from '@/components/form/Buttons'
import CategoryInput from '@/components/form/CategoryInput'
import FormContainer from '@/components/form/FormContainer'
import FormInput from '@/components/form/FormInput'
import ImageInput from '@/components/form/ImageInput'
import ProvinceInput from '@/components/form/ProvinceInput'
import TextAreaInput from '@/components/form/TextAreaInput'
import MapLandmark from '@/components/map/MapLandmark'

import { redirect } from 'next/navigation'
import React from 'react'

const EditCamp = async({ params }: { params: { id: string } }) => {
     const { id } = await params
     const landmark = await fetchLandmarkById({ id });
       // ตรวจสอบว่าข้อมูล profile มีหรือไม่ และ id ตรงกันหรือไม่
       if (!landmark || landmark.id !== id) {
         // Redirect ไปหน้าโปรไฟล์หรือตำแหน่งที่เหมาะสม
         redirect("/camp");
       }
  return (
    <section>
    <h1 className='text-2xl font-semibold mb-8 capitalize'>Edit Landmark</h1>
    <div className='border p-8 rounded-md'>
        <FormContainer action={editLandmarkAction}>
        <input type="hidden" name="id" value={landmark.id} />
            <div className='grid md:grid-cols-2 gap-4 mt-4'>
                <FormInput
                    name="name"
                    label="Land Name"
                    type="text"
                    placeholder="Land Name"
                    defaultValue={landmark.name}
                />
                 <CategoryInput defaultValue={landmark.category} />
            </div>
            <TextAreaInput name="description" defaultValue={landmark.description} />
            <div className='grid md:grid-cols-2 gap-4 mt-4'>
                <FormInput
                    name="price"
                    label="Price"
                    type="number"
                    placeholder="Price"
                    defaultValue={landmark.price.toString()}
                />
                 <ProvinceInput defaultValue={landmark.province} /> 
            </div>
            <ImageInput name="image" required={false} />
            <MapLandmarkClient location={{ lat: landmark.lat, lng: landmark.lng }} />
            {/* <MapLandmark location={{ lat: landmark.lat, lng: landmark.lng }} /> */}
            <SubmitButton size='lg' text="Update Landmark" />
        </FormContainer>
    </div>
</section>
  )
}

export default EditCamp
