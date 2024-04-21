import { BaseModel } from "../../models/models";

export interface IAbstractDal<T extends BaseModel> {
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T>;
    findByIds(ids: string[]): Promise<T[]>;
    create(card: Partial<T>): Promise<T>;
    update(card: T): Promise<T>;
    delete(cardId: string): Promise<void>
}