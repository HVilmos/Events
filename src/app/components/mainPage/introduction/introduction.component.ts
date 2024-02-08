import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/service/config.service';
import { BaseService } from 'src/app/service/base.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent implements OnInit {
  event: any = {};
  countdown: any = {};
  private countdownInterval: any;

  constructor(private base: BaseService, private config: ConfigService, private router: Router, private auth: AuthService) {}

  ngOnInit() {
    this.base.getData().snapshotChanges().subscribe((events) => {
      const eventList = events.map((event) => ({
        key: event.payload.key,
        ...event.payload.val(),
      }));

      eventList.sort((a: any, b: any) => {
        if (a.date && b.date) {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA.getTime() - dateB.getTime();
        } else {
          return 0;
        }
      });

      if (eventList.length > 0) {
        this.event = eventList[0];
        this.startCountdown();
      }
    });
  }

  startCountdown() {
    this.countdownInterval = setInterval(() => {
      this.countdown = this.getTimeRemaining(new Date(this.event.date));
    }, 1000);
  }

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  getTimeRemaining(eventDate: Date): any {
    const now = new Date();
    const timeRemaining = eventDate.getTime() - now.getTime();

    if (timeRemaining <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }

  onViewDetailsClick(eventId: string, eventType: string) {
    this.router.navigate(['/event', eventType, eventId]);
  }
}
