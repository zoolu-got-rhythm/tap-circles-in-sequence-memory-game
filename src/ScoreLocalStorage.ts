import { ScoreStorage } from "./ScoreStorage";

export class ScoreLocalStorage implements ScoreStorage{
    saveScore(score: number) {
        const prevScore: string | null = localStorage.getItem("score");
        const prevScoreAsNumber: number | null = prevScore ? Number(prevScore) : null;

        if(!prevScore){
            localStorage.setItem("score", String(score));
        }

        if(prevScoreAsNumber){
            if(score > prevScoreAsNumber){
                localStorage.setItem("score", String(score));
            }
        }
    }
    getScore(): number {
        const highScore = localStorage.getItem("score");
        if(highScore)
            return Number(highScore);
        return 0;
    }
}