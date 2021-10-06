import { useDispatch, useSelector } from 'react-redux';
import { dispatchModal, updateMeal } from '../app/modalSlice';

function StoreMeal() {
	const dispatch = useDispatch();
	const meals = useSelector(state => state.meals);

	const handleAddNew = () => {
		dispatch(dispatchModal({ type: 'Add new' }));
	};
	const handleEdit = meal => {
		dispatch(updateMeal(meal.name));
	};
	const handleDelete = meal => {
		dispatch(dispatchModal({ type: 'Delete', meal }));
	};

	return (
		<div className='px-2 lg:px-0 flex justify-center flex-col space-y-3 max-w-screen-sm mx-auto min-h-screen overflow-x-auto'>
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
						<tr>
							<td className='p-2'>No meal. Add new?</td>
						</tr>
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
