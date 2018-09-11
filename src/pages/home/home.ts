import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GoogleMap, GoogleMaps, Environment, Marker, GoogleMapsEvent, LocationService, GoogleMapOptions, MyLocation } from '@ionic-native/google-maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: GoogleMap

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': '',
      'API_KEY_FOR_BROWSER_DEBUG': ''
    });
    LocationService.getMyLocation().then((myLocation: MyLocation) => {
      console.log(myLocation);
      let options: GoogleMapOptions = {
        camera: {
          target: myLocation.latLng,
          zoom: 16
        }
      };
      this.map = GoogleMaps.create('map_canvas', options);

      var text = ["Current your location:\n",
      "latitude:" + myLocation.latLng.lat.toFixed(3),
      "longitude:" + myLocation.latLng.lng.toFixed(3),
      "speed:" + myLocation.speed,
      "time:" + myLocation.time,
      "bearing:" + myLocation.bearing].join("\n");

      let marker: Marker = this.map.addMarkerSync({
        title: text,
        position: myLocation.latLng
      });

      marker.showInfoWindow();
    });

    // Add a marker

  }

  addMarker() {
    let marker: Marker = this.map.addMarkerSync({
      title: 'Guggach Brache <button ion-button (click)="testAlert()">Open</button>',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: 43.0741904,
        lng: -89.380902
      }
    });

    marker.showInfoWindow();
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('Marker was clicked');
    });
    marker.on(GoogleMapsEvent.INFO_CLICK).subscribe(() => {
      alert('Marker was clicked');
    });
  }

  startNavigation(){
    // let directionsService = GoogleMaps.DirectionsService;
    // let directionsDisplay = new google.maps.DirectionsRenderer;

    // directionsDisplay.setMap(this.map);
    // directionsDisplay.setPanel(this.directionsPanel.nativeElement);

    // directionsService.route({
    //     origin: 'adelaide',
    //     destination: 'adelaide oval',
    //     travelMode: google.maps.TravelMode['DRIVING']
    // }, (res, status) => {

    //     if(status == google.maps.DirectionsStatus.OK){
    //         directionsDisplay.setDirections(res);
    //     } else {
    //         console.warn(status);
    //     }

    // });
  }
}
