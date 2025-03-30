import Modal from "../modal/Modal";
import Authentication from "../modal/Authentication";
import Button from "../Button";
import CoffeeCard from "./CoffeeCard";
import Info from "./Info";
import Title from "../Title";
import { coffeeOptions } from "../../lib/constants";
import { useState } from "react";
import { TCoffeeForm, TCoffeeConsumptionHistory } from "../../lib/types";
import { createPortal } from "react-dom";
import { useAuth } from "../../store/AuthContext";

import { getNowTimeMinestTimeAgo } from "../../utils";

export default function CoffeeForm() {
	const [selectedCoffee, setSelectedCoffee] = useState<TCoffeeForm>({
		name: "",
		caffeine: 0,
		hour: 0,
		minutes: 0,
	});
	const [showOther, setShowOther] = useState(false);

	const {
		user,
		userData,
		setUserData,
		toggleLogModal,
		showLogModal,
		postToDatabase,
	} = useAuth();

	const handleSubmitForm = async () => {
		// Open create account modal if not logged in
		if (!user) {
			toggleLogModal();
			return;
		}
		//
		if (!selectedCoffee.name || !selectedCoffee.caffeine) {
			alert("Please select a coffee");
			return;
		}
		try {
			const userDataCopy: TCoffeeConsumptionHistory = { ...userData };
			// Process data to have the same format as in DataBase
			// Get the timestamp as key
			const timestamp = getNowTimeMinestTimeAgo(selectedCoffee);
			// Get the details as value
			const newEntry = {
				name: selectedCoffee.name,
				caffeine: selectedCoffee.caffeine,
			};
			// Update state before posting to DataBase to have fast refresh
			userDataCopy[timestamp] = newEntry;
			setUserData(userDataCopy);
			// Post the new entry to Database
			postToDatabase(user.uid, { [timestamp]: newEntry });
			// Reset after posting to DataBase
			setSelectedCoffee({
				name: "",
				caffeine: 0,
				hour: 0,
				minutes: 0,
			});
		} catch (err) {
			console.log(err);
		}
	};

	const selectCoffee = (coffee: { name: string; caffeine: number }) => {
		if (selectedCoffee.name) {
			setSelectedCoffee({
				...selectedCoffee,
				name: "",
				caffeine: 0,
			});
		} else {
			setSelectedCoffee({
				...selectedCoffee,
				name: coffee.name,
				caffeine: coffee.caffeine,
			});
			setShowOther(false);
		}
	};

	return (
		<div className="coffee-form-container">
			<Title title="Start tracking now" icon="pencil" />
			<div className="coffee-form-choice">
				<h3>Select coffee type</h3>
				<div className="coffee-grid">
					{coffeeOptions.slice(0, 5).map((option, index) => {
						return (
							<CoffeeCard
								key={index}
								onSelect={() => selectCoffee(option)}
								selected={selectedCoffee}
								coffee={option}
							/>
						);
					})}
					<button
						onClick={() => {
							setSelectedCoffee({
								...selectedCoffee,
								name: "",
								caffeine: 0,
							});
							setShowOther((prev) => !prev);
						}}
						className={`${showOther ? "coffee-button-selected" : ""}`}>
						<h4>Other</h4>
					</button>
				</div>
				<div className="dropdown-other">
					<select
						onChange={(e) => {
							setSelectedCoffee({
								...selectedCoffee,
								name: e.target.value.split(",")[0],
								caffeine: parseInt(e.target.value.split(",")[1]),
							});
						}}
						name="coffee-list"
						id="coffee-list"
						style={{ visibility: `${showOther ? "visible" : "hidden"}` }}>
						<option value="">Select type</option>
						{coffeeOptions.slice(5).map((option, index) => {
							return (
								<option
									key={index}
									value={`${option.name}, ${option.caffeine}`}>
									{option.name} - {option.caffeine}mg
								</option>
							);
						})}
					</select>
				</div>
			</div>
			<div className="coffee-form-time">
				<h3>How long ago ?</h3>
				<Info />
				<div className="time-entry">
					<div>
						<h6>Hours</h6>
						<select
							onChange={(e) =>
								setSelectedCoffee({
									...selectedCoffee,
									hour: Number(e.target.value),
								})
							}
							name="hours-select"
							id="hours-select">
							{Array.from({ length: 12 }, (_, i) => {
								return (
									<option key={i} value={i}>
										{i === 0 ? "Now" : i}
									</option>
								);
							})}
						</select>
					</div>
					<div>
						<h6>Mins</h6>
						<select
							onChange={(e) =>
								setSelectedCoffee({
									...selectedCoffee,
									minutes: Number(e.target.value),
								})
							}
							name="mins-select"
							id="mins-select">
							{[0, 15, 30, 45].map((min, i) => {
								return (
									<option key={i} value={min}>
										{min === 0 ? "Now" : min}
									</option>
								);
							})}
						</select>
					</div>
				</div>
			</div>
			<div className="add">
				<Button handleClick={handleSubmitForm} text={"Add Coffee"} />
				{showLogModal &&
					createPortal(
						<Modal>
							<Authentication />
						</Modal>,
						document.body
					)}
			</div>
		</div>
	);
}
