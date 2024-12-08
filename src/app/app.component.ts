import { Component, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeatService } from './services/seat.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'train-booking-frontend';
  seats: any[] = [];
  bookingResult: string = '';
  totalSeatRemaining:any
  constructor(private seatService: SeatService,private toastr: ToastrService) {}
  @ViewChild('seatsInput') seatsInput!: ElementRef; 
  ngOnInit(): void {
    this.loadSeats();
  }

  loadSeats() {
    this.seatService.getSeats().subscribe(data => {
      this.seats = data;
      this.totalSeatRemaining=data.filter((x:any)=>x.is_booked==false).length
    });
  }

  bookSeats(numSeats: any) {
    if(numSeats){
      this.seatService.bookSeats(numSeats).subscribe(
        result => {
          this.bookingResult = result.message;
          this.loadSeats();
          this.toastr.success(this.bookingResult);
          console.log("toaste")
          this.seatsInput.nativeElement.value = '';
        },
        error => {
          this.bookingResult = error.error.error;
          this.toastr.error( error.error.error);
        }
      )
    }else{
      this.toastr.error("Please enter valid input");

    }
   
  }
  resetSeats(): void {
    this.seatService.resetSeats().subscribe(
      (result: { message: string }) => {
        this.bookingResult = result.message;
        this.toastr.success(this.bookingResult);
        this.loadSeats(); // Refresh seat data after reset
      },
      (error: { error: string }) => {
        this.toastr.error( 'Failed to reset seats.');

      }
    );
  }
  
}
