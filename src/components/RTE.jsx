import React from 'react'
import { Controller } from 'react-hook-form'
import { Editor } from '@tinymce/tinymce-react';

function RTE({ name, control, label, value = '' }) {
    return (
        <div className='w-full'>
            {label && <label>{label}</label>}

            <Controller
                name={name || 'description'}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Editor
                        apiKey='fuwzizf3lyjwmnsm3escdxy1z15oupxlwgida1y5gxmosoho'
                        value={value}
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image", "advlist", "autolink", "lists", "link", "image",
                                "charmap", "preview", "anchor", "searchreplace",
                                "visualblocks", "code", "fullscreen", "insertdatetime",
                                "media", "table", "code", "help", "wordcount", "anchor"
                            ],
                            toolbar:
                                "undo redo | blocks | image | bold italic forecolor | " +
                                "alignleft aligncenter alignright alignjustify | " +
                                "bullist numlist outdent indent | removeformat | help"
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />

        </div>
    )
}

export default RTE