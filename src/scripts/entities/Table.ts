import { sound } from '@pixi/sound';
import { Actions } from 'pixi-actions';
import * as px from 'pixi.js';
import { CARDS_NAMES } from '../helpers/constants';
import { getRandomSet, shuffle } from '../helpers/utils';
import Card from './Card';

export default class Table extends px.Container {
    
    private cardDeck: Card[] = [];
    public activePair: Card[] = Array(2);

    constructor() {
        super();

        this.initCardDeck();
    }

// Initializing set of 8 random cards, getting pairs and shuffling them for chaotic displaying

    public initCardDeck() : void {
        let cardSet = getRandomSet(1, 28, 8);
        cardSet = cardSet.concat(cardSet);
        
        cardSet.forEach((num) => {
            let card = new Card(
                app.loader.resources.cards.textures[CARDS_NAMES[num]], 
                app.loader.resources.cards.textures[CARDS_NAMES[0]] 
            );

            card.interactive = false;
            this.cardDeck.push(card);
        });

        shuffle(this.cardDeck);        
        
// Positioning every card based on its width, height and relative container position

        this.cardDeck.forEach((card, index) => {
            
            let wrapper = new px.Container();
            
            wrapper.position.x = this.position.x + (card.width + 60) * (index % 4);
            wrapper.position.y = this.position.y + (card.height + 30) * Math.floor(index / 4) + 30;

            this.initCardBehavior(card);
            
            wrapper.addChild(card);
            
            this.addChild(wrapper);
            
        });

        this.position.set((app.stage.width - this.width) / 2, 0);
            
    }

// Describing card behavior on click: call animation flip(), renewing state of selected cards pair

    public initCardBehavior(card: Card): void {
        card.on('pointertap', () => {
            this.switchInteractivity();
            card.interactive = false;
            card.flip();
            setTimeout(() => {
                if (this.activePair[0] == undefined) {
                    this.activePair[0] = card;
                    card.isPaired = true;
                    card.interactive = false;
                } else if (this.activePair[1] == undefined) {
                    this.activePair[1] = card;
                    card.isPaired = true;
                    card.interactive = false;
                }
                this.switchInteractivity();
            }, 800);
        })
        
    }

    public flipAllCards(): void {
        this.cardDeck.forEach((card) => {
            card.interactive = !card.interactive;
            card.flip();
        })
    }

// Disable interactivity for all cards, while the one is animating

    public switchInteractivity(): void {
        this.cardDeck.forEach((card) => { 
            card.interactive = (card.isPaired) ? false : !card.interactive;
        });
    }

// Checking state of Table

    public isSolved(): boolean {
        return this.cardDeck.every((card) => card.isPaired);
    }


}