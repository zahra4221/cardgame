import { BaseModel } from "../../models/models";
import { IAbstractDal } from "../../interfaces/dals/iabstract.dals";
import { IAbstractService } from "../../interfaces/services/iabstract.service";
import { injectable } from "inversify";

@injectable()
export abstract class AbstractService<T extends BaseModel> implements IAbstractService<T> {
    constructor(private readonly dal: IAbstractDal<T>) {}

    findAll(): Promise<T[]> {
        return this.dal.findAll();
    }

    findById(id: string): Promise<T> {
        return this.dal.findById(id);
    }

    create(item: Partial<T>): Promise<T> {
        return this.dal.create(item);
    }

    update(item: T): Promise<T> {
        return this.dal.update(item);
    }

    delete(id: string): Promise<void> {
        return this.dal.delete(id);
    }
}