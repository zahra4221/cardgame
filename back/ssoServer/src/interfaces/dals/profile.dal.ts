import { ProfileModel } from "../../models/profile.model";

export interface IProfileDal {
    findAll(): Promise<ProfileModel[]>;
    findById(id: string): Promise<ProfileModel>;
    create(item: Partial<ProfileModel>): Promise<ProfileModel>;
    
}
