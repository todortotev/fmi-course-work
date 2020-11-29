import React from 'react'
import { useState, useEffect } from 'react'
import { useIsFetching } from 'react-query'

const defaultFormValues = {
  title: '',
  body: '',
  image: '',
}

export default function PostForm({
  onSubmit,
  initialValues = defaultFormValues,
  submitText,
  clearOnSubmit,
}) {
  const [values, setValues] = useState(initialValues)
  const isFetching = useIsFetching()

  const setValue = (field, value) =>
    setValues((old) => ({ ...old, [field]: value }))

  const handleSubmit = (e) => {
    if (clearOnSubmit) {
      setValues(defaultFormValues)
    }
    e.preventDefault()
    onSubmit(values)
  }

  useEffect(() => {
    setValues(initialValues)
  }, [initialValues])

  const uploadFile = async (e) => {
    const files = e.target.files
    if (files.length > 0) {
      const data = new FormData()
      data.append('file', files[0])
      data.append('upload_preset', 'sickfits')

      const res = await fetch(
        'https://api.cloudinary.com/v1_1/totev94/image/upload',
        {
          method: 'POST',
          body: data,
        }
      )
      const file = await res.json(res)
      setValues((old) => ({ ...old, image: file.secure_url }))
    } else {
      setValues((old) => ({ ...old, image: '' }))
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <div>
        <input
          type="text"
          name="title"
          value={values.title}
          onChange={(e) => setValue('title', e.target.value)}
          required
        />
      </div>
      <br />
      <label htmlFor="body">body</label>
      <div>
        <textarea
          type="text"
          name="body"
          value={values.body}
          onChange={(e) => setValue('body', e.target.value)}
          required
          rows="10"
        />
      </div>
      <div>
        {values.image && (
          <img
            width="200px"
            height="200px"
            src={values.image}
            alt="Upload Preview"
          ></img>
        )}
        <input
          type="file"
          id="file"
          name="file"
          placeholder="Upload an image"
          onChange={uploadFile}
        />
      </div>
      <br />
      <button disabled={isFetching} type="submit">
        {submitText}
      </button>
    </form>
  )
}
