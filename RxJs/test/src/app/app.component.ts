import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test';
}

class Subject {

  private _callbacks: ((a: string)=> void)[] = [];
  constructor() { }

  subscribe(callback: (a: any) => any) {
    this._callbacks.push(callback);

    return {unsubscribe: () => {
        this._callbacks.splice(this._callbacks.indexOf(callback), 1);
      }}
  }

  next ( value: any): void {
    this._callbacks.forEach((callback) => callback(value));
  }
}

const subj = new Subject();

const subscription = subj.subscribe(data => {
  console.log("data", data);
});

subj.next("alex1");

subscription.unsubscribe();

subj.next("alex2");

subj.subscribe(data => {
  console.log("data1", data);
});

subj.next("alex3");
