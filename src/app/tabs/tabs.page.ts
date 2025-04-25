import { Component } from '@angular/core';
import { SharedDataService } from '../services/shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage {

  constructor(private sharedJson:SharedDataService, private router:Router) {}
  ngOnInit(){
    this.startShakeDetection();
  }
  startShakeDetection() {
    console.log('shake initiated')
    let shakeThreshold = 15;  // Adjust the threshold to detect shake
    let lastX = 0, lastY = 0, lastZ = 0;

    window.addEventListener('devicemotion', (event:DeviceMotionEvent) => {
      
      const acceleration = event.accelerationIncludingGravity;
      if(acceleration){
        const { x, y, z } = acceleration;
        const deltaX = x! - lastX;
        const deltaY = y! - lastY;
        const deltaZ = z! - lastZ;
  
        const shakeMagnitude = Math.abs(deltaX + deltaY + deltaZ);
  
        if (shakeMagnitude > shakeThreshold) {
          console.log('Shake detected!');
          // You can trigger your custom logic here
          this.router.navigate(['shake'])
        }
  
        // Update last known acceleration values
        lastX = x!;
        lastY = y!;
        lastZ = z!;
  
      }
    });
  }

}
