import { UserSchema } from '../models/index.model';

/**
 * The return type is infered
 */

const getUserData = async ({ isWrong = false }) => {
	const url = isWrong ? '/api/user-wrong' : '/api/user';
	const response = await fetch(url);
	const data = await response.json();

	/**
	 * Use the schema to decode data from api
	 * Change the object returned in `pages/api/user.ts` from user to wrongUser
	 * to see the error in the UI
	 */
	const decoded = UserSchema.safeParse(data);

	if (!decoded.success) {
		return decoded.error;
	} else {
		return decoded.data;
	}
};

export { getUserData };
