import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'limitationPipe'
})
export class LimitationPipe implements PipeTransform {
    transform(value: string, args?: any): string {
        let str = '';
        if (value.length > 50) {
            str = value.slice(0, 50) + '...'
        }
        return str
    }
}