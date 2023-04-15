import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { getUserData } from '../api';
import { UserModel, UserSchema } from '../models';
import { ZodError } from 'zod';

/**
 * ZOD AT THE FRONTIERS
 *
 * https://zod.dev
 * Typescript-first schema validation with static type inference
 *
 */

function Homepage(params: any) {
	// useState
	const [section, setSection] = useState<FieldsModel>('form');
	const [result, setResult] = useState<UserModel | null>(null);
	const [response, setResponse] = useState<UserModel | ZodError | null>(null);

	/**
	 * Use the schema to validate data in a form
	 * and the derived type to check the correct fields in register function
	 */
	const {
		handleSubmit,
		formState: { errors },
		register,
	} = useForm<UserModel>({
		resolver: zodResolver(UserSchema),
	});

	return (
		<>
			<div className="container">
				{fields.map((field, i) => (
					<button
						key={`toggle-${i}`}
						onClick={() => setSection(field)}
						className={'toggle ' + (section === field ? 'is-active' : '')}
					>
						{field}
					</button>
				))}

				{section === 'form' && (
					<>
						<h1>Form</h1>
						<form onSubmit={handleSubmit((d) => setResult(d))} className="mb-1">
							{/* name */}
							<div className="mb-1">
								<label>Name</label>
								<input type="text" {...register('name')} />
								<p className="errors">{errors.name?.message}</p>
							</div>
							{/* Surname */}
							<div className="mb-1">
								<label>Surname</label>
								<input type="text" {...register('surname')} />
								<p className="errors">{errors.surname?.message}</p>
							</div>
							{/* Role */}
							<div className="mb-1">
								<label>Role</label>
								<input type="text" {...register('role')} />
								<p className="errors">{errors.role?.message}</p>
							</div>

							<input type="submit" value="Send data" />
						</form>
						<div>{result && <pre>{JSON.stringify(result, null, 2)}</pre>}</div>
					</>
				)}

				{section === 'fetchdata' && (
					<>
						<h1>Fetch data</h1>

						<div className="mb-1">
							<button
								type="button"
								onClick={async () => {
									const userData = await getUserData({ isWrong: false });
									setResponse(userData);
								}}
							>
								Fetch correct data
							</button>
							<button
								type="button"
								onClick={async () => {
									const userData = await getUserData({ isWrong: true });
									setResponse(userData);
								}}
							>
								Fetch wrong data
							</button>
							<div>
								{response && <pre>{JSON.stringify(response, null, 2)}</pre>}
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
}

export default Homepage;

const fields: FieldsModel[] = ['form', 'fetchdata'];
type FieldsModel = 'form' | 'fetchdata';
