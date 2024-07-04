import { hash } from 'bcrypt';

enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
}
  
enum Role {
    warAdm = 'warAdm',
    superAdm = 'superAdm',
}

export async function listAdmin() {
    return [
        {
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