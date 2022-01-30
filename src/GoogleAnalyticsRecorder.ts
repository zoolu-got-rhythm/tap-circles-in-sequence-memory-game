import { AnalyticsRecorder } from "./interfaces/AnalyticsRecorder";
import Analytics from 'analytics'
import googleAnalytics from '@analytics/google-analytics'
import { ScoreLocalStorage } from "./ScoreLocalStorage";

export class GoogleAnalyticsRecorder implements AnalyticsRecorder{
    analytics: any;
    scoreLocalStorage: ScoreLocalStorage;

    constructor(scoreLocalStorage: ScoreLocalStorage){
      this.scoreLocalStorage = scoreLocalStorage;
      this.analytics = Analytics({
        app: 'monkey game web application',
        plugins: [
          googleAnalytics({
            trackingId: 'G-QBWK2V58KK'
          })
        ]
      });
    }

    recordPageVisit(): void {
        /* Track a page view */
        this.analytics.page();
    }
    recordUserScore(): void {
        /* Track a custom event */
        this.analytics.track('score', {
          userId: 'testUser',
          timeOfScore: new Date().toString(),
          score: this.scoreLocalStorage.getScore()
        });
    }

}