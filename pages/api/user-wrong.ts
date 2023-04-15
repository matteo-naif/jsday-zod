// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { UserModel } from '../../models';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const wrongUser: any = {
		name: 'Mario',
		surname: 'Rossi',
		role: 1,
	};

	res.status(200).json(wrongUser);
}
