export interface AnalyticsRecorder{
    recordPageVisit(): void;
    recordUserScore(): void;
}