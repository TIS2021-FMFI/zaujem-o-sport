import {useMutation, useQuery} from "react-query";
import Select from "react-select";
import {Col, Row, Form, Button} from "react-bootstrap";
import {Dropzone} from "components/drag_and_drop/Dropzone";
import React, {useState} from "react";
import {dropzoneFileProp} from "components/drag_and_drop/Dropzone";
import {IncorrectRows} from "./IncorrectRows";
import {apiUploadFunding} from "../../adapters";
import create_snackbar, {SnackTypes} from "../../../components/snackbar/Snackbar";

const acceptedFileExtensions = ".csv";

export const UploadData = () => {
	/* TODO: fetch countries
	const {isLoading} = useQuery("endpoint name", apiAdapter, {
		onSuccess: (response) => {
			const serverData = response.data.data;
		},
		onError: (error) => {}
	});
	*/
	// TODO: snackbar with message "Nahranie dát bolo úspešné" no success.

	const [files, setFiles] = useState<dropzoneFileProp[]>([]);

	const countries = [
		{ value: "SVK", label: "Slovakia" },
		{ value: "CZE", label: "Czech Republic" },
		{ value: "MLT", label: "Malta" },
		{ value: "GBR", label: "United Kingdom" }
	];

	// https://react-query.tanstack.com/guides/mutations
	const mutation = useMutation(apiUploadFunding, {
		onSuccess: (response) => {
			console.log(response);
		},
		onError: (error) => {
			console.log(error);
		}
	});

	const handleSubmit = () => {
		// TODO: Upload data to the backend and by response either
		// TODO: show success snackbar and redirect or in case of
		// TODO: errors in some rows in uploaded data load <IncorrectRows />
		// TODO: with incorrect data.
		// TODO: Decide how to store/pass correct and incorrect rows.
		if (files.length === 1)
			mutation.mutate(files[0].file);
		else
			create_snackbar("Najskôr je potrebné nahrať dáta vo formáte csv.", SnackTypes.warn);
	}

	return (<>
		<header>
			<h1>Nahranie dát</h1>
			<h2>Váha financovania</h2>
		</header>
		<section>
			<Row>
				<Col lg={5} md={6} sm={8} xs={12}>
					<Form.Label>Krajina</Form.Label>
					<Select
						id="country"
						options={countries}
					  placeholder="Zvoľte krajinu"
					/>
				</Col>
			</Row>
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

		{/* TODO: remove after backend functionality is ready */}
		<section className={`mt-5`}>
			{/* TODO: adjust count of mistakes from the backend response */}
			<header>
				<h2>Nájdené <span className={`text-danger`}>3 chyby</span> v nahratom súbore:</h2>
			</header>
			<div className={`mt-3`}>
				<IncorrectRows
					tableRowValues={ [
							[1, "tst1", "test1"],
							[8, "tst2", "test2"],
							[32, "tst3", "test3"]
	          ]
	        } />
			</div>
		</section>
	</>)
}