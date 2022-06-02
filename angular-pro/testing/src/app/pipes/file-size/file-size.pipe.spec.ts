import {FileSizePipe} from "./file-size.pipe";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Component} from "@angular/core";

describe('FileSizePipe', () => {

  describe('Shallow FileSizePipe test', () => {
    @Component({
      selector: 'comp',
      template: `
        size: {{ size | filesize:suffix }}
      `
    })
    class TestComponent {
      suffix: any;
      size:number = 123456789;
    }

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let el: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          FileSizePipe,
          TestComponent
        ],
      });
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      el = fixture.nativeElement;
    })

    it('should convert bytes to megabytes', () => {
      fixture.detectChanges();
      expect(el.textContent).toBe(' size: 117.74MB ');
      component.size = 1029281;
      fixture.detectChanges();
      expect(el.textContent).toBe(' size: 0.98MB ');
    })

  })

  describe('Isolate FileSizePipe test', () => {
    const pipe = new FileSizePipe();

    it('should convert bytes to megabytes', () => {
      expect(pipe.transform(123456789)).toBe('117.74MB');
      expect(pipe.transform(987654321)).toBe('941.90MB');
    })
    it('should use the default extension when not supplied', () => {
      expect(pipe.transform(123456789)).toBe('117.74MB');
      expect(pipe.transform(987654321)).toBe('941.90MB');
    })
    it('should override the extension when supplied', () => {
      expect(pipe.transform(123456789, 'MyExt')).toBe('117.74MyExt');
      expect(pipe.transform(987654321, 'anotherExt')).toBe('941.90anotherExt');
    })
  })

})
