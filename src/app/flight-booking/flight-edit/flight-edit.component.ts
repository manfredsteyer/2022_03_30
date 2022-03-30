// src/app/flight-booking/flight-edit/flight-edit.component.ts

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { ComponentWithExitWarning } from 'src/app/shared/exit.guard';
import { asyncCityValidator, cityValidator, roundTrip } from 'src/app/shared/validation/city-validator';
import { Flight } from '../flight';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.scss']
})
export class FlightEditComponent implements OnInit, ComponentWithExitWarning {
  id = 0;
  showDetails = false;
  showWarning = false;
  router: Observer<boolean> | undefined;
  flight!: Flight;

  formGroup: FormGroup;

  stopOvers: FormArray;

  meta = [
    { label: 'Id', name: 'id' },
    { label: 'Airport of Departure', name: 'from' },
    { label: 'Airport of Destination', name: 'to' },
    { label: 'Boarding Date', name: 'date' },
    { label: 'Delayed', name: 'delayed', type: 'checkbox' },

  ];


  constructor(
    private flightService: FlightService,
    private fb: FormBuilder,
    private route: ActivatedRoute) {

    this.stopOvers = fb.array([]);

    this.formGroup = fb.group({
      id: [],
      from: [
        'Graz',
        [
          Validators.required,
          Validators.minLength(3),
          cityValidator(['Graz', 'Hamburg', 'Zürich', 'Gleisdorf'])
        ],
        [
          // Async
          asyncCityValidator(flightService)
        ]
      ],
      to: ['Hamburg'],
      date: ['', Validators.required],
      delayed: [],
      details: fb.group({
        direct: [true],
        price: 300
      }),
      stopOvers: this.stopOvers
    });


    this.formGroup.validator = Validators.compose([roundTrip()]);
    // this.formGroup.asyncValidator = Validators.composeAsync([]);

    this.formGroup.valueChanges.subscribe(values => {
      console.debug('values', values);
      this.flight = values;
    });

    this.formGroup.controls.from.valueChanges.subscribe(value => {
      console.debug('value', value);
    });

  }

  get stopOverControls() {
    return this.stopOvers.controls as FormGroup[];
  }

  addStopOver(): void {
    this.stopOvers.push(this.fb.group({
      airport: ['Airport'],
      duration: [45]
    }));
  }

  save(): void {
    const v = this.formGroup.value;
    console.debug('data would be saved now if this wasn\'t a cheap shareware version', v);
  }

  decide(decision: boolean) {
    this.showWarning = false;
    this.router?.next(decision);
    this.router?.complete();
  }

  canExit(): Observable<boolean> {
    this.showWarning = true;
    return new Observable<boolean>(observer => {
      this.router = observer;
    });
  }

  ngOnInit(): void {

    this.route.data.subscribe(data => {
      this.flight = data.flight;

      this.formGroup.patchValue(this.flight);
      // this.formGroup.setValue
    });

    this.route.params.subscribe((p) => {
      this.id = p.id;
      this.showDetails = p.showDetails;
    });
  }
}
