import { ProfileModel } from "../../models/profile.model";

export interface IProfileService {
    findAll(): Promise<ProfileModel[]>;
    findById(id: string): Promise<ProfileModel>;
    create(item: Partial<ProfileModel>): Promise<ProfileModel>;
    login(login: string, password: string): Promise<string>;
}
