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

	function handleSubmit() {
		const data = {
			tower: selectedTower,
			floor: selectedFloor,
			meetingRoom: selectedMeetingRoom,
			date: startDate,
			startTime: startTime,
			endTime: endTime
		}
		console.log(JSON.stringify(data));
	};

	function clearAll() {
		setStartDate("");
		setStartTime("");
		setEndTime("");
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
    <div className='app'>
    	<div>
    		<Dropdown 
				placeHolder="Башня"
				options={towers}
				selected={selectedTower}
				onSelectedChange={setSelectedTower}
			/>
    	</div>
		<div>
    		<Dropdown 
				placeHolder="Этаж"
				options={floors}
				selected={selectedFloor}
				onSelectedChange={setSelectedFloor}
			/>
    	</div>
		<div>
    		<Dropdown 
				placeHolder="Переговорная"
				options={meetingRooms}
				selected={selectedMeetingRoom}
				onSelectedChange={setSelectedMeetingRoom}
			/>
    	</div>
    	<div>
        	<DatePicker
        		locale="ru"    
        		selected={startDate}         
        		onChange={(date) => setStartDate(date)}
				placeholderText="Выберите дату"          
        	/>
    	</div>
		<div>
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
		<div>
			<DatePicker
      			selected={endTime}
      			onChange={(date) => setEndTime(date)}
      			showTimeSelect
      			showTimeSelectOnly
      			timeIntervals={15}
      			timeCaption="Time"
      			dateFormat="HH:mm"
				placeholderText="Конец"
    		/>
		</div>
		<button onClick={handleSubmit} className="submitBtn">Отправить</button>
		<button onClick={clearAll} className="clearBtn">Очистить</button>
    </div> 
  );
};
