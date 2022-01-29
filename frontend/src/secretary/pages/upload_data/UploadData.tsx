import {useMutation} from "react-query";
import Select from "react-select";
import {Col, Row, Form, Button} from "react-bootstrap";
import {Dropzone} from "components/drag_and_drop/Dropzone";
import React, {useEffect, useState} from "react";
import {dropzoneFileProp} from "components/drag_and_drop/Dropzone";
import {IncorrectRows} from "./IncorrectRows";
import {apiUploadFunding} from "../../adapters";
import createSnackbar, {SnackTypes} from "components/snackbar/Snackbar";
import {useCountries, useFundingCurrencies} from "app/hooks";
import {currencies} from "../../../data/active_currency_codes";

const acceptedFileExtensions = ".csv";

export const UploadData = () => {

	const [files, setFiles] = useState<dropzoneFileProp[]>([]);

	const {countries: responseCountries} = useCountries();
	const [countries, setCountries] = useState<{value: string, label: string}[]>([]);
	const [selectedCountry, setSelectedCountry] = useState<string | undefined>();

	const currencyOptions = currencies.map((currency) => { return {label: currency, value: currency} });
	const [selectedCurrency, setSelectedCurrency] = useState<string | undefined>();

	/*
	const {currencies: responseCurrencies} = useFundingCurrencies();
	const [currencies, setCurrencies] = useState<{value: string, label: string}[]>([]);
	const [selectedCurrency, setSelectedCurrency] = useState<string | undefined>();
	useEffect(() => {
		setCurrencies(responseCurrencies.map((c) => { return {
			value: c.currency, label: c.currency
		}}));
	}, [responseCurrencies]);
	*/

	useEffect(() => {
		setCountries(responseCountries.map((country) => { return {
			value: country.code, label: `${country.name} (${country.code})`
		}}));
	}, [responseCountries]);

	const uploadMutation = useMutation(apiUploadFunding, {
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
		if (selectedCountry === undefined || selectedCurrency === undefined)
			createSnackbar("Zvoliť krajinu a menu.", SnackTypes.warn);
		else if (files.length === 1)
			uploadMutation.mutate({csvFile: files[0].file, countryCode: selectedCountry, currency: selectedCurrency});
		else
			createSnackbar("Najskôr je potrebné nahrať dáta vo formáte csv.", SnackTypes.warn);
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
						onChange={(selectedCountry) => setSelectedCountry(selectedCountry?.value)}
					/>
				</Col>
			</Row>
			<Row>
				<Col lg={5} md={6} sm={8} xs={12}>
					<Form.Label>Meny</Form.Label>
					<Select
						id="currency"
						options={currencyOptions}
						placeholder="Zvoľte menu"
						onChange={(selectedCurrency) => setSelectedCurrency(selectedCurrency?.value)}
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