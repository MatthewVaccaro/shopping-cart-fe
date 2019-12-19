import React, { useState } from 'react'
import axios from 'axios'
import { List, InputItem, WhiteSpace, Flex, ImagePicker } from 'antd-mobile'
import { useSelector } from 'react-redux'
import { createForm } from 'rc-form'
import '../Reusable/index.css'
import { ConfirmButton } from '../Reusable'

const SecondView = props => {
  const [files, setFiles] = useState([])
  const [multiple] = useState(false)
  const formState = useSelector(state => state.form)
  const onChange = (files, type, index) => {
    console.log(files, type, index)
    setFiles(files)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const image = new FormData()
    image.append('file', files[0])
    image.append('upload_preset', 'pure-retail')
    console.log(image)
    console.log(files[0])
    try {
      const res = await axios.post(
        `	https://api.cloudinary.com/v1_1/pureretail`,
        image
      )
      console.log(res)
    } catch (err) {
      console.log(err)
    }
    props.form.validateFields({ force: true }, (err, values) => {
    //   const payload = {
    //     name: formState.name,
    //     currency: formState.currency,
    //     image_url: files[0].url,
    //     store: values.store
    //   }
      if (!err) {
        console.log(files)
      } else {
        window.alert('Validation failed')
      }
    })
  }
  const { getFieldProps } = props.form
  return (
    <form>
      <div className='flex-container'>
        <div style={{ marginBottom: '2em' }}>
                Upload store
          <br />
                 logo
        </div>
        <div id='logo'>
          <ImagePicker
            style={{
              width: '7rem',
              height: '7rem',
              backgroundColor: 'white'
            }}
            files={files}
            onChange={onChange}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={files.length < 1}
            multiple={multiple}
          />
        </div>
        <div className='form'>
          <List
            renderHeader={() => (
              <div style={{ marginBottom: '2em' }}>
                Give your store
                <br />
                 a name
              </div>
            )}
          >
            <Flex direction='column'>
              <InputItem
                {...getFieldProps('store', {
                  rules: [
                    {
                      required: true,
                      message: 'Your store name'
                    }
                  ]
                })}
                type='text'
                placeholder='My store name is...'
              />
              <WhiteSpace />
            </Flex>
          </List>
        </div>
        <ConfirmButton text='Done' handleSubmit={handleSubmit} />
        <WhiteSpace />
      </div>
    </form>
  )
}
const SecondViewWrapper = createForm()(SecondView)
export default SecondViewWrapper
