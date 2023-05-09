import './App.css';
import React, {useState} from "react";
import { Dropdown } from './components/Dropdown.js';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css// 
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import ru from 'date-fns/locale/ru';
import "./datePickerStyle.css"
registerLocale('ru', ru);
setDefaultLocale('ru', ru);



export function App() {
	const [startDate, setStartDate] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [selectedTower, setSelectedTower] = useState(null);
	const [selectedFloor, setSelectedFloor] = useState(null);
	const [selectedMeetingRoom, setSelectedMeetingRoom] = useState(null);
	const [comment, setComment] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		const data = {
			tower: selectedTower,
			floor: selectedFloor,
			meetingRoom: selectedMeetingRoom,
			date: startDate,
			startTime: startTime,
			endTime: endTime,
			comment: comment
		};

		if(Object.values(data).some(value => value === null || value === "")) {
			alert("Пожалуйста, заполните все поля")
		} else {
			console.log(JSON.stringify(data));
		};

	};

	function clearAll() {
		setStartDate("");
		setStartTime("");
		setEndTime("");
		setComment("");
		setSelectedTower(null);
		setSelectedFloor(null);
		setSelectedMeetingRoom(null);
	};

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

  	return (      
    <div className="app">
		<h1 className="title">Бронирование переговорной</h1>
    	<form className="container" onSubmit={handleSubmit}>
			<div className="dropdown">
    			<Dropdown 
					placeHolder="Башня"
					options={towers}
					selected={selectedTower}
					onSelectedChange={setSelectedTower}
				/>
    		</div>
			<div className="dropdown">
    			<Dropdown 
					placeHolder="Этаж"
					options={floors}
					selected={selectedFloor}
					onSelectedChange={setSelectedFloor}
				/>
    		</div>
			<div className="dropdown">
    			<Dropdown 
					placeHolder="Переговорная"
					options={meetingRooms}
					selected={selectedMeetingRoom}
					onSelectedChange={setSelectedMeetingRoom}
				/>
    		</div>
    		<div className="datepicker">
        		<DatePicker
        			locale="ru"    
        			selected={startDate}         
        			onChange={(date) => setStartDate(date)}
					placeholderText="Выберите дату"          
        		/>
    		</div>
			<div className="datepicker">
				<DatePicker
      				selected={startTime}
      				onChange={(date) => setStartTime(date)}
      				showTimeSelect
      				showTimeSelectOnly
      				timeIntervals={15}
      				timeCaption="Time"
      				dateFormat="HH:mm"
					placeholderText="Начало"
    			/>
			</div>
			<div className="datepicker">
				<DatePicker
      				selected={endTime}
      				onChange={(date) => setEndTime(date)}
      				showTimeSelect
      				showTimeSelectOnly
      				timeIntervals={30}
      				timeCaption="Time"
      				dateFormat="HH:mm"
					placeholderText="Конец"
    			/>
			</div>
			<div>
			<textarea 
				value={comment} 
				placeholder="Оставьте комментарий"
				onChange={e => setComment(e.target.value)} 
				rows="5"
				cols="100"
				maxLength="150"
			/>
		</div>
			<button type="submit" className="submitBtn">Отправить</button>
		</form>
		<button onClick={clearAll} className="clearBtn">Очистить</button>
    </div> 
  );
};
