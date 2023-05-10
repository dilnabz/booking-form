import React, {useState} from "react";
import './App.css';
import { Dropdown } from './components/Dropdown.js';
import DatePicker from "react-datepicker";
import "./datePickerStyle.css";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import ru from 'date-fns/locale/ru';

registerLocale('ru', ru);
setDefaultLocale('ru', ru);



export function App() {
	const [startDate, setStartDate] = useState(new Date());
	const [startTime, setStartTime] = useState(new Date(2023, 4, 10, 12, 0));
	const [endTime, setEndTime] = useState(new Date(2023, 4, 10, 12, 30));
	const [selectedTower, setSelectedTower] = useState(null);
	const [selectedFloor, setSelectedFloor] = useState(null);
	const [selectedMeetingRoom, setSelectedMeetingRoom] = useState(null);
	const [comment, setComment] = useState("");

	const towers = [
		{value: "towerA", label: "Башня А"},
		{value: "towerB", label: "Башня Б"},
	];
  	const floors = Array(27).fill().map((_, i) => {
		return {value: `floor${i+1}`, label: `${i+1} этаж`};
  	}).slice(2);

  	const meetingRooms = Array(10).fill().map((_, i) => {
		return {value: `room${i+1}`, label: `${i+1} переговорная`};
  	});

	function handleSubmit(e) {
		e.preventDefault();
		const sTime = [startTime.getHours(), startTime.getMinutes()]
		.map((x) => x < 10 ? "0" + x : x)
		.join(":");

		const eTime = [endTime.getHours(), endTime.getMinutes()]
		.map((x) => x < 10 ? "0" + x : x)
		.join(":");
		
		const data = {
			tower: selectedTower === null ? null : selectedTower.value,
			floor: selectedFloor === null ? null : selectedFloor.value,
			meetingRoom: selectedMeetingRoom === null ? null : selectedMeetingRoom.value,
			date: startDate,
			startTime: sTime,
			endTime: eTime,
			comment: comment
		};

		if(Object.values(data).some(value => value === null || value === "")) {
			alert("Пожалуйста, заполните все поля")
		} else {
			console.log(JSON.stringify(data));
		};

	};

	function clearAll() {
		setStartDate(new Date());
		setStartTime(new Date(2023, 4, 10, 12, 0));
		setEndTime(new Date(2023, 4, 10, 12, 30));
		setSelectedTower(null);
		setSelectedFloor(null);
		setSelectedMeetingRoom(null);
		setComment("");
	};

  	return (      
    <div className="app">
    	<form className="container" onSubmit={handleSubmit} onReset={clearAll}>
			<div className="title">Бронирование переговорной</div>
			<div className='dropdownContainer'>
				<div className="dropdown">
    				<Dropdown 
						placeHolder="Выберите башню"
						options={towers}
						selected={selectedTower}
						onSelectedChange={setSelectedTower}
					/>
    			</div>
				<div className="dropdown">
    				<Dropdown 
						placeHolder="Выберите этаж"
						options={floors}
						selected={selectedFloor}
						onSelectedChange={setSelectedFloor}
					/>
    			</div>
				<div className="dropdown">
    				<Dropdown 
						placeHolder="Выберите переговорную"
						options={meetingRooms}
						selected={selectedMeetingRoom}
						onSelectedChange={setSelectedMeetingRoom}
					/>
    			</div>
			</div>
    		<div className="calendarContainer">
				<div className="dateContainer">
					<div className="dateTitle">Дата</div>
					<div className="datepicker">
        				<DatePicker
        					locale="ru"
							showPopperArrow={false} 
        					selected={startDate}
							dateFormat="dd/MM/yyyy"       
        					onChange={(date) => setStartDate(date)}         
        				/>
    				</div>
				</div>
				<div className="dateContainer">
					<div className="dateTitle">Начало</div>
					<div className="datepicker">
						<DatePicker
							locale="ru"
      						selected={startTime}
      						onChange={(date) => setStartTime(date)}
							showPopperArrow={false}
      						showTimeSelect
      						showTimeSelectOnly
      						timeIntervals={30}
      						timeCaption="Время"
      						dateFormat="HH:mm"
    				/>
					</div>
				</div>
				<div  className="dateContainer">
					<div className="dateTitle">Конец</div>
					<div className="datepicker">
						<DatePicker
      						selected={endTime}
      						onChange={(date) => setEndTime(date)}
							showPopperArrow={false}
      						showTimeSelect
      						showTimeSelectOnly
      						timeIntervals={30}
      						timeCaption="Время"
      						dateFormat="HH:mm"
    					/>
					</div>
				</div>
			</div>
			<div className="commentContainer">
				<textarea
				className="comment" 
					value={comment} 
					placeholder="Оставьте комментарий"
					onChange={e => setComment(e.target.value)} 
					rows="5"
					cols="100"
					maxLength="1000"
				/>
			</div>
			<div className='submitBtnContainer'>
				<button 
					type="submit" 
					className="submitBtn"
				>
					Отправить
				</button>
				<button 
					type="reset" 
					className="clearBtn"
				>
					Очистить
				</button>
			</div>
			
		</form>	
    </div> 
  );
};