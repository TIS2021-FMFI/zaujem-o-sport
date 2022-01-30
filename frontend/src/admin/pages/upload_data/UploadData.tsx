import {CenteredRow} from "components/basic/CenteredRow";
import {Dropzone, dropzoneFileProp} from "components/drag_and_drop/Dropzone";
import React, {useState} from "react";
import createSnackbar, {SnackTypes} from "../../../components/snackbar/Snackbar";
import {useMutationWithNotifications} from "../../../app/hooks";
import {apiUploadFiles} from "../../adapters";

const acceptedFundingFileExtensions = ".csv";
const acceptedSuccessFileExtensions = ".xlsx, .xlsm, .xltx, .xltm";
const acceptedInterconnectednessFileExtensions = acceptedSuccessFileExtensions;

export const UploadData = () => {

	const [fundingFile, setFundingFile] = useState<dropzoneFileProp[]>([]);
	const [successFile, setSuccessFile] = useState<dropzoneFileProp[]>([]);
	const [interconnectednessFile, setInterconnectednessFile] = useState<dropzoneFileProp[]>([]);

	const uploadMutation = useMutationWithNotifications(
		"admin_upload", apiUploadFiles, "Uploading files..."
	);

	const handleUploadSubmit = () => {
		if (fundingFile.length === 0 && successFile.length === 0 && interconnectednessFile.length === 0)
			createSnackbar("Please upload at least one source.", SnackTypes.warn);
		else
			uploadMutation.mutate({fundingFile: fundingFile[0]?.file, successFile: successFile[0]?.file,
																		 interconnectednessFile: interconnectednessFile[0]?.file, });
	}

	return (<>
		<CenteredRow as="header">
			<h1>Upload data</h1>
		</CenteredRow>
		<section>
			<CenteredRow as="header">
				<h2>Upload funding data</h2>
			</CenteredRow>
			<CenteredRow as="section">
				<Dropzone accept={acceptedFundingFileExtensions} files={fundingFile} setFiles={setFundingFile} lang="en"/>
				{ fundingFile.length !== 0 &&
        <div className={`w-100 mt-2`}>
          <span>Uploaded files: </span>
          <span>
								{ fundingFile.map((file, i) => file.file.name).join(", ") }
							</span>
          <a href="#"
             className={`float-end`}
             onClick={ () => setFundingFile([]) }
          >
            Delete uploaded files
          </a>
        </div>
				}
			</CenteredRow>
		</section>
		<section>
			<CenteredRow as="header">
				<h2>Upload success data</h2>
			</CenteredRow>
			<CenteredRow as="section">
				<Dropzone accept={acceptedSuccessFileExtensions} files={successFile} setFiles={setSuccessFile} lang="en"/>
				{ successFile.length !== 0 &&
        <div className={`w-100 mt-2`}>
          <span>Uploaded files: </span>
          <span>
								{ successFile.map((file, i) => file.file.name).join(", ") }
							</span>
          <a href="#"
             className={`float-end`}
             onClick={ () => setSuccessFile([]) }
          >
            Delete uploaded files
          </a>
        </div>
				}
			</CenteredRow>
		</section>
		<section>
			<CenteredRow as="header">
				<h2>Upload interconnectedness data</h2>
			</CenteredRow>
			<CenteredRow as="section">
				<Dropzone accept={acceptedInterconnectednessFileExtensions} files={interconnectednessFile} setFiles={setInterconnectednessFile} lang="en"/>
				{ interconnectednessFile.length !== 0 &&
        <div className={`w-100 mt-2`}>
          <span>Uploaded files: </span>
          <span>
								{ interconnectednessFile.map((file, i) => file.file.name).join(", ") }
							</span>
          <a href="#"
             className={`float-end`}
             onClick={ () => setInterconnectednessFile([]) }
          >
            Delete uploaded files
          </a>
        </div>
				}
			</CenteredRow>
		</section>
		<CenteredRow as="section" className="mt-5 mb-5">
			<div>
				<button type="button" className="btn btn-primary" onClick={handleUploadSubmit}>Upload</button>
			</div>
		</CenteredRow>
	</>)
}