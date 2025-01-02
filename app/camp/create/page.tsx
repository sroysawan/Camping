
import { SubmitButton } from '@/components/form/Buttons'
import FormContainer from '@/components/form/FormContainer'
import FormInput from '@/components/form/FormInput'
import { createLandmarkAction } from '@/actions/action'
import CategoryInput from '@/components/form/CategoryInput'
import TextAreaInput from '@/components/form/TextAreaInput'
import ProvinceInput from '@/components/form/ProvinceInput'
import MapLandmark from '@/components/map/MapLandmark'
import ImageInput from '@/components/form/ImageInput'
import MapLandmarkClient  from '@/components/camp/MapLandmarkClient'

const CreateLandmark = async () => {

    return (
        <section>
            <h1 className='text-2xl font-semibold mb-8 capitalize'>Create Landmark</h1>
            <div className='border p-8 rounded-md'>
                <FormContainer action={createLandmarkAction}>
                    <div className='grid md:grid-cols-2 gap-4 mt-4'>
                        <FormInput
                            name="name"
                            label="Land Name"
                            type="text"
                            placeholder="Land Name"
                        />
                        <CategoryInput />
                    </div>
                    <TextAreaInput name="description"/>
                    <div className='grid md:grid-cols-2 gap-4 mt-4'>
                        <FormInput
                            name="price"
                            label="Price"
                            type="number"
                            placeholder="Price"
                        />
                        <ProvinceInput />
                    </div>
                    <ImageInput name="image" required={true}/>
                    <MapLandmarkClient />
                    {/* <MapLandmark /> */}
                    <SubmitButton size='lg' text="Create Landmark" />
                </FormContainer>
            </div>
        </section>
    )
}

export default CreateLandmark
