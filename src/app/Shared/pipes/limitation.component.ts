import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'limitationPipe'
})
export class LimitationPipe implements PipeTransform {
    transform(value: number, isClass?: boolean, arg2?: any): string {
        let result;
        switch (value) {
            case 0:
                result = !isClass ? 'active' : 'active-class';
                break;
            case 1:
                result = !isClass ? 'inactive' : 'inactive-class';
                break;
        }
        return result;
    }
}