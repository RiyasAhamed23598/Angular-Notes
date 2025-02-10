### integration with external libraries
- warning in import
some libraries that using js required installing additinal package with types
```npm install @types/some-lib```

Type definition file uses extention d.ts ``index.d.ts``. This file doesn't have nothing by typscript syntax

### export default
``` export default 'red' ``` - name of value is not provided
``` import red from './User' ``` - import without {} . Variable can have any name ```red, color, etc```
convention in typescript is to never user default exports

### import with html script (like google maps)
Is become a global variable that is available in any place of the project
But we need to help Typescript understand that this variable exits by adding type definition file
```npm install @types/googlemaps```

#### initializing google maps 

create custom class CustomMap in a new file CustomMap.ts
```
export class CustomMap {
  private googleMap: google.maps.Map;

  constructor(divId: string) {
    googleMap = new google.maps.Map(document.getElementById(divId) as HTMLElement,{
      zoom: 1,
      center: {
        lat: 0,
        lng: 0,
      }
    });

    addMarker(mappable: Mappable): void {
      const marker = new google.maps.Marker(
        map: this.googleMap,
        position: {
          lat: mappable.location.lat,
          lng: mappable.location.lng
        }
      );

      marker.addListener('click', () => {
        const infoWindow = new google.maps.InfoWindow({
          content: 'hi there'
        });

        infoWindow.open(this.googleMap, marker);
      }
    }
  }
}
```
