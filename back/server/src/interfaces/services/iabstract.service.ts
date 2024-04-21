export interface IAbstractService<T> {
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T>;
    create(card: Partial<T>): Promise<T>;
    update(card: T): Promise<T>;
    delete(cardId: string): Promise<void>;
}