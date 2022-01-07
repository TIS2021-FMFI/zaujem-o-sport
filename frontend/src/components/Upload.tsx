import {useQuery} from "react-query";
import Select from "react-select";
import {Col, Row, Form, Button} from "react-bootstrap";
import {Dropzone} from "components/drag_and_drop/Dropzone";
import React, {useState} from "react";
import {dropzoneFileProp} from "components/drag_and_drop/Dropzone";
import {IncorrectRows} from "./drag_and_drop/IncorrectRows";

const acceptedFileExtensions = ".csv";

function UploadData() {


    const [files, setFiles] = useState<dropzoneFileProp[]>([]);

    const countries = [
        { value: "SVK", label: "Slovakia" },
        { value: "CZE", label: "Czech Republic" },
        { value: "MLT", label: "Malta" },
        { value: "GBR", label: "United Kingdom" }
    ]

    const handleSubmit = () => {

    }

    return (<>
        <header>
            <h1>Nahranie dát</h1>
        </header>
        <section>

            <Row className={`mt-4`}>
                <Col>
                    <Form.Label>Súbory</Form.Label>
                    <Dropzone accept={acceptedFileExtensions} files={files} setFiles={setFiles}/>
                    { files.length !== 0 &&
                        <div className={`w-100 mt-2`}>
                            <span>Nahrané súbory: </span>
                            <span>
								{ files.map((file, i) => file.file.name).join(", ") }
							</span>
                            <a href="#"
                               className={`float-end`}
                               onClick={ () => setFiles([]) }
                            >
                                Zmaž nahraté súbory
                            </a>
                        </div>
                    }
                </Col>
            </Row>
            <Row className={`mt-5`}>
                <Col>
                    <Button
                        onClick={ handleSubmit }
                    >
                        Nahrať dáta
                    </Button>
                </Col>
            </Row>
        </section>

        <br></br>
    </>)
}
export default UploadData;