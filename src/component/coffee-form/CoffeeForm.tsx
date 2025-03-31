import Modal from "../modal/Modal";
import Authentication from "../modal/Authentication";
import Button from "../Button";
import CoffeeCard from "./CoffeeCard";
import Info from "./Info";
import Title from "../Title";
import { coffeeOptions } from "../../lib/constants";
import { useState, useRef } from "react";
import { TCoffeeForm, TCoffeeConsumptionHistory } from "../../lib/types";
import { createPortal } from "react-dom";

import { getNowTimeMinestTimeAgo } from "../../utils";
import { useAuth } from "../../hooks/useAuth";

export default function CoffeeForm() {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [selectedCoffee, setSelectedCoffee] = useState<TCoffeeForm>({
		name: "",
		caffeine: 0,
		hour: 0,
		minutes: 0,
	});
	const [showOther, setShowOther] = useState(false);

	// Scroll to bottom, to see the stats, when user enter a coffee
	const scrollBottom = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.currentTarget.scrollIntoView({
			behavior: "smooth",
		});
	};

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
			console.log(selectedCoffee);
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
		if (coffee.name === selectedCoffee.name) {
			setSelectedCoffee({ ...selectedCoffee, name: "", caffeine: 0 });
			return;
		}
		setSelectedCoffee({
			...selectedCoffee,
			name: coffee.name,
			caffeine: coffee.caffeine,
		});
		setShowOther(false);
	};

	const handleClickOther = () => {
		setSelectedCoffee({
			...selectedCoffee,
			name: "",
			caffeine: 0,
		});
		setShowOther((prev) => !prev);
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
						onClick={handleClickOther}
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
						<option disabled value="">
							Select type
						</option>
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
							value={selectedCoffee.hour}
							onChange={(e) =>
								setSelectedCoffee({
									...selectedCoffee,
									hour: Number(e.target.value),
								})
							}
							name="hours-select"
							id="hours-select">
							<option value={0}>now</option>
							{Array.from({ length: 12 }, (_, i) => {
								return (
									<option key={i} value={i}>
										{i}
									</option>
								);
							})}
						</select>
					</div>
					<div>
						<h6>Mins</h6>
						<select
							value={selectedCoffee.minutes}
							onChange={(e) =>
								setSelectedCoffee({
									...selectedCoffee,
									minutes: Number(e.target.value),
								})
							}
							name="mins-select"
							id="mins-select">
							<option value={0}>now</option>
							{[0, 15, 30, 45].map((min, i) => {
								return (
									<option key={i} value={min}>
										{min}
									</option>
								);
							})}
						</select>
					</div>
				</div>
			</div>
			<div
				className="add"
				ref={scrollRef}
				onClick={user ? (e) => scrollBottom(e) : (e) => e}>
				<Button handleClick={handleSubmitForm} text={"Add Coffee"} icon />
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
