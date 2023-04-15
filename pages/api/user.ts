// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { UserModel } from '../../models/index.model';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const user: UserModel = {
		name: 'Mario',
		surname: 'Rossi',
		role: 'Frontend dev',
	};

	res.status(200).json(user);
}
