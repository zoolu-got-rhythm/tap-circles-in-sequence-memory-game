(()=>{var e=class{constructor(s,i,t){this.UPDATE_SPEED=1e3/60;this.INCREMENT_SPEED=1.7;this.x=s,this.y=i,this.maxRadius=t,this.currentRadius=0,this.lastTime=Date.now(),this.hasFinished=!1,this.delta=0}update(s){if(this.hasFinished)return;let i=s-this.lastTime;i>=this.UPDATE_SPEED&&this.currentRadius<this.maxRadius&&(this.delta=i-this.UPDATE_SPEED,this.currentRadius+=this.INCREMENT_SPEED,this.currentRadius>=this.maxRadius&&(this.hasFinished=!0),this.lastTime=s)}draw2dWeb(s){this.currentRadius>=this.maxRadius||(s.beginPath(),s.strokeStyle="cyan",s.lineWidth=7,s.arc(this.x,this.y,this.currentRadius,0,2*Math.PI),s.stroke())}};})();