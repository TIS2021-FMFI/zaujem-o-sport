import React, {useCallback} from "react";
import {useDropzone} from "react-dropzone";
import styles from "./styles/dropzone.module.scss";

// TODO (enhancement): loading while uploading

export type dropzoneFileProp = {
    id: string,
    url: string,
    file: File
};

type DropzoneProps = {
    accept: string,
    files: dropzoneFileProp[],
    setFiles: Function
};

export const Dropzone = ({accept, files, setFiles}: DropzoneProps) => {

    const onDrop = useCallback(async acceptedFiles => {
        let droppedFiles = [];
        for (const file of acceptedFiles) {
            // new versions of browsers do not show `path` property
            const filePath = (file.hasOwnProperty("path") ? file.path : file.name);
            let fileURL = URL.createObjectURL(file);

            if (files.find((fileItem) => fileItem.id === filePath) === undefined) {
                droppedFiles.push({
                    id: filePath,
                    url: fileURL,
                    file: file
                });
            }
        }
        setFiles([...files, ...droppedFiles]);

    }, [files, setFiles]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept})

    return (
        <div {...getRootProps({className: styles.dropzone})}>
            <input {...getInputProps()} />
            <p>
                Potiahnite a pustite súbory s dátami sem, alebo kliknite a vyberte súbory.
            </p>
        </div>
    );
}