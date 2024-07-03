import { Gender } from '@prisma/client';
import { hash } from 'bcrypt';
import { Role } from 'prisma/types';
import { v4 as uuid } from 'uuid';

export async function listAdmin() {
    return [
        {
            id: uuid(),
            role: Role.superAdm,
            accountActive: true,
            fullName: 'Jane Admin',
            email: 'janeadmin@example.com',
            password: await hash('Mysql123-', 10),
            gender: Gender.FEMALE,
            dob: new Date('1985-01-01'),
            createdAt: new Date(),
        },
        {
            id: uuid(),
            role: Role.warAdm,
            accountActive: true,
            fullName: 'John Smith',
            email: 'johnsmith@example.com',
            password: await hash('Mysql123-', 10),
            gender: Gender.MALE,
            dob: new Date('1990-02-02'),
            createdAt: new Date(),
          },
    ]
}