import React, {useEffect, useState} from "react";
import {useMutation} from "react-query";
import {apiSuccess} from "../../adapters";
import {Button, Form, Spinner} from "react-bootstrap";
import Select from "react-select";
import {Table} from "../../../components/table/Table";
import {CSVLink} from "react-csv";
import {Download} from "react-bootstrap-icons";
import {useCountries} from "../../../app/hooks";
import {Info} from "../../components/info/Info";
import {ChoiceState} from "../../components/choicestate/ChoiceState";

export const Success = () => {

	const {countries} = useCountries("en");

	const [rowSuccess, setRowSuccess] = useState<(number | string)[][]>([]);

	const [options, setOptions] = useState<{value: string, label: string}[]>([]);
	const [option, setOption] = useState<string[]>(["",""]);

	useEffect(() => {
		if (countries !== undefined) {
			setOptions(countries.map(d => ({
				"value": d.code,
				"label": d.name
			})));
			const svkCountry = countries.find(c => c.code === "SVK");
			if (svkCountry !== undefined)
				setOption([svkCountry.code, svkCountry.name]);
		}
	}, [countries]);

	const { mutateAsync: asyncSuccess } = useMutation(["setSuccess", option],
		() => apiSuccess(option[0]),
		{
			onSuccess: (response) => {
				const serverData = response.data.data;
				setRowSuccess(serverData.success.map((s) => [s.sport_name, s.points, s.order]))
			},
			onError: (error) => {
				console.log(error);
			}
		}
	);

	useEffect(() => {
		if (option[0].length !== 0)
			asyncSuccess();
	}, [option]);

	return (
		<>
			<header>
				<h1 className="mt-3 mb-4"> Success <Info label="What is Ranking" input="After selecting a sport, this page displays a table showing
            the ranking of countries according to the number of points earned in the sport."/></h1>
			</header>

			<div>

				<Form.Label><h4>Country</h4></Form.Label>
				<Select
					id="country"
					options={options}
					placeholder="Choose country"
					onChange={ (selectedOption) => {
						if (selectedOption !== null)
							setOption([selectedOption.value, selectedOption.label]) }}
				/>
				<ChoiceState state={option[1]} />
				<Button variant="outline-primary mt-md-2 mb-md-2"><CSVLink className='button' filename={"success"+option[1]} data={rowSuccess}><Download size={25} /> Export data</CSVLink></Button>{' '}


			</div>
			<div>
				<Table columnNames={[{name: "Sport", sortable: true}, {name: "Points", sortable: true}, {
					name: "Order",
					sortable: true
				}]}
				       rows={rowSuccess}/>

			</div>

		</>
	)
}