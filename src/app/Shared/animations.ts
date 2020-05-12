import { trigger, transition, style, animate, query } from '@angular/animations';

export const MoviesListTrigger = trigger('moviesListTrigger', [
        transition('void => *', [
            style({ transform: 'translateX(-100%)' }),
            animate(200, style({ transform: 'translateX(0%)' }))
        ]),
        transition('* => void', [
            style({ transform: 'translateX(0%)' }),
            animate(100, style({ transform: 'translateX(100%)'}))
        ])
])
export const DropdownTrigger = trigger('dropdownTrigger', [
    transition('void => *', [
        query('@*', [
        style({ height: '0px' }),
        animate(500, style({ height: '*' })),
        ], {optional: true})
    ]),
    transition('* => void', [
        style({ height: '*' }),
        animate(100, style({ height: '0px'}))
    ])

])
