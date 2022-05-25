## Creating a custom structural Directive

```
@Directive ({
  selector: '[myFor][myForOf]'
})
export class MyForDirective {
  @Input() 
  set myForOf(collection) {
    this.view.clear();
    
    collection.forEach(item, index) => {
      this.view.createEmbeddedView(this.template, {
        $implicit: item,
        index
      })
    });
  }

  constructor (
    private view: ViewContainerRef,
    private template: TemplateRef<any>
  )
}
```

## Creating a custom pipe

```
@Pipe({
  name: 'filesize'
})
export class FileSizePipe implements PipeTransform {
  transform(size: number, extension: string = 'MB') {
    return (size / (1024*1024)).toFixed(2) + extension;
  }
}
```
**pipe as provider**
```
constructor (private fileSizePipe: FileSizePipe){}

ngOnInit() {
  const size = this.fileSizePipe.transform(this.size, 'mb');
}

```
