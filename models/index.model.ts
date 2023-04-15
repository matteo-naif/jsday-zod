import { z } from 'zod';

/**
 * Declare a schema with zod
 */

const UserSchema = z.object({
	name: z.string().nonempty(),
	surname: z.string().nonempty(),
	role: z.string().nonempty(),
});

/**
 * And derive the static type
 */

type UserModel = z.infer<typeof UserSchema>;

/**
    type UserModel = {
        name: string;
        surname: string;
        age: number;
    }
 */

export { UserSchema };
export type { UserModel };
