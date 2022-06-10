import {ComponentFixture, TestBed} from "@angular/core/testing";
import {CounterComponent} from "./counter.component";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('CounterComponent', () => {

  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CounterComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    component.value = 0;
  });

  it('should increment correctly', () => {
    component.increment();
    expect(component.value).toBe(1);
  })

  it('should not increment over the maximum value', () => {
    for (let i = 0; i < 200; i++){
      component.increment();
    }
    expect(component.value).toBe(100);
  })

  it('should not increment over the maximum value with input', () => {
    component.step = 20;
    component.max = 20;
    component.increment();
    component.increment();
    expect(component.value).toBe(20);
  })

  it('should call the output on a value change', () => {
    spyOn(component.changed, 'emit').and.callThrough();
    component.step = 100;
    component.increment();
    expect(component.changed.emit).toHaveBeenCalledWith(100);
  })

  it ('should increment when the + button is clicked', () => {
    el.query(By.css('button:first-child')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.value).toBe(1);
    expect(el.query(By.css('p')).nativeElement.textContent).toBe('1');
  });

  it ('should increment the value when the up arrow is pressed', () => {
    const event = new Event('KeyboardEvent') as any;
    event.code = 'ArrowUp';
    el.query(By.css('.counter > div > div')).triggerEventHandler('keydown', event);
    expect(component.value).toEqual(1);
  });
} )
