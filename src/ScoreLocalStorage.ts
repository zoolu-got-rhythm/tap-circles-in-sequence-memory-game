import { ScoreStorage } from "./interfaces/ScoreStorage";

export class ScoreLocalStorage implements ScoreStorage{
    scoreChangeListener: {() : void} | null;

    constructor(){
        this.scoreChangeListener = null;
    }

    saveScore(score: number) {
        const prevScore: string | null = localStorage.getItem("score");
        const prevScoreAsNumber: number | null = prevScore ? Number(prevScore) : null;

        if(!prevScore){
            localStorage.setItem("score", String(score));
            if(this.scoreChangeListener)
                this.scoreChangeListener();
        }

        if(prevScoreAsNumber){
            if(score > prevScoreAsNumber){
                localStorage.setItem("score", String(score));
                if(this.scoreChangeListener)
                    this.scoreChangeListener();
            }
        }
    }

    getScore(): number {
        const highScore = localStorage.getItem("score");
        if(highScore)
            return Number(highScore);
        return 0;
    }

    addScoreChangeListener(scoreChangeListener: () => void){
        this.scoreChangeListener = scoreChangeListener;
    }
}