import logo from "../../logo.svg";
import React from "react";
import { Counter } from "pages/counter/Counter";
import { Instagram, Facebook, Twitter, Twitch } from 'react-bootstrap-icons';

export const CounterWrapper = () => {
	return (
		<div className="App" style={{textAlign: "center"}}>
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" style={{ width: "200px" }}/>
				<Counter />
			</header>
			<section id="icons" style={{marginTop: "3rem"}}>
				<header>
					<h2>Icons</h2>
				</header>
				<div>
						<Instagram className="m-3" size={30}/>
					<Facebook className="m-3" size={30}/>
					<Twitter className="m-3" size={30}/>
					<Twitch className="m-3" size={30}/>
				</div>
			</section>
		</div>
	)
}