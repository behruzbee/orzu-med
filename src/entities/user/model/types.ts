import { IRole } from "entities/role";

export interface IUser {
	id: number,
        login: string,
        password: string,
        role: IRole
        roleId?: string
}