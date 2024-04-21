import { inject, injectable } from "inversify";
import { CardModel, DeckModel, DeckWithCardsModel } from "../../models/models";
import DALS_TYPES from '../../interfaces/dals/dal.types';
import { IAbstractDal } from "../../interfaces/dals/iabstract.dals";
import { IDeckService } from "../../interfaces/services/idecks.service";
import { AbstractService } from "./abstract.service";

@injectable()
export class DecksService extends AbstractService<DeckModel> implements IDeckService {
    constructor(
        @inject(DALS_TYPES.DecksDal) private readonly decksDal: IAbstractDal<DeckModel>,
        @inject(DALS_TYPES.CardsDal) private readonly cardsDal: IAbstractDal<CardModel>) {
        super(decksDal);
    }

    async findCompleteById(id: string): Promise<DeckWithCardsModel> {
        const deck: DeckModel = await this.decksDal.findById(id);
        const cards: CardModel[] = await this.cardsDal.findByIds(deck.cards);
        return {
            id: deck.id,
            name: deck.name,
            cards
        }
    }
}