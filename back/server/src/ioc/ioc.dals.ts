import { CardModel, DeckModel } from "../models/models";
import { Container, injectable } from "inversify";

import { CardsDal } from "../implementations/dals/cards.dal";
import DALS_TYPES from '../interfaces/dals/dal.types';
import { DecksDal } from "../implementations/dals/decks.dal";
import { IAbstractDal } from "../interfaces/dals/iabstract.dals";

@injectable()
export class IocDals {
    static register(container: Container) {
        container.bind<IAbstractDal<CardModel>>(DALS_TYPES.CardsDal).to(CardsDal);
        container.bind<IAbstractDal<DeckModel>>(DALS_TYPES.DecksDal).to(DecksDal);
    }
}