import { DeckModel, DeckWithCardsModel } from "../../models/models";

import { IAbstractService } from "./iabstract.service";

export interface IDeckService extends IAbstractService<DeckModel> {
    findCompleteById(id: string): Promise<DeckWithCardsModel>;
}