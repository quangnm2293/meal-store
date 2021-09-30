import { useContext } from 'react';
import { DataContext } from '../store/GlobalState';

function StoreMeal() {
	const { state, dispatch } = useContext(DataContext);

	const { meals } = state;

	const handleAddNew = () => {
		dispatch({ type: 'CRUD_MEAL', payload: { type: 'Add new' } });
	};
	const handleEdit = meal => {
		dispatch({ type: 'CRUD_MEAL', payload: { type: 'Edit meal', meal } });
	};
	const handleDelete = meal => {
		dispatch({ type: 'CRUD_MEAL', payload: { type: 'Delete', meal } });
	};

	return (
		<div className='flex justify-center flex-col space-y-3 max-w-screen-sm mx-auto min-h-screen'>
			<button className='p-2 border border-gray-500 rounded-none self-end w-[100px]' onClick={handleAddNew}>
				Add New
			</button>
			<table className='border border-gray-400'>
				<thead>
					<tr className='border border-[#4f4f4f] bg-[#9e9e9e] text-gray-100'>
						<th className='p-2'>No</th>
						<th className='p-2'>Meal</th>
						<th className='p-2'>Count</th>
						<th className='p-2'></th>
					</tr>
				</thead>
				<tbody>
					{meals.length === 0 ? (
						<p className='p-2'>No meal. Add new?</p>
					) : (
						meals?.map((meal, i) => (
							<tr
								key={i}
								className={`border border-gray-400 ${
									i % 2 === 0 ? 'bg-[#e6e6e6]' : ''
								}`}
							>
								<td className='text-center p-2'>{i + 1}</td>
								<td className='text-center capitalize'>{meal.name}</td>
								<td className='text-center'>{meal.count}</td>
								<td>
									<div className='flex space-x-2 justify-center items-center'>
										<p
											className='border-r border-gray-500 pr-2 cursor-pointer'
											onClick={() => handleEdit(meal)}
										>
											Edit
										</p>
										<p
											className='cursor-pointer'
											onClick={() => handleDelete(meal)}
										>
											Delete
										</p>
									</div>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
}

export default StoreMeal;
