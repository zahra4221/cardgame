import { IProfileDal } from '../../interfaces/dals/profile.dal';
import { ProfileModel } from '../../models/profile.model';
import fs from 'fs';
import { injectable } from 'inversify';
import path from 'path';
import { v4 } from 'uuid';

@injectable()
export class ProfileDal implements IProfileDal {
    
    async findAll(): Promise<ProfileModel[]> {
        const rootPath: string = await this.getRootFolderPath();
        console.log(`Reading path : ${rootPath}`);
        const files = await fs.promises.readdir(rootPath);

        return Promise.all(files.map(async (itemFileName) => {
            const itemFilePath: string = path.join(rootPath, itemFileName);
            return JSON.parse(await fs.promises.readFile(itemFilePath, 'utf8'));
        }))
    }

    async findById(id: string): Promise<ProfileModel> {
        const filePath: string = await this.getObjectFilePath(id);
        try {
            await this.exists(filePath)
        } catch {
            throw new Error(`No object found for id ${id}`);
        }

        return JSON.parse(await fs.promises.readFile(filePath, 'utf8'));
    }

    async create(item: Partial<ProfileModel>): Promise<ProfileModel> {
        let id: string | undefined = item.id;
        if (id) {
            throw new Error('Model must not have id to be created');
        }
        
        id = v4();
        item.id = id;

        const filePath: string = await this.getObjectFilePath(id as string);
        await fs.promises.writeFile(filePath, JSON.stringify(item));
        return item as ProfileModel;
    }

    private async getRootFolderPath(): Promise<string> {
        const rootFolderPath: string = path.resolve(path.join('.', 'datas', 'profiles'));
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
