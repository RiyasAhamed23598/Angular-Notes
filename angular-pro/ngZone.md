```
constructor(
  private zone: NgZone
){}

ngOnInit() {
  this.zone.runOutsideAngular(() => {
    for (let i = 0; i < 100; i++) {
      setTimeout(() => this.counter++);
    }
    
    this.zone.run(() => {
      setTimeout(() => this.counter = this.counter, 1000)
    }
  }
}

ngDoCheck() {
  console.log('change detection has been run!');
}
```
