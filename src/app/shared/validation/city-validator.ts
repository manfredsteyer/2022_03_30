import { AbstractControl, AsyncValidatorFn, FormGroup, ValidatorFn } from '@angular/forms';
import { delay, map } from 'rxjs/operators';
import { FlightService } from 'src/app/flight-booking/flight.service';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function cityValidator(allowedCities: string[]): ValidatorFn {

    return (control: AbstractControl) => {

        if (allowedCities.includes(control.value)) {
            return {};
        }

        return {
            city: {
                actualValue: control.value,
                allowedCities,
                tryAgain: 2037
            }
        };
    };

}



// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function asyncCityValidator(flightService: FlightService): AsyncValidatorFn {

    return (control: AbstractControl) => {

        const flights$ = flightService.find(control.value, '').pipe(
            delay(7000)
        );

        return flights$.pipe(map(flights => {
            if (!flights || flights.length > 0) {
                return {}; // Kein Fehler!
            }
            else {
                return { asyncCity: true };
            }
        }));

    };

}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function roundTrip(): ValidatorFn {

    return (control: AbstractControl) => {

        const fg = control as FormGroup;

        if (!fg.controls.from.value || !fg.controls.to.value) {
            return {};
        }

        if (fg.controls.from.value === fg.controls.to.value) {
            return { roundTrip: true };
        }
        return {};

    };

}
