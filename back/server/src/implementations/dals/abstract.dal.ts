import { BaseModel } from "../../models/models";
import { IAbstractDal } from "../../interfaces/dals/iabstract.dals";
import fs from 'fs';
import { injectable } from "inversify";
import path from "path";
import { v4 } from 'uuid';

@injectable()
export abstract class AbstractDal<T extends BaseModel> implements IAbstractDal<T> {
    protected abstract dataFolderName: string;
    
    async findAll(): Promise<T[]> {
        const rootPath: string = await this.getRootFolderPath();
        console.log(`Reading path : ${rootPath}`);
        const files = await fs.promises.readdir(rootPath);

        return Promise.all(files.map(async (itemFileName) => {
            const itemFilePath: string = path.join(rootPath, itemFileName);
            return JSON.parse(await fs.promises.readFile(itemFilePath, 'utf8'));
        }))
    }

    async findById(id: string): Promise<T> {
        const filePath: string = await this.getObjectFilePath(id);
        try {
            await this.exists(filePath)
        } catch {
            throw new Error(`No object found for id ${id}`);
        }

        return JSON.parse(await fs.promises.readFile(filePath, 'utf8'));
    }

    async findByIds(ids: string[]): Promise<T[]> {
        return Promise.all(ids.map((id: string) => this.findById(id)));
    }

    async create(item: Partial<T>): Promise<T> {
        let id: string | undefined = item.id;
        if (id) {
            throw new Error('Model must not have id to be created');
        }
        
        id = v4();
        item.id = id;

        const filePath: string = await this.getObjectFilePath(id);
        await fs.promises.writeFile(filePath, JSON.stringify(item));
        return item as T;
    }

    async update(item: T): Promise<T> {
        const id: string | undefined = item.id;
        if (!id) {
            throw new Error('Model must have id to be updated');
        }

        const filePath: string = await this.getObjectFilePath(id);
        try {
            await this.exists(filePath)
        } catch {
            throw new Error(`No object found for id ${id}`);
        }

        await fs.promises.unlink(filePath);
        await fs.promises.writeFile(filePath, JSON.stringify(item));
        return item as T;
    }

    async delete(id: string): Promise<void> {
        const filePath: string = await this.getObjectFilePath(id);
        try {
            await this.exists(filePath)
        } catch {
            throw new Error(`No object found for id ${id}`);
        }

        await fs.promises.unlink(filePath);
    }

    private async getRootFolderPath(): Promise<string> {
        const rootFolderPath: string = path.resolve(path.join('.', 'datas', this.dataFolderName));
        await this.checkDirectory(rootFolderPath);
        return rootFolderPath;
    }

    private async getObjectFilePath(id: string): Promise<string> {
        const rootPath: string = await this.getRootFolderPath();
        return path.join(rootPath, `${id}.json`);

    }
    
    private exists(path: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            fs.access(path, (error) => {
                if (error) {
                    reject(false);
                }

                resolve(true);
            })
        })
    }

    public async checkDirectory(directory: string): Promise<void> {
        try {
            await fs.promises.stat(directory);
        } catch (e) {
            await fs.promises.mkdir(directory, { recursive: true });
        }
    }
}