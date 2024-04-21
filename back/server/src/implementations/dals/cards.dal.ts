import { AbstractDal } from "./abstract.dal";
import { CardModel } from "../../models/models";
import { injectable } from "inversify";

@injectable()
export class CardsDal extends AbstractDal<CardModel> {
    protected dataFolderName: string = 'cards';
}