import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'app-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:`
    <p>{{ value }}</p>
    <div>
      <button type="button" (click)="increment()"> + </button>
      <button type="button" (click)="decrement()"> - </button>
    </div>
  `
})
export class CounterComponent {
  @Input() step: number = 1;
  @Input() min: number = 0;
  @Input() max: number = 100;

  @Output() changed = new EventEmitter<number>();

  value: number = 0;
  // focused: boolean;

  increment() {
    if (this.value < this.max) {
      this.value = this.value + this.step;
      this.changed.emit(this.value);
    }
  }

  decrement() {
    if (this.value > this.max) {
      this.value = this.value - this.step;
      this.changed.emit(this.value);
    }
  }
}
