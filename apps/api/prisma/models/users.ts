import { hash } from 'bcrypt';
import { Gender } from 'prisma/types';
import { v4 as uuid } from 'uuid';

export async function listUsers()  {
    return [
        {
            id: uuid(),
            accountActive: true,
            username: 'Bruce Wayne',
            email: 'brucewayne@example.com',
            password: await hash('Mysql123-', 10),
            gender: Gender.MALE,
            dob: new Date('1990-01-01'),
            imgUrl: null,
        }
    ]
}