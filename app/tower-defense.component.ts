import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';

import {Provider} from '@angular/core';

export class WindowRef {
  get(): any { return window; }
}

export class DocumentRef {
  get(): any { return document; }
}

export const BROWSER_PROVIDERS: Provider[] = [WindowRef, DocumentRef];

declare var google: any;

@Component({
  selector: 'tower-defense',
  template: `<div class="gmap" #gmap></div>`,
  styles: [`.gmap { height: 400px; width: 400px; }`]
})
// <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAirjf_8j7Ay-dl2vymv0VACMqL70RaKMI" async defer></script>
// <img src="https://maps.googleapis.com/maps/api/staticmap?center=51.454273,-2.592994&zoom=13&size=400x400&key=AIzaSyAirjf_8j7Ay-dl2vymv0VACMqL70RaKMI" />

export class TowerDefenseComponent implements OnInit {
  @ViewChild('gmap') mapElem: ElementRef;

  private map: any; // map component
  private directionsService: any; // map component
  private directionsDisplay: any; // map component
  private markers: Array<any> = [];// array of markers
  private callback: Promise<void>;
  private center: any;

  constructor(private http: Http, private window: WindowRef, private document: DocumentRef) {}

  ngOnInit(): void {
    this.load().then(() => {
      console.log('loaded');
      this.center = new google.maps.LatLng(51.454273, -2.592994);

      this.map = new google.maps.Map(this.mapElem.nativeElement, {
        center: this.center,
        zoom: 15
      });

      this.directionsService = new google.maps.DirectionsService;
      this.directionsDisplay = new google.maps.DirectionsRenderer;
      this.directionsDisplay.setMap(this.map);

      this.createMarkers();
    });
  }

  createMarkers(): void {
    let toRad = (value: number): number => value * Math.PI / 180;
    let toDeg = (value: number): number => value * 180 / Math.PI;

    let ll = () => {
      const dist = 0.5 / 6371;
      const deg  = toRad(Math.floor(Math.random() * 360) + 1);

      let lat1 = toRad(this.center.lat());
      let lng1 = toRad(this.center.lng());
      let lat2 = Math.asin(Math.sin(lat1) * Math.cos(dist) + Math.cos(lat1) * Math.sin(dist) * Math.cos(deg));
      let lng2 = lng1 + Math.atan2(Math.sin(deg) * Math.sin(dist) * Math.cos(lat1), Math.cos(dist) - Math.sin(lat1) * Math.sin(lat2));

      return new google.maps.LatLng(toDeg(lat2), toDeg(lng2));
    }

    // rename to spawn point
    for(let i=0; i<1; i++) {
      let pos = ll();
      let marker = new google.maps.Marker({
        map: this.map,
        position: pos
      });

      // let directions = 'https://maps.googleapis.com/maps/api/directions/json';
      // directions += '?origin=' + pos.toUrlValue();
      // directions += '&destination=' + this.center.toUrlValue();
      // directions += '&key=AIzaSyAirjf_8j7Ay-dl2vymv0VACMqL70RaKMI';
      //
      // this.http.get(directions).subscribe(data => {
      //   console.log('http: ', data);
      // });

      this.directionsService.route({
         origin: pos,
         destination: this.center,
         travelMode: 'WALKING'
       },
       (response: any, status: any) => {
         console.log(status, response);
         if (status === 'OK') {
           this.directionsDisplay.setDirections(response);

// routes[0]
// - legs[0]
//   - distance - total distance of journey
//   - steps[]
//     - distance - part of total distance to work out percent of journey / time
//     - path - the lat-lngs

           for(let pos of response.routes[0].overview_path) {
             console.log(pos);
             let marker = new google.maps.Marker({
               map: this.map,
               position: pos
             });
           }

         } else {
           window.alert('Directions request failed due to ' + status);
         }
       });

console.log('destination: ', this.center);

console.log('merker', marker.position.lat(), marker.position.lng());
      this.markers.push(marker);
    }

    setTimeout(() => {
      // this.startMove();
    }, 500)
  }

  startMove() {
    // LatLng currentPosition = new LatLng(
          // startPosition.latitude*(1-t)+finalPosition.latitude*t,
          // startPosition.longitude*(1-t)+finalPosition.longitude*t);
    const start = new Date().getTime();
    const duration = 60000;
    let elapsed = 0;
    let t = 0;
    console.log('destination: ', this.center);
    let interval = setInterval(() => {
      elapsed = (new Date().getTime()) - start;
      t = (elapsed / duration) / 1000;

      for(let i=0, l=this.markers.length; i<1; i++) {
        let marker = this.markers[i];
        let lat = marker.position.lat();
        let lng = marker.position.lng();
        let pos = new google.maps.LatLng(
          (lat * (1-t) + this.center.lat() * t),
          (lng * (1-t) + this.center.lng() * t)
        );

        marker.setPosition(pos);
      }

      if(elapsed >= duration) {
        clearInterval(interval);
      }
    }, 900);
  }

  load() {
    const cbName = 'googlemapscallback';
    const doc    = this.document.get();
    const window = this.window.get();

    if(!this.callback) {
      const script = doc.createElement('script');
      script.type  = 'text/javascript';
      script.async = true;
      script.defer = true;
      script.src   = 'https://maps.googleapis.com/maps/api/js';
      script.src  += '?callback=' + cbName;
      script.src  += '&key=AIzaSyAirjf_8j7Ay-dl2vymv0VACMqL70RaKMI';

      this.callback = new Promise((resolve, reject) => {
        window[cbName] = () => resolve();
        script.onerror = (error: Event) => reject(error);
      });

      doc.body.appendChild(script);
    }

    return this.callback;
  }
}
