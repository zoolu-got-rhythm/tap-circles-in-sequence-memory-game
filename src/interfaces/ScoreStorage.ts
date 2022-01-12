// depend on abstractions not concretions
export interface ScoreStorage{
    saveScore(score: number): void;
    getScore(): number; // get score
}