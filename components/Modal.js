import { useContext, useState } from 'react';
import { DataContext } from '../store/GlobalState';
import { XIcon } from '@heroicons/react/outline';

function Modal() {
	const { state, dispatch } = useContext(DataContext);
	const {
		modal: { type, meal },
		meals: storeMeals,
	} = state;

	const [name, setName] = useState('');
	const [isFound, setIsFound] = useState(false);
	const [isExist, setIsExist] = useState(false);
	const [input, setInput] = useState(false);
	const [edit, setEdit] = useState({ onEdit: false, value: 0 });

	const API_SEARCH = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

	if (type && process.browser) {
		const modalEl = document.getElementById('modal');
		const modalBodyEl = document.getElementById('modalBody');
		modalEl.classList.remove('hidden');
		modalBodyEl.classList.remove('animate-scaleOut');
		modalEl.classList.add('flex');
		modalBodyEl.classList.add('animate-scaleIn');
	}

	const handleClose = () => {
		const modalEl = document.getElementById('modal');
		const modalBodyEl = document.getElementById('modalBody');
		modalBodyEl.classList.remove('animate-scaleIn');
		modalBodyEl.classList.add('animate-scaleOut');
		setTimeout(() => {
			modalEl.classList.remove('flex');
			modalEl.classList.add('hidden');
		}, 300);
	};

	if (process.browser) {
		const El = document.getElementById('modal');

		window.onclick = e => {
			if (e.target === El) {
				handleClose();
			}
		};
	}

	const handleAdd = async () => {
		if (!name) return setInput(true);

		const existMeal = storeMeals.some(meal => meal.name === name);
		if (existMeal) return setIsExist(true);

		const res = await fetch(`${API_SEARCH}${name}`);
		const { meals } = await res.json();

		if (!meals) return setIsFound(true);
		dispatch({ type: 'ADD_MEAL', payload: { name, count: meals.length } });
		handleClose();
	};

	const handleChangeInput = e => {
		setInput(false);
		setIsExist(false);
		setIsFound(false);
		setName(e.target.value);
	};

	const handleDelete = () => {
		const index = storeMeals.findIndex(x => x.name === meal.name);
		const newStoreMeals = [...storeMeals];
		newStoreMeals.splice(index, 1);
		dispatch({ type: 'DELETE_MEAL', payload: newStoreMeals });
		handleClose();
	};
	const handleUpdate = async () => {
		setName(meal.name);

		const res = await fetch(`${API_SEARCH}${meal.name}`);
		const { meals } = await res.json();

		if (!meals) return setIsFound(true);
		setEdit({ onEdit: true, value: meals.length });
		dispatch({ type: 'UPDATE_MEAL', payload: { name: meal.name, count: meals.length } });
	};

	return (
		<div
			className='hidden fixed top-0 left-0 right-0 bottom-0 bg-[#00000023]  justify-center items-center'
			id='modal'
		>
			<div id='modalBody' className='bg-white rounded-md shadow-md divide-y-2 min-w-[300px]'>
				<div className='p-4 flex justify-between'>
					<p className='font-bold'>{type}</p>
					<XIcon className='h-6 cursor-pointer' onClick={handleClose} />
				</div>

				<div className='p-5'>
					{type === 'Add new' ? (
						<div>
							<p>Input the meal name will count</p>
							<input
								type='text'
								placeholder='Meal name'
								className='p-1 w-full border border-gray-300 my-4'
								onChange={handleChangeInput}
							/>
							{isFound && <p className='text-red-500'>Meal not found</p>}
							{isExist && <p className='text-red-500'>Meal is already exist</p>}
							{input && <p className='text-red-500'>Please enter a name</p>}
						</div>
					) : type === 'Delete' ? (
						`Are you want to delete "${meal.name}" with the count is ${meal.count}?`
					) : (
						<div>
							<input
								type='text'
								placeholder='Meal name'
								className='p-1 w-full border border-gray-300 my-4'
								onChange={handleChangeInput}
								value={meal && meal.name}
							/>
							{edit.onEdit && <p>The count is {edit.value}.</p>}
						</div>
					)}
				</div>

				<div className='p-3 flex justify-end'>
					{type === 'Add new' ? (
						<button
							className='min-w-[100px] p-1 rounded-sm text-gray-100 bg-gray-500 '
							onClick={handleAdd}
						>
							Add
						</button>
					) : type === 'Delete' ? (
						<button
							className='min-w-[100px] p-1 rounded-sm text-gray-100 bg-gray-500 '
							onClick={handleDelete}
						>
							Delete
						</button>
					) : (
						<button
							className='min-w-[100px] p-1 rounded-sm text-gray-100 bg-gray-500 '
							onClick={handleUpdate}
						>
							Update
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default Modal;
